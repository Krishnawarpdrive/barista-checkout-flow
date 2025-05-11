
import { Button } from '@/components/ui/button';
import { GameItem } from '@/pages/DiceGame';

interface RollResult {
  item: GameItem;
  selected: number;
  rolled: number;
  win: boolean;
}

interface MultipleRollsSectionProps {
  currentItemIndex: number;
  selectedItems: GameItem[];
  results: RollResult[];
  onNextRoll: () => void;
}

export default function MultipleRollsSection({
  currentItemIndex,
  selectedItems,
  results,
  onNextRoll
}: MultipleRollsSectionProps) {
  return (
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
        onClick={onNextRoll}
        variant="gold"
        className="w-full"
      >
        Continue to Next Roll
      </Button>
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
