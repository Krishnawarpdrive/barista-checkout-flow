
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { 
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';

type GameStage = 'item-selection' | 'payment' | 'number-selection' | 'dice-roll' | 'multiple-rolls' | 'results';
type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;
type GameResult = 'win' | 'lose' | null;

interface GameItem {
  id: string;
  name: string;
  price: number;
}

const gameItems: GameItem[] = [
  { id: 'dice-item-1', name: 'Cappuccino', price: 25 },
  { id: 'dice-item-2', name: 'Espresso', price: 25 },
  { id: 'dice-item-3', name: 'Croissant', price: 25 },
  { id: 'dice-item-4', name: 'Chocolate Cookie', price: 25 },
];

export default function DiceGame() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gameStage, setGameStage] = useState<GameStage>('item-selection');
  const [selectedItems, setSelectedItems] = useState<GameItem[]>([]);
  const [currentRollIndex, setCurrentRollIndex] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<DiceNumber | null>(null);
  const [showStaffInput, setShowStaffInput] = useState(false);
  const [staffRolledNumber, setStaffRolledNumber] = useState<DiceNumber | null>(null);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Handle item selection
  const toggleItemSelection = (item: GameItem) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  // Handle payment process
  const handlePayment = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to play the game.");
      return;
    }
    
    toast.success("Payment successful! Let's play the game!");
    setGameStage('number-selection');
  };
  
  // Handle number selection
  const handleNumberSelection = (number: DiceNumber) => {
    setSelectedNumber(number);
    toast.info("Number selected! Please roll the dice.");
    setGameStage('dice-roll');
  };
  
  // Handle staff input for dice roll result
  const handleStaffInput = () => {
    setShowStaffInput(true);
  };
  
  // Process dice roll result
  const processRollResult = (rolledNumber: DiceNumber) => {
    setStaffRolledNumber(rolledNumber);
    setShowStaffInput(false);
    
    const isWin = rolledNumber === selectedNumber;
    const updatedResults = [...gameResults];
    updatedResults[currentRollIndex] = isWin ? 'win' : 'lose';
    setGameResults(updatedResults);
    
    if (isWin) {
      setShowConfetti(true);
      toast.success("Congratulations! You won a free coffee!");
      // Here we would add the coupon to the user's account
    } else {
      toast.info("Better luck next time!");
    }
    
    // Check if there are more rolls to make
    if (currentRollIndex < selectedItems.length - 1) {
      setTimeout(() => {
        setCurrentRollIndex(currentRollIndex + 1);
        setSelectedNumber(null);
        setStaffRolledNumber(null);
        setShowConfetti(false);
        setGameStage('multiple-rolls');
      }, 3000);
    } else {
      setTimeout(() => {
        setGameStage('results');
        setShowConfetti(false);
      }, 3000);
    }
  };
  
  // Reset game
  const resetGame = () => {
    setGameStage('item-selection');
    setSelectedItems([]);
    setCurrentRollIndex(0);
    setSelectedNumber(null);
    setStaffRolledNumber(null);
    setGameResults([]);
    setShowConfetti(false);
  };
  
  // Render dice icon based on number
  const renderDiceIcon = (number: number, size = 48) => {
    switch (number) {
      case 1: return <Dice1 size={size} className="text-coasters-orange" />;
      case 2: return <Dice2 size={size} className="text-coasters-orange" />;
      case 3: return <Dice3 size={size} className="text-coasters-orange" />;
      case 4: return <Dice4 size={size} className="text-coasters-orange" />;
      case 5: return <Dice5 size={size} className="text-coasters-orange" />;
      case 6: return <Dice6 size={size} className="text-coasters-orange" />;
      default: return <Dices size={size} className="text-coasters-orange" />;
    }
  };
  
  // Render progress indicator
  const renderProgressIndicator = () => {
    return (
      <div className="flex items-center justify-center my-6">
        <div className={`h-2 w-2 rounded-full mx-1 ${gameStage === 'item-selection' ? 'bg-coasters-orange' : 'bg-gray-300'}`}></div>
        <div className={`h-2 w-2 rounded-full mx-1 ${gameStage === 'payment' ? 'bg-coasters-orange' : 'bg-gray-300'}`}></div>
        <div className={`h-2 w-2 rounded-full mx-1 ${gameStage === 'number-selection' || gameStage === 'dice-roll' || gameStage === 'multiple-rolls' ? 'bg-coasters-orange' : 'bg-gray-300'}`}></div>
        <div className={`h-2 w-2 rounded-full mx-1 ${gameStage === 'results' ? 'bg-coasters-orange' : 'bg-gray-300'}`}></div>
      </div>
    );
  };

  // Render items selection screen
  const renderItemSelection = () => (
    <div className="p-4">
      <h2 className="text-2xl font-hackney text-coasters-green mb-6">SELECT ITEMS TO PLAY</h2>
      <p className="mb-4 text-gray-600">
        For each item you select (₹25 each), you get one dice roll. Match your number with the dice roll and win a free coffee!
      </p>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {gameItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => toggleItemSelection(item)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedItems.some(i => i.id === item.id) 
                ? 'border-coasters-orange bg-coasters-orange/10' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.name}</span>
              <span className="font-bold text-coasters-orange">₹{item.price}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="vintage-card p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Selected Items:</p>
            <p className="text-xl font-bold">{selectedItems.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Dice Rolls:</p>
            <p className="text-xl font-bold">{selectedItems.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount:</p>
            <p className="text-xl font-bold">₹{selectedItems.length * 25}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button 
          onClick={() => setGameStage('payment')} 
          disabled={selectedItems.length === 0}
          className="bg-coasters-orange hover:bg-coasters-orange/90 text-white py-6"
        >
          Proceed to Payment
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/cart')}
          className="border-coasters-green text-coasters-green"
        >
          Back to Cart
        </Button>
      </div>
    </div>
  );

  // Render payment view
  const renderPaymentView = () => (
    <div className="p-4">
      <h2 className="text-2xl font-hackney text-coasters-green mb-6">PAYMENT</h2>
      
      <div className="vintage-card p-4 mb-6">
        <h3 className="text-lg font-bold mb-3">Payment Summary</h3>
        
        <div className="space-y-3">
          {selectedItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
          
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{selectedItems.length * 25}</span>
          </div>
        </div>
      </div>
      
      <div className="vintage-card p-4 mb-6">
        <div className="flex items-center gap-3">
          <Dices size={36} className="text-coasters-orange" />
          <div>
            <p className="text-gray-600">Number of Dice Rolls:</p>
            <p className="text-xl font-bold">{selectedItems.length}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button 
          onClick={handlePayment} 
          className="bg-coasters-orange hover:bg-coasters-orange/90 text-white py-6"
        >
          Pay Now (₹{selectedItems.length * 25})
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setGameStage('item-selection')}
          className="border-coasters-green text-coasters-green"
        >
          Back
        </Button>
      </div>
    </div>
  );

  // Render number selection screen
  const renderNumberSelection = () => (
    <div className="p-4">
      <h2 className="text-2xl font-hackney text-coasters-green mb-4">CHOOSE YOUR LUCKY NUMBER</h2>
      <p className="mb-6 text-gray-600">
        Select a number from 1 to 6, then roll the dice and see if you win!
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberSelection(number as DiceNumber)}
            className={`w-20 h-20 flex items-center justify-center rounded-lg border-2 ${
              selectedNumber === number 
                ? 'border-coasters-orange bg-coasters-orange/10' 
                : 'border-gray-300'
            } transition-all hover:border-coasters-orange focus:outline-none`}
          >
            {renderDiceIcon(number, 36)}
          </button>
        ))}
      </div>
      
      <div className="vintage-card p-4 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-gray-600">Roll {currentRollIndex + 1} of {selectedItems.length}</p>
            <p className="text-gray-600">Item: {selectedItems[currentRollIndex]?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render dice roll screen
  const renderDiceRoll = () => (
    <div className="p-4">
      <h2 className="text-2xl font-hackney text-coasters-green mb-4">ROLL THE DICE</h2>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="mb-4">
          <p className="text-center mb-2">Your chosen number:</p>
          <div className="flex justify-center">
            {selectedNumber && renderDiceIcon(selectedNumber, 64)}
          </div>
        </div>
        
        <div className="w-32 h-32 border-2 border-dashed border-coasters-orange rounded-lg flex items-center justify-center my-8">
          <Dices size={64} className="text-coasters-orange animate-bounce-subtle" />
        </div>
        
        <p className="text-center mb-6">Please roll the physical dice now!</p>
        
        <Button 
          onClick={handleStaffInput}
          className="bg-coasters-green hover:bg-coasters-green/90 text-white"
        >
          I've Rolled the Dice
        </Button>
      </div>
      
      {/* Staff Input Dialog */}
      <Dialog open={showStaffInput} onOpenChange={setShowStaffInput}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Staff: Enter Dice Result</DialogTitle>
            <DialogDescription>
              Please enter the number that was rolled on the physical dice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-wrap justify-center gap-3 my-4">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <button
                key={number}
                onClick={() => processRollResult(number as DiceNumber)}
                className="w-16 h-16 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-coasters-orange focus:outline-none"
              >
                {renderDiceIcon(number, 32)}
              </button>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStaffInput(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Result Display */}
      {staffRolledNumber && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white p-6 rounded-lg text-center max-w-md relative">
            {showConfetti && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
              </div>
            )}
            
            <div className="mb-4">
              <p className="text-lg font-semibold">Dice Result:</p>
              {renderDiceIcon(staffRolledNumber, 80)}
            </div>
            
            {selectedNumber === staffRolledNumber ? (
              <>
                <h3 className="text-2xl font-bold mb-2 text-green-600">Congratulations!</h3>
                <p className="mb-4">You won a free coffee!</p>
                <div className="p-3 border-2 border-dashed border-coasters-gold bg-coasters-gold/10 rounded-md mb-4">
                  <p className="font-bold">Free Coffee Coupon</p>
                  <p className="text-sm">Added to your profile</p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">Better luck next time!</h3>
                <p className="mb-4">Your number ({selectedNumber}) didn't match the roll ({staffRolledNumber}).</p>
              </>
            )}
            
            <Button 
              onClick={() => {
                if (currentRollIndex < selectedItems.length - 1) {
                  setCurrentRollIndex(currentRollIndex + 1);
                  setSelectedNumber(null);
                  setStaffRolledNumber(null);
                  setShowConfetti(false);
                  setGameStage('number-selection');
                } else {
                  setGameStage('results');
                }
              }}
              className="bg-coasters-orange hover:bg-coasters-orange/90 text-white w-full"
            >
              {currentRollIndex < selectedItems.length - 1 ? 'Next Roll' : 'See Results'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Render multiple rolls screen
  const renderMultipleRolls = () => (
    <div className="p-4">
      <h2 className="text-2xl font-hackney text-coasters-green mb-4">NEXT ROLL</h2>
      
      <p className="mb-6 text-center">
        Roll {currentRollIndex + 1} of {selectedItems.length}
      </p>
      
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <p className="text-center mb-2">Item:</p>
          <p className="text-xl font-bold text-center">{selectedItems[currentRollIndex]?.name}</p>
        </div>
        
        <Button 
          onClick={() => setGameStage('number-selection')}
          className="bg-coasters-orange hover:bg-coasters-orange/90 text-white"
        >
          Choose Your Number
        </Button>
      </div>
    </div>
  );

  // Render results screen
  const renderResults = () => {
    const totalWins = gameResults.filter(result => result === 'win').length;
    
    return (
      <div className="p-4">
        <h2 className="text-2xl font-hackney text-coasters-green mb-6">GAME RESULTS</h2>
        
        <div className="vintage-card p-4 mb-6">
          <h3 className="text-lg font-bold mb-3">Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{selectedItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span>₹{selectedItems.length * 25}</span>
            </div>
            <div className="flex justify-between font-bold text-coasters-orange">
              <span>Total Wins:</span>
              <span>{totalWins}</span>
            </div>
          </div>
        </div>
        
        {totalWins > 0 && (
          <div className="vintage-card p-4 mb-6 bg-coasters-gold/10">
            <h3 className="text-lg font-bold mb-3 text-coasters-green">Your Rewards</h3>
            
            <div className="p-3 border-2 border-dashed border-coasters-gold rounded-md mb-2">
              <p className="font-bold">{totalWins} Free Coffee Coupon{totalWins > 1 ? 's' : ''}</p>
              <p className="text-sm">Added to your profile</p>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              Use your coupon next time you order. Go to your profile to view your coupons.
            </p>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={resetGame} 
            className="bg-coasters-green hover:bg-coasters-green/90 text-white"
          >
            Play Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-coasters-green text-coasters-green"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    );
  };

  // Render content based on current game stage
  const renderGameContent = () => {
    switch (gameStage) {
      case 'item-selection':
        return renderItemSelection();
      case 'payment':
        return renderPaymentView();
      case 'number-selection':
        return renderNumberSelection();
      case 'dice-roll':
        return renderDiceRoll();
      case 'multiple-rolls':
        return renderMultipleRolls();
      case 'results':
        return renderResults();
      default:
        return renderItemSelection();
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow flex flex-col">
        {renderProgressIndicator()}
        {renderGameContent()}
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-2 flex items-center justify-center">
        <p className="text-white text-xs text-center">
          {gameStage === 'item-selection' && "Select items to play"}
          {gameStage === 'payment' && "Complete payment to start game"}
          {gameStage === 'number-selection' && "Choose your lucky number"}
          {gameStage === 'dice-roll' && "Roll the dice to see if you win"}
          {gameStage === 'multiple-rolls' && `Roll ${currentRollIndex + 1} of ${selectedItems.length}`}
          {gameStage === 'results' && "Game complete - see your results"}
        </p>
      </div>
    </div>
  );
}
