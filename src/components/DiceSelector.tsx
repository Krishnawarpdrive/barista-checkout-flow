
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceSelectorProps {
  onSelect: (number: number) => void;
}

export default function DiceSelector({ onSelect }: DiceSelectorProps) {
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
  
  const diceIcons = [
    <Dice1 key={1} size={32} />,
    <Dice2 key={2} size={32} />,
    <Dice3 key={3} size={32} />,
    <Dice4 key={4} size={32} />,
    <Dice5 key={5} size={32} />,
    <Dice6 key={6} size={32} />
  ];
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((number) => (
        <Button
          key={number}
          variant={hoveredNumber === number ? "gold" : "outline"}
          className="h-24 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105"
          onClick={() => onSelect(number)}
          onMouseEnter={() => setHoveredNumber(number)}
          onMouseLeave={() => setHoveredNumber(null)}
        >
          <div className="mb-1">
            {diceIcons[number - 1]}
          </div>
          <span className="font-bold">{number}</span>
        </Button>
      ))}
    </div>
  );
}
