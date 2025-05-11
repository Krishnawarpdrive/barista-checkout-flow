
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight } from 'lucide-react';

interface DiceGameResultProps {
  isWinner: boolean;
  selectedNumber: number;
  rolledNumber: number;
  showConfetti: boolean;
  onNextRoll: () => void;
  hasMoreRolls: boolean;
  currentRoll: number;
  totalRolls: number;
}

export default function DiceGameResult({
  isWinner,
  selectedNumber,
  rolledNumber,
  showConfetti,
  onNextRoll,
  hasMoreRolls,
  currentRoll,
  totalRolls
}: DiceGameResultProps) {
  useEffect(() => {
    // Scroll to top when result is shown
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="bg-coasters-gold text-coasters-green px-3 py-1 rounded-full text-sm font-bold">
          Roll {currentRoll} of {totalRolls}
        </span>
      </div>
      
      <h1 className="text-2xl font-hackney text-coasters-green mb-2">
        {isWinner ? 'YOU WON!' : 'BETTER LUCK NEXT TIME!'}
      </h1>
      
      <div className="bg-white rounded-lg border-2 border-coasters-gold p-6 mb-6 relative overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center ${isWinner ? 'bg-green-50' : 'bg-orange-50'} bg-opacity-50`}>
          <div className={`rounded-full ${isWinner ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'} p-6`}>
            {isWinner ? (
              <Check className="h-16 w-16" />
            ) : (
              <X className="h-16 w-16" />
            )}
          </div>
        </div>
        
        <div className="relative z-10 mt-28">
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">You Selected</p>
              <div className="h-16 w-16 bg-coasters-gold text-coasters-green rounded-lg text-2xl font-bold flex items-center justify-center mx-auto mt-2">
                {selectedNumber}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Dice Rolled</p>
              <div className="h-16 w-16 bg-coasters-green text-white rounded-lg text-2xl font-bold flex items-center justify-center mx-auto mt-2">
                {rolledNumber}
              </div>
            </div>
          </div>
          
          {isWinner && (
            <div className="bg-green-100 p-4 rounded-md mb-4">
              <p className="text-green-800 font-medium">
                Congratulations! You won a free coffee coupon!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Coupon "WINNERSDICE" has been added to your account
              </p>
            </div>
          )}
          
          {!isWinner && (
            <p className="text-gray-600 mb-4">
              The numbers didn't match. Try again next time!
            </p>
          )}
        </div>
      </div>
      
      <Button
        onClick={onNextRoll}
        variant={isWinner ? "gold" : "default"}
        className="w-full py-6 text-lg"
      >
        {hasMoreRolls ? (
          <>Next Roll <ArrowRight className="ml-2 h-5 w-5" /></>
        ) : (
          'Finish Game'
        )}
      </Button>
      
      {/* Confetti effect */}
      {showConfetti && <Confetti />}
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="confetti-container">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: ['#E9C55D', '#E2552D', '#004D47', '#FFCA28'][Math.floor(Math.random() * 4)]
            }}
          />
        ))}
      </div>
    </div>
  );
}
