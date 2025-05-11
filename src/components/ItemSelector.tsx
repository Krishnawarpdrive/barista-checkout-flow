
import { useState } from 'react';
import { GameItem } from '@/pages/DiceGame';
import { Card, CardContent } from '@/components/ui/card';

interface ItemSelectorProps {
  items: GameItem[];
  onSelect: (item: GameItem) => void;
}

export default function ItemSelector({ items, onSelect }: ItemSelectorProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  const handleSelect = (item: GameItem) => {
    setSelectedItemId(item.id);
    onSelect(item);
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <Card 
          key={item.id} 
          className={`cursor-pointer border-2 transition-all duration-300 ${
            selectedItemId === item.id 
              ? 'border-coasters-gold ring-2 ring-coasters-gold transform scale-105' 
              : 'border-gray-200 hover:border-coasters-gold/50'
          }`}
          onClick={() => handleSelect(item)}
        >
          <div className="relative pt-[60%] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            {selectedItemId === item.id && (
              <div className="absolute top-2 right-2 bg-coasters-gold text-coasters-green font-bold rounded-full w-6 h-6 flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium">{item.name}</h3>
            <p className="font-bold text-coasters-orange">₹25</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
