
import { Button } from '@/components/ui/button';
import { Dices } from 'lucide-react';

interface CartDiceGameCtaProps {
  onPlayDice: () => void;
}

export default function CartDiceGameCta({ onPlayDice }: CartDiceGameCtaProps) {
  return (
    <div className="vintage-card mb-6 relative overflow-hidden">
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <div className="flex items-center bg-coasters-green/10 p-3 rounded-md">
        <div className="mr-4">
          <Dices className="h-12 w-12 text-coasters-orange animate-pulse" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-hackney text-coasters-green">PLAY DICE GAME</h3>
          <p className="text-sm text-gray-600">Roll the dice and win free coffee!</p>
        </div>
        <Button 
          onClick={onPlayDice}
          className="bg-coasters-green hover:bg-coasters-green/90 whitespace-nowrap font-hackney"
        >
          Play Now
        </Button>
      </div>
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
