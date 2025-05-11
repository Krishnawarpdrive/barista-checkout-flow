
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dices, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import ItemSelector from '@/components/ItemSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DiceGameRoll from '@/components/game/DiceGameRoll';
import DiceGameResult from '@/components/game/DiceGameResult';

export interface GameItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

type GameStage = 'selection' | 'payment' | 'roll' | 'result';

const gameItems: GameItem[] = [
  {
    id: '1',
    name: 'Cappuccino',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    price: 25
  },
  {
    id: '2',
    name: 'Croissant',
    image: 'https://images.unsplash.com/photo-1592985684811-8f22c3c34555?w=400&h=300&fit=crop',
    price: 25
  },
  {
    id: '3',
    name: 'Filter Coffee',
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop',
    price: 25
  },
  {
    id: '4',
    name: 'Cookies',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    price: 25
  }
];

export default function DiceGame() {
  const navigate = useNavigate();
  const { applyCoupon } = useCart();
  const [selectedItems, setSelectedItems] = useState<GameItem[]>([]);
  const [stage, setStage] = useState<GameStage>('selection');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [isWinner, setIsWinner] = useState(false);
  const [currentRollIndex, setCurrentRollIndex] = useState(0);
  const [gameResults, setGameResults] = useState<{win: boolean, selected: number, rolled: number}[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [showStaffDialog, setShowStaffDialog] = useState(false);

  const handleItemSelect = (item: GameItem) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setPaymentProcessing(false);
      setStage('roll');
    }, 1500);
  };

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
  };

  const handleRollDice = () => {
    if (selectedNumber === null) return;
    
    setIsRolling(true);
    // Show staff dialog after animation
    setTimeout(() => {
      setIsRolling(false);
      setShowStaffDialog(true);
    }, 2000);
  };

  const handleStaffInput = (rolledNum: number) => {
    setRolledNumber(rolledNum);
    setShowStaffDialog(false);
    
    const win = selectedNumber === rolledNum;
    setIsWinner(win);
    
    // Add result to game results array
    setGameResults([...gameResults, {
      win,
      selected: selectedNumber!,
      rolled: rolledNum
    }]);
    
    if (win) {
      // Add coupon if won
      applyCoupon('WINNERSDICE');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    setStage('result');
  };

  const handleNextRoll = () => {
    const nextIndex = currentRollIndex + 1;
    if (nextIndex < selectedItems.length) {
      setCurrentRollIndex(nextIndex);
      setSelectedNumber(null);
      setRolledNumber(null);
      setStage('roll');
    } else {
      // Game complete
      navigate('/order-success');
    }
  };

  const totalAmount = selectedItems.length * 25;
  const remainingRolls = selectedItems.length - currentRollIndex - 1;

  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      
      <main className="flex-grow p-4 pb-20">
        {/* Stage 1: Item Selection */}
        {stage === 'selection' && (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <Dices className="h-10 w-10 text-coasters-green" />
              </div>
              <h1 className="text-2xl font-hackney text-coasters-green mb-2">PLAY DICE & WIN</h1>
              <p className="text-gray-600">Select items to play the dice game!</p>
            </div>
            
            <ItemSelector items={gameItems} onSelect={handleItemSelect} />
            
            <div className="mt-6 bg-white p-4 rounded-lg border-2 border-coasters-gold shadow">
              <h2 className="font-hackney text-coasters-green text-lg">GAME SUMMARY</h2>
              <div className="mt-2">
                <p>Selected Items: <span className="font-bold">{selectedItems.length}</span></p>
                <p>Dice Rolls: <span className="font-bold">{selectedItems.length}</span></p>
                <p className="font-bold mt-2">Total: ₹{totalAmount}</p>
              </div>
              
              <div className="mt-4">
                <Button 
                  onClick={() => setStage('payment')} 
                  disabled={selectedItems.length === 0}
                  className="w-full"
                  variant="gold"
                >
                  Proceed <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </div>
            </div>
          </>
        )}
        
        {/* Stage 2: Payment */}
        {stage === 'payment' && (
          <div className="text-center">
            <h1 className="text-2xl font-hackney text-coasters-green mb-6">PAYMENT</h1>
            
            <div className="bg-white rounded-lg border-2 border-coasters-gold shadow p-4 mb-6">
              <h2 className="font-hackney text-coasters-green text-lg mb-2">ORDER SUMMARY</h2>
              <div className="space-y-2">
                {selectedItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-coasters-cream rounded-md">
                <p className="text-sm font-medium text-coasters-green">
                  You'll get to play {selectedItems.length} dice roll{selectedItems.length > 1 ? 's' : ''}!
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              disabled={paymentProcessing}
              variant="gold" 
              className="w-full"
            >
              {paymentProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
            
            {paymentProcessing && (
              <p className="mt-4 text-coasters-green">
                Processing payment...
              </p>
            )}
          </div>
        )}
        
        {/* Stage 3: Roll Dice */}
        {stage === 'roll' && (
          <DiceGameRoll
            currentItem={selectedItems[currentRollIndex]}
            selectedNumber={selectedNumber}
            onSelectNumber={handleNumberSelect}
            onRollDice={handleRollDice}
            isRolling={isRolling}
            totalRolls={selectedItems.length}
            currentRoll={currentRollIndex + 1}
          />
        )}
        
        {/* Stage 4: Result */}
        {stage === 'result' && rolledNumber !== null && selectedNumber !== null && (
          <DiceGameResult
            isWinner={isWinner}
            selectedNumber={selectedNumber}
            rolledNumber={rolledNumber!}
            showConfetti={showConfetti}
            onNextRoll={handleNextRoll}
            hasMoreRolls={remainingRolls > 0}
            currentRoll={currentRollIndex + 1}
            totalRolls={selectedItems.length}
          />
        )}
      </main>
      
      {/* Staff Input Dialog */}
      <Dialog open={showStaffDialog} onOpenChange={setShowStaffDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-hackney text-coasters-green">STAFF INPUT</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-center">Enter the number that was rolled on the physical dice:</p>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <Button
                  key={num}
                  onClick={() => handleStaffInput(num)}
                  variant="outline"
                  className="h-12 text-xl font-bold"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
