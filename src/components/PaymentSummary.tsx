
import { useCart } from '@/context/CartContext';

export default function PaymentSummary() {
  const { getSubtotal, getTax, getTotal, discount } = useCart();
  
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Order Total</span>
          <span>₹{getSubtotal()}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>GST</span>
          <span>₹{getTax()}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total Payment</span>
            <span>₹{getTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
