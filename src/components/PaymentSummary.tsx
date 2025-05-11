
import { useCart } from '@/context/CartContext';

export default function PaymentSummary() {
  const { getSubtotal, getTax, getTotal, discount } = useCart();
  
  return (
    <div className="bg-white rounded-lg border-2 border-coasters-gold/50 shadow-md relative overflow-hidden">
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <div className="p-4 pt-6">
        <h2 className="text-xl font-hackney text-coasters-green mb-4 tracking-wide">PAYMENT SUMMARY</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Order Total</span>
            <div className="flex items-center">
              {discount > 0 && (
                <span className="line-through text-gray-400 mr-2">₹{getSubtotal()}</span>
              )}
              <span className="font-bold">₹{getSubtotal() - discount}</span>
            </div>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between rounded-md bg-green-50 p-2">
              <div className="flex items-center">
                <span className="text-sm text-green-800 font-medium">You Save</span>
              </div>
              <span className="text-green-800 font-bold">₹{discount}</span>
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
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
