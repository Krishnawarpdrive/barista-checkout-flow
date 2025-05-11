
import { GameState } from '@/pages/DiceGame';

interface ProgressIndicatorProps {
  gameState: GameState;
}

export default function ProgressIndicator({ gameState }: ProgressIndicatorProps) {
  return (
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
  );
}
