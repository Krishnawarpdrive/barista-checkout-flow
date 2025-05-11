import { useCart } from '@/context/CartContext';
import CartItemCard from '@/components/CartItemCard';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

interface CartItemsSectionProps {
  products: Product[];
}

export default function CartItemsSection({ products }: CartItemsSectionProps) {
  const { items } = useCart();
  
  // Map cart items to their full product details
  const cartItemsWithDetails = items.map(item => {
    const productDetails = products.find(p => p.id === item.id);
    return {
      ...item,
      description: productDetails?.description || '',
      image: productDetails?.image || item.image
    };
  });
  
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-2xl font-hackney text-coasters-green mb-6">YOUR CART</h2>
      
      {cartItemsWithDetails.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
