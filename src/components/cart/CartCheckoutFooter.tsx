
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartCheckoutFooterProps {
  onProceed: () => void;
}

export default function CartCheckoutFooter({ onProceed }: CartCheckoutFooterProps) {
  const { getTotal } = useCart();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-4 flex items-center justify-between">
      <div className="text-white">
        <p className="text-sm">Total Price</p>
        <p className="text-xl font-bold">₹{getTotal()}</p>
      </div>
      
      <Button 
        onClick={onProceed}
        className="bg-coasters-gold hover:bg-coasters-gold/90 text-black font-hackney px-6 py-5"
      >
        Proceed to Payment
      </Button>
    </div>
  );
}
