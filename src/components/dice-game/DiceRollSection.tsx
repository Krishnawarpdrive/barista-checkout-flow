
import { Button } from '@/components/ui/button';
import { Dices } from 'lucide-react';
import { GameItem } from '@/pages/DiceGame';

interface DiceRollSectionProps {
  selectedItems: GameItem[];
  currentItemIndex: number;
  selectedNumber: number | null;
  onDiceRoll: (number: number) => void;
}

export default function DiceRollSection({
  selectedItems,
  currentItemIndex,
  selectedNumber,
  onDiceRoll
}: DiceRollSectionProps) {
  return (
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
              onClick={() => onDiceRoll(num)}
              className="h-16 text-2xl font-bold"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
