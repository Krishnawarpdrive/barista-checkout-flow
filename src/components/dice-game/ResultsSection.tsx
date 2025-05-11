
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { GameItem } from '@/pages/DiceGame';
import { useNavigate } from 'react-router-dom';

interface RollResult {
  item: GameItem;
  selected: number;
  rolled: number;
  win: boolean;
}

interface ResultsSectionProps {
  selectedItems: GameItem[];
  results: RollResult[];
  totalWins: number;
  onResetGame: () => void;
}

export default function ResultsSection({
  selectedItems,
  results,
  totalWins,
  onResetGame
}: ResultsSectionProps) {
  const navigate = useNavigate();
  
  return (
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
          onClick={onResetGame}
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
  );
}
