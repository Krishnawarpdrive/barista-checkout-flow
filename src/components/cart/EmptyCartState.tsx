
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmptyCartState() {
  const navigate = useNavigate();
  
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-coasters-cream">
      <div className="vintage-card p-8 text-center">
        <h2 className="text-2xl font-hackney text-coasters-green mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some coffee to get started!</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-coasters-orange hover:bg-coasters-orange/90 font-hackney"
        >
          Go to Menu
        </Button>
      </div>
    </div>
  );
}
