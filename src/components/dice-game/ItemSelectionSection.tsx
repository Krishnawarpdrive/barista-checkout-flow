
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { GameItem } from '@/pages/DiceGame';

interface ItemSelectionSectionProps {
  gameItems: GameItem[];
  selectedItems: GameItem[];
  onItemSelect: (item: GameItem) => void;
  onComplete: () => void;
  onBack: () => void;
}

export default function ItemSelectionSection({
  gameItems,
  selectedItems,
  onItemSelect,
  onComplete,
  onBack
}: ItemSelectionSectionProps) {
  return (
    <div className="vintage-card">
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <h2 className="font-hackney text-xl text-coasters-green mb-4">SELECT YOUR ITEMS</h2>
      <p className="mb-4 text-sm text-gray-600">
        Select items (₹25 each) to play the Dice Game. Each item gives you one chance to roll the dice!
      </p>
      
      <div className="mb-4 bg-coasters-gold/10 p-3 rounded-md border border-coasters-gold/20">
        <p className="text-center font-medium">
          <span className="text-lg font-hackney text-coasters-green">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </span>
          <br />
          <span className="text-sm text-gray-600">
            {selectedItems.length} {selectedItems.length === 1 ? 'dice roll' : 'dice rolls'} available
          </span>
        </p>
      </div>
      
      <div className="mb-6 grid grid-cols-2 gap-3">
        {gameItems.map(item => (
          <div 
            key={item.id}
            onClick={() => onItemSelect(item)}
            className={`relative p-3 border-2 rounded-md cursor-pointer transition-all ${
              selectedItems.some(i => i.id === item.id) 
                ? 'border-coasters-green bg-coasters-green/10' 
                : 'border-coasters-gold/30 hover:border-coasters-gold'
            }`}
          >
            <div className="flex items-center">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md mr-3"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">₹25</p>
              </div>
            </div>
            {selectedItems.some(i => i.id === item.id) && (
              <div className="absolute top-1 right-1 bg-coasters-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button 
        onClick={onComplete}
        variant="gold"
        className="w-full"
        disabled={selectedItems.length === 0}
      >
        <ShoppingBag className="mr-1" />
        Proceed with {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}
      </Button>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="w-full"
        >
          Back to Menu
        </Button>
      </div>
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
