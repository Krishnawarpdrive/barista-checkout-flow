
import { useCart } from '@/context/CartContext';
import CartItemCard from '@/components/CartItemCard';

export default function CartItemsSection() {
  const { items } = useCart();
  
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-2xl font-hackney text-coasters-green mb-6">YOUR CART</h2>
      
      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
