
import { useCart } from '@/context/CartContext';

export default function PaymentSummary() {
  const { getSubtotal, getTax, getTotal, discount } = useCart();
  
  return (
    <div className="bg-white rounded-lg p-4 border-2 border-coasters-gold shadow-md">
      <h2 className="text-xl font-hackney text-coasters-green mb-4 tracking-wide">PAYMENT SUMMARY</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Order Total</span>
          <span className="font-bold">₹{getSubtotal()}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-coasters-orange font-medium">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="font-medium">GST</span>
          <span>₹{getTax()}</span>
        </div>
        
        <div className="border-t-2 border-dashed border-coasters-green/30 pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span className="text-coasters-green">Total Payment</span>
            <span className="text-coasters-green text-lg">₹{getTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
