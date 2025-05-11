
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dices, CircleDollarSign, Trophy } from 'lucide-react';
import DiceSelector from '@/components/DiceSelector';
import ItemSelector from '@/components/ItemSelector';
import { toast } from 'sonner';

// Game states to manage the flow
type GameState = 'select_number' | 'select_item' | 'payment' | 'roll_dice' | 'result';

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
  const { isAuthenticated } = useAuth();
  
  const [gameState, setGameState] = useState<GameState>('select_number');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [isWinner, setIsWinner] = useState(false);
  
  // Handle number selection
  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    setGameState('select_item');
  };
  
  // Handle item selection
  const handleItemSelect = (item: GameItem) => {
    setSelectedItem(item);
    setGameState('payment');
  };
  
  // Handle payment process
  const handlePayment = () => {
    toast.success("Payment of ₹25 successful!");
    setGameState('roll_dice');
  };
  
  // Handle the dice roll (staff input)
  const handleDiceRoll = (rolledValue: number) => {
    setRolledNumber(rolledValue);
    
    // Check if the user won
    const hasWon = rolledValue === selectedNumber;
    setIsWinner(hasWon);
    
    setGameState('result');
    
    if (hasWon) {
      toast.success("Congratulations! You won a free coffee!");
    } else {
      toast.info("Better luck next time! Enjoy your purchase.");
    }
  };
  
  // Reset the game
  const resetGame = () => {
    setSelectedNumber(null);
    setSelectedItem(null);
    setRolledNumber(null);
    setIsWinner(false);
    setGameState('select_number');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      
      <main className="flex-grow p-4">
        <div className="mb-6">
          <h1 className="font-hackney text-3xl text-coasters-green mb-2">DICE GAME</h1>
          <p className="text-coasters-green/80">Select a number, choose an item, and test your luck!</p>
        </div>
        
        {/* Game progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${gameState === 'select_number' || gameState === 'select_item' || gameState === 'payment' || gameState === 'roll_dice' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'select_number' || gameState === 'select_item' || gameState === 'payment' || gameState === 'roll_dice' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>1</div>
              <span className="text-xs mt-1">Select</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'select_item' || gameState === 'payment' || gameState === 'roll_dice' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'select_item' || gameState === 'payment' || gameState === 'roll_dice' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>2</div>
              <span className="text-xs mt-1">Item</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'payment' || gameState === 'roll_dice' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'payment' || gameState === 'roll_dice' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>3</div>
              <span className="text-xs mt-1">Pay</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'roll_dice' || gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'roll_dice' || gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>4</div>
              <span className="text-xs mt-1">Roll</span>
            </div>
            
            <div className="flex-grow border-t-2 border-dashed border-coasters-gold/50 mx-2"></div>
            
            <div className={`flex flex-col items-center ${gameState === 'result' ? 'text-coasters-green' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${gameState === 'result' ? 'bg-coasters-gold' : 'bg-gray-200'}`}>5</div>
              <span className="text-xs mt-1">Result</span>
            </div>
          </div>
        </div>
        
        {/* Step 1: Number selection */}
        {gameState === 'select_number' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">SELECT YOUR LUCKY NUMBER</h2>
            <p className="mb-6 text-sm text-gray-600">Select one number from 1 to 6. If the dice roll matches your number, you win a free coffee!</p>
            
            <DiceSelector onSelect={handleNumberSelect} />
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 2: Item selection */}
        {gameState === 'select_item' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">CHOOSE YOUR ITEM</h2>
            <p className="mb-6 text-sm text-gray-600">Select one item you'd like to have with your game. Each costs ₹25.</p>
            
            <ItemSelector items={gameItems} onSelect={handleItemSelect} />
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setGameState('select_number')}
                className="w-full"
              >
                Back to Number Selection
              </Button>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 3: Payment */}
        {gameState === 'payment' && selectedItem && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">PAYMENT</h2>
            
            <div className="bg-white rounded-md border-2 border-coasters-gold p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Selected Number:</span>
                <div className="w-8 h-8 rounded-full bg-coasters-green text-white flex items-center justify-center font-bold">
                  {selectedNumber}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Selected Item:</span>
                <div className="flex items-center">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="w-8 h-8 rounded-full object-cover mr-2" 
                  />
                  <span>{selectedItem.name}</span>
                </div>
              </div>
              
              <div className="border-t border-dashed border-coasters-green/30 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-coasters-green">Total</span>
                  <span className="font-bold text-lg">₹25</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              variant="gold"
              className="w-full group"
            >
              <CircleDollarSign className="mr-1 group-hover:animate-bounce-subtle" />
              Pay ₹25
            </Button>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setGameState('select_item')}
                className="w-full"
              >
                Back
              </Button>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
        )}
        
        {/* Step 4: Roll Dice (Staff Input) */}
        {gameState === 'roll_dice' && (
          <div className="vintage-card">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <h2 className="font-hackney text-xl text-coasters-green mb-4">ROLL THE DICE</h2>
            <p className="mb-6 text-sm text-gray-600">Get ready to roll the physical dice! After rolling, ask the staff to enter the result below.</p>
            
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
        
        {/* Step 5: Result */}
        {gameState === 'result' && selectedItem && rolledNumber !== null && (
          <div className="vintage-card relative">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            {isWinner ? (
              <>
                <div className="absolute inset-0 bg-yellow-50/50"></div>
                <div className="relative z-10">
                  <h2 className="font-hackney text-xl text-coasters-green mb-2">CONGRATULATIONS!</h2>
                  <div className="flex justify-center mb-4">
                    <Trophy 
                      size={60}
                      className="text-coasters-gold animate-bounce-subtle"
                    />
                  </div>
                  
                  <div className="bg-white rounded-md border-2 border-coasters-orange p-4 mb-6 shadow-md">
                    <p className="text-center font-medium mb-2">You selected <span className="text-coasters-green font-bold">{selectedNumber}</span> and rolled <span className="text-coasters-green font-bold">{rolledNumber}</span></p>
                    <p className="text-center font-hackney text-xl text-coasters-orange">YOU WON A FREE COFFEE!</p>
                    <p className="text-center text-sm text-gray-600 mt-2">The coupon has been added to your account</p>
                  </div>
                  
                  <div className="bg-white rounded-md border-2 border-coasters-gold p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={selectedItem.image} 
                          alt={selectedItem.name} 
                          className="w-12 h-12 rounded-md object-cover mr-3" 
                        />
                        <div>
                          <h3 className="font-medium">{selectedItem.name}</h3>
                          <p className="text-sm text-gray-600">Your selected item is ready!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-hackney text-xl text-coasters-green mb-4">BETTER LUCK NEXT TIME!</h2>
                <p className="mb-6 text-sm text-gray-600">You selected {selectedNumber} and rolled {rolledNumber}. Don't worry, your selected item is ready!</p>
                
                <div className="bg-white rounded-md border-2 border-coasters-gold p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={selectedItem.image} 
                        alt={selectedItem.name} 
                        className="w-12 h-12 rounded-md object-cover mr-3" 
                      />
                      <div>
                        <h3 className="font-medium">{selectedItem.name}</h3>
                        <p className="text-sm text-gray-600">Your selected item is ready!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
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
    </div>
  );
}
