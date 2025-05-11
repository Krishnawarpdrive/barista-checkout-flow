
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// Component imports
import ItemSelectionSection from '@/components/dice-game/ItemSelectionSection';
import PaymentSection from '@/components/dice-game/PaymentSection';
import NumberSelectionSection from '@/components/dice-game/NumberSelectionSection';
import DiceRollSection from '@/components/dice-game/DiceRollSection';
import MultipleRollsSection from '@/components/dice-game/MultipleRollsSection';
import ResultsSection from '@/components/dice-game/ResultsSection';
import ProgressIndicator from '@/components/dice-game/ProgressIndicator';
import FooterIndicator from '@/components/dice-game/FooterIndicator';

// Game states to manage the flow
export type GameState = 'item_selection' | 'payment' | 'select_number' | 'roll_dice' | 'multiple_rolls' | 'result';

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

export type RollResult = {
  item: GameItem;
  selected: number;
  rolled: number;
  win: boolean;
};

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
  const [results, setResults] = useState<RollResult[]>([]);
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
        <ProgressIndicator gameState={gameState} />
        
        {/* Different game sections based on current state */}
        {gameState === 'item_selection' && (
          <ItemSelectionSection 
            gameItems={gameItems}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}
            onComplete={handleItemSelectionComplete}
            onBack={() => navigate('/')}
          />
        )}
        
        {gameState === 'payment' && (
          <PaymentSection
            selectedItems={selectedItems}
            onPayment={handlePayment}
            onBack={() => setGameState('item_selection')}
          />
        )}
        
        {gameState === 'select_number' && (
          <NumberSelectionSection
            selectedItems={selectedItems}
            currentItemIndex={currentItemIndex}
            onNumberSelect={handleNumberSelect}
          />
        )}
        
        {gameState === 'roll_dice' && (
          <DiceRollSection
            selectedItems={selectedItems}
            currentItemIndex={currentItemIndex}
            selectedNumber={selectedNumber}
            onDiceRoll={handleDiceRoll}
          />
        )}
        
        {gameState === 'multiple_rolls' && (
          <MultipleRollsSection
            currentItemIndex={currentItemIndex}
            selectedItems={selectedItems}
            results={results}
            onNextRoll={handleNextRoll}
          />
        )}
        
        {gameState === 'result' && (
          <ResultsSection
            selectedItems={selectedItems}
            results={results}
            totalWins={totalWins}
            onResetGame={resetGame}
          />
        )}
      </main>
      
      {/* Display the number of dice rolls at the bottom */}
      {(gameState === 'select_number' || gameState === 'roll_dice') && (
        <FooterIndicator 
          currentItemIndex={currentItemIndex} 
          totalItems={selectedItems.length} 
        />
      )}
    </div>
  );
}
