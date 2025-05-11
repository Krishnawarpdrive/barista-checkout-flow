
import { GameItem } from '@/pages/DiceGame';
import DiceSelector from '@/components/DiceSelector';

interface NumberSelectionSectionProps {
  selectedItems: GameItem[];
  currentItemIndex: number;
  onNumberSelect: (number: number) => void;
}

export default function NumberSelectionSection({
  selectedItems,
  currentItemIndex,
  onNumberSelect
}: NumberSelectionSectionProps) {
  return (
    <div className="vintage-card">
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <h2 className="font-hackney text-xl text-coasters-green mb-4">
        SELECT YOUR LUCKY NUMBER
        {selectedItems.length > 1 && ` (Roll ${currentItemIndex + 1} of ${selectedItems.length})`}
      </h2>
      
      {selectedItems.length > 1 && (
        <div className="mb-4 bg-white p-3 rounded-md border-2 border-coasters-gold/30">
          <div className="flex items-center">
            <img 
              src={selectedItems[currentItemIndex].image} 
              alt={selectedItems[currentItemIndex].name} 
              className="w-12 h-12 rounded-md object-cover mr-3" 
            />
            <div>
              <p className="font-medium">{selectedItems[currentItemIndex].name}</p>
              <p className="text-sm text-gray-600">Choose a number for this item</p>
            </div>
          </div>
        </div>
      )}
      
      <p className="mb-6 text-sm text-gray-600">
        Select one number from 1 to 6. If the dice roll matches your number, you win a free coffee!
      </p>
      
      <DiceSelector onSelect={onNumberSelect} />
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
