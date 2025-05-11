
import { Dices } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CartDiceGameCta() {
  const navigate = useNavigate();
  
  const handlePlayDice = () => {
    navigate('/play-dice');
  };
  
  return (
    <div className="fixed bottom-24 right-4 z-10 animate-bounce-subtle">
      <Button 
        onClick={handlePlayDice}
        className="bg-coasters-green text-coasters-gold hover:bg-coasters-green/90 shadow-lg flex items-center px-4 py-6 rounded-full"
      >
        <Dices className="mr-2 h-5 w-5" />
        <div className="flex flex-col items-start">
          <span className="font-hackney text-base leading-tight">PLAY DICE</span>
          <span className="text-xs leading-tight">Win free coffee!</span>
        </div>
      </Button>
    </div>
  );
}
