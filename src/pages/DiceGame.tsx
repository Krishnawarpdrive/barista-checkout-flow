
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dices, CircleDollarSign, Trophy, ShoppingBag } from 'lucide-react';
import DiceSelector from '@/components/DiceSelector';
import ItemSelector from '@/components/ItemSelector';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

// Game states to manage the flow
type GameState = 'item_selection' | 'payment' | 'select_number' | 'roll_dice' | 'result' | 'multiple_rolls';

// Item type definition
export type GameItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// Sample items available for the game
const gameItems: GameItem[] = [
  {
    id: '1',
    name: 'Cappuccino',
    price: 25,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Espresso',
    price: 25,
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Latte',
    price: 25,
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Croissant',
    price: 25,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2526&auto=format&fit=crop'
  },
];

export default function DiceGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { applyCoupon } = useCart();
  
  const [gameState, setGameState] = useState<GameState>('item_selection');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<GameItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [results, setResults] = useState<{item: GameItem, selected: number, rolled: number, win: boolean}[]>([]);
  const [totalWins, setTotalWins] = useState(0);
  
  // Check if we have items from the cart
  useEffect(() => {
    // Check if we received any items from the location state
    if (location.state?.items) {
      setSelectedItems(location.state.items);
      setGameState('payment');
    }
  }, [location.state]);
  
  // Handle item selection
  const handleItemSelect = (item: GameItem) => {
    // Check if item already exists
    const exists = selectedItems.some(i => i.id === item.id);
    
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  // Handle multiple selection confirmation
  const handleItemSelectionComplete = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to play");
      return;
    }
    setGameState('payment');
  };
  
  // Handle payment process
  const handlePayment = () => {
    const totalAmount = selectedItems.length * 25;
    toast.success(`Payment of ₹${totalAmount} successful!`);
    setGameState('select_number');
  };
  
  // Handle number selection
  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    setGameState('roll_dice');
  };
  
  // Handle the dice roll (staff input)
  const handleDiceRoll = (rolledValue: number) => {
    setRolledNumber(rolledValue);
    
    // Check if the user won
    const hasWon = rolledValue === selectedNumber;
    
    // Store the result
    const currentItem = selectedItems[currentItemIndex];
    setResults([
      ...results, 
      {
        item: currentItem,
        selected: selectedNumber!, // Non-null assertion since we know it's selected
        rolled: rolledValue,
        win: hasWon
      }
    ]);
    
    if (hasWon) {
      setTotalWins(totalWins + 1);
      toast.success("Congratulations! You won a free coffee!");
      // Generate coupon for the win
      applyCoupon("WINNERSDICE");
    } else {
      toast.info("Better luck next time!");
    }
    
    // Check if we have more items to roll for
    if (currentItemIndex < selectedItems.length - 1) {
      setGameState('multiple_rolls');
    } else {
      setGameState('result');
    }
  };
  
  // Continue to next roll
  const handleNextRoll = () => {
    setCurrentItemIndex(currentItemIndex + 1);
    setSelectedNumber(null);
    setRolledNumber(null);
    setGameState('select_number');
  };
  
  // Reset the game
  const resetGame = () => {
    setSelectedNumber(null);
    setSelectedItems([]);
    setCurrentItemIndex(0);
    setRolledNumber(null);
    setResults([]);
    setTotalWins(0);
    setGameState('item_selection');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      
      <main className="flex-grow p-4 pb-20">
        <div className="mb-6">
          <h1 className="font-hackney text-3xl text-coasters-green mb-2">DICE GAME</h1>
          <p className="text-coasters-green/80">Select items, play dice, and win free coffee!</p>
        </div>
        
        {/* Game progress indicator based on current state */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${gameState === 'item_selection' || gameState === 'payment' || gameState === 'select_number' || gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'item_selection' || gameState === 'payment' || gameState === 'select_number' || gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>1</div>
              <span className="text-xs mt-1">Items</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'payment' || gameState === 'select_number' || gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'payment' || gameState === 'select_number' || gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>2</div>
              <span className="text-xs mt-1">Pay</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'select_number' || gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'select_number' || gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>3</div>
              <span className="text-xs mt-1">Pick</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'roll_dice' || gameState === 'multiple_rolls' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>4</div>
              <span className="text-xs mt-1">Roll</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>5</div>
              <span className="text-xs mt-1">Result</span>
            </div>
          </div>
        </div>
        
        {/* Step 1: Item Selection */}
        {gameState === 'item_selection' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">SELECT YOUR ITEMS</h2>
            <p className="mb-4 text-sm text-gray-600">
              Select items (₹25 each) to play the Dice Game. Each item gives you one chance to roll the dice!
            </p>
            
            <div className="mb-4 bg-coasters-gold/10 p-3 rounded-md border border-coasters-gold/20">
              <p className="text-center font-medium">
                <span className="text-lg font-hackney text-coasters-green">
                  {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                </span>
                <br />
                <span className="text-sm text-gray-600">
                  {selectedItems.length} {selectedItems.length === 1 ? 'dice roll' : 'dice rolls'} available
                </span>
              </p>
            </div>
            
            <div className="mb-6 grid grid-cols-2 gap-3">
              {gameItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  className={`relative p-3 border-2 rounded-md cursor-pointer transition-all ${
                    selectedItems.some(i => i.id === item.id) 
                      ? 'border-coasters-green bg-coasters-green/10' 
                      : 'border-coasters-gold/30 hover:border-coasters-gold'
                  }`}
                >
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹25</p>
                    </div>
                  </div>
                  {selectedItems.some(i => i.id === item.id) && (
                    <div className="absolute top-1 right-1 bg-coasters-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleItemSelectionComplete}
              variant="gold"
              className="w-full"
              disabled={selectedItems.length === 0}
            >
              <ShoppingBag className="mr-1" />
              Proceed with {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}
            </Button>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                Back to Menu
              </Button>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 2: Payment */}
        {gameState === 'payment' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">PAYMENT</h2>
            
            <div className="bg-white rounded-md border-2 border-coasters-gold p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Selected Items:</span>
                <span className="font-bold">{selectedItems.length}</span>
              </div>
              
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-8 h-8 rounded-full object-cover mr-2" 
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>₹25</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-4">
                <p className="text-center font-medium text-sm bg-coasters-gold/10 p-2 rounded-md">
                  You will get {selectedItems.length} {selectedItems.length === 1 ? 'chance' : 'chances'} to roll the dice!
                </p>
              </div>
              
              <div className="border-t border-dashed border-coasters-green/30 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-coasters-green">Total</span>
                  <span className="font-bold text-lg">₹{selectedItems.length * 25}</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              variant="gold"
              className="w-full group"
            >
              <CircleDollarSign className="mr-1 group-hover:animate-bounce-subtle" />
              Pay ₹{selectedItems.length * 25}
            </Button>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setGameState('item_selection')}
                className="w-full"
              >
                Back to Item Selection
              </Button>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 3: Number Selection */}
        {gameState === 'select_number' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">
              SELECT YOUR LUCKY NUMBER
              {selectedItems.length > 1 && ` (Roll ${currentItemIndex + 1} of ${selectedItems.length})`}
            </h2>
            
            {selectedItems.length > 1 && (
              <div className="mb-4 bg-white p-3 rounded-md border-2 border-coasters-gold/30">
                <div className="flex items-center">
                  <img 
                    src={selectedItems[currentItemIndex].image} 
                    alt={selectedItems[currentItemIndex].name} 
                    className="w-12 h-12 rounded-md object-cover mr-3" 
                  />
                  <div>
                    <p className="font-medium">{selectedItems[currentItemIndex].name}</p>
                    <p className="text-sm text-gray-600">Choose a number for this item</p>
                  </div>
                </div>
              </div>
            )}
            
            <p className="mb-6 text-sm text-gray-600">
              Select one number from 1 to 6. If the dice roll matches your number, you win a free coffee!
            </p>
            
            <DiceSelector onSelect={handleNumberSelect} />
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 4: Roll Dice (Staff Input) */}
        {gameState === 'roll_dice' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">ROLL THE DICE</h2>
            
            <div className="mb-4 bg-white p-3 rounded-md border-2 border-coasters-gold/30">
              <div className="flex items-center">
                <img 
                  src={selectedItems[currentItemIndex].image} 
                  alt={selectedItems[currentItemIndex].name} 
                  className="w-12 h-12 rounded-md object-cover mr-3" 
                />
                <div>
                  <p className="font-medium">{selectedItems[currentItemIndex].name}</p>
                  <p className="text-sm font-medium text-coasters-green">
                    You selected number: <span className="text-lg">{selectedNumber}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <p className="mb-6 text-sm text-gray-600">
              Get ready to roll the physical dice! After rolling, ask the staff to enter the result below.
            </p>
            
            <div className="flex justify-center mb-8">
              <Dices 
                size={80}
                className="text-coasters-orange animate-bounce-subtle"
              />
            </div>
            
            <div className="mb-6">
              <p className="mb-2 font-medium text-center">Staff: Enter the rolled number</p>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <Button 
                    key={num}
                    variant="secondary" 
                    onClick={() => handleDiceRoll(num)}
                    className="h-16 text-2xl font-bold"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Interim result for multiple rolls */}
        {gameState === 'multiple_rolls' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">ROLL RESULT</h2>
            
            <div className="mb-6 p-4 bg-white rounded-md border-2 border-coasters-gold/30">
              <div className="flex items-center mb-3">
                <img 
                  src={selectedItems[currentItemIndex].image} 
                  alt={selectedItems[currentItemIndex].name} 
                  className="w-12 h-12 rounded-md object-cover mr-3" 
                />
                <div>
                  <p className="font-medium">{selectedItems[currentItemIndex].name}</p>
                </div>
              </div>
              
              <div className={`p-3 rounded-md ${results[currentItemIndex].win ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                <p className="text-center">
                  You selected <span className="font-bold">{results[currentItemIndex].selected}</span> and 
                  rolled <span className="font-bold">{results[currentItemIndex].rolled}</span>
                </p>
                <p className="text-center font-medium mt-1">
                  {results[currentItemIndex].win ? (
                    <span className="text-green-700">You won a free coffee!</span>
                  ) : (
                    <span className="text-orange-700">Better luck next time!</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-center font-medium">
                You have {selectedItems.length - currentItemIndex - 1} more {selectedItems.length - currentItemIndex - 1 === 1 ? 'roll' : 'rolls'} remaining!
              </p>
            </div>
            
            <Button 
              onClick={handleNextRoll}
              variant="gold"
              className="w-full"
            >
              Continue to Next Roll
            </Button>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 5: Final Result */}
        {gameState === 'result' && (
          <div className="vintage-card relative">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            {totalWins > 0 ? (
              <>
                <div className="absolute inset-0 bg-yellow-50/50"></div>
                <div className="relative z-10">
                  <h2 className="font-hackney text-xl text-coasters-green mb-2">
                    {totalWins === selectedItems.length ? 'PERFECT SCORE!' : 'CONGRATULATIONS!'}
                  </h2>
                  
                  <div className="flex justify-center mb-4">
                    <Trophy 
                      size={60}
                      className="text-coasters-gold animate-bounce-subtle"
                    />
                  </div>
                  
                  <div className="bg-white rounded-md border-2 border-coasters-orange p-4 mb-6 shadow-md">
                    <p className="text-center font-medium mb-2">
                      You won {totalWins} {totalWins === 1 ? 'time' : 'times'} out of {selectedItems.length} {selectedItems.length === 1 ? 'roll' : 'rolls'}!
                    </p>
                    <p className="text-center font-hackney text-xl text-coasters-orange">
                      YOU WON {totalWins} FREE {totalWins === 1 ? 'COFFEE' : 'COFFEES'}!
                    </p>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {totalWins} {totalWins === 1 ? 'coupon has' : 'coupons have'} been added to your account
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-hackney text-xl text-coasters-green mb-4">BETTER LUCK NEXT TIME!</h2>
                <p className="mb-6 text-sm text-gray-600">
                  You didn't win this time, but your items are ready! Thanks for playing.
                </p>
              </>
            )}
            
            <div className="bg-white rounded-md border-2 border-coasters-gold p-4 mb-6">
              <h3 className="font-hackney text-lg text-coasters-green mb-3">GAME SUMMARY</h3>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-md border ${
                      result.win 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <img 
                          src={result.item.image} 
                          alt={result.item.name} 
                          className="w-8 h-8 rounded-full object-cover mr-2" 
                        />
                        <span className="font-medium">{result.item.name}</span>
                      </div>
                      {result.win && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                          Winner
                        </span>
                      )}
                    </div>
                    <div className="text-sm">
                      Selected: <span className="font-medium">{result.selected}</span>,
                      Rolled: <span className="font-medium">{result.rolled}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={resetGame}
                variant="gold"
                className="w-full"
              >
                Play Again
              </Button>
              
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
      </main>
      
      {/* Display the number of dice rolls at the bottom */}
      {(gameState === 'select_number' || gameState === 'roll_dice') && (
        <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-4">
          <div className="text-white text-center">
            <p className="text-sm">
              Roll {currentItemIndex + 1} of {selectedItems.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
