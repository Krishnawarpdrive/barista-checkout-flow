
import { Dices } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameItem } from '@/pages/DiceGame';

interface DiceGameRollProps {
  currentItem: GameItem;
  selectedNumber: number | null;
  onSelectNumber: (num: number) => void;
  onRollDice: () => void;
  isRolling: boolean;
  totalRolls: number;
  currentRoll: number;
}

export default function DiceGameRoll({
  currentItem,
  selectedNumber,
  onSelectNumber,
  onRollDice,
  isRolling,
  totalRolls,
  currentRoll
}: DiceGameRollProps) {
  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="bg-coasters-gold text-coasters-green px-3 py-1 rounded-full text-sm font-bold">
          Roll {currentRoll} of {totalRolls}
        </span>
      </div>
      
      <h1 className="text-2xl font-hackney text-coasters-green mb-2">CHOOSE A NUMBER</h1>
      <p className="text-gray-600 mb-6">Pick a number and roll the dice to win!</p>
      
      <div className="bg-white rounded-lg border-2 border-coasters-gold p-4 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-coasters-cream rounded-md overflow-hidden">
            <img 
              src={currentItem.image} 
              alt={currentItem.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <h3 className="font-medium">{currentItem.name}</h3>
            <p className="text-sm text-gray-500">₹{currentItem.price}</p>
          </div>
        </div>
        
        <p className="text-sm bg-coasters-cream p-2 rounded">
          Select a number below and click "Roll Dice" to start the game
        </p>
      </div>
      
      <h3 className="font-hackney text-coasters-green mb-3">SELECT YOUR NUMBER</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Button
            key={num}
            onClick={() => onSelectNumber(num)}
            variant={selectedNumber === num ? "gold" : "outline"}
            className={`h-16 text-2xl font-bold ${selectedNumber === num ? 'ring-2 ring-coasters-gold' : ''}`}
          >
            {num}
          </Button>
        ))}
      </div>
      
      <Button
        onClick={onRollDice}
        disabled={selectedNumber === null || isRolling}
        className="w-full bg-coasters-green hover:bg-coasters-green/90 py-6 text-lg"
      >
        {isRolling ? (
          <div className="flex items-center">
            <span className="animate-spin mr-2">
              <Dices className="h-5 w-5" />
            </span>
            Rolling...
          </div>
        ) : (
          <>
            Roll Dice <Dices className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
      
      {isRolling && (
        <p className="mt-4 text-sm text-coasters-green">
          Please roll the physical dice now!
        </p>
      )}
    </div>
  );
}
