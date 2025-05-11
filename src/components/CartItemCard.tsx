
import { useState } from 'react';
import { CartItem, useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity } = useCart();
  
  return (
    <div className="bg-white rounded-lg p-4 flex border-2 border-coasters-gold relative overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-lg">
      {/* Zigzag top edge */}
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 border-coasters-gold shadow-sm">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110" 
        />
      </div>
      
      <div className="ml-3 flex-grow">
        <h3 className="font-hackney text-coasters-green text-lg">{item.name}</h3>
        <p className="font-bold text-coasters-orange">₹{item.price}</p>
      </div>
      
      <div className="flex items-center space-x-2 ml-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-coasters-orange text-white flex items-center justify-center shadow-sm hover:bg-coasters-orange/90 transition-colors"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center font-bold">{item.quantity}</span>
        
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-coasters-orange text-white flex items-center justify-center shadow-sm hover:bg-coasters-orange/90 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      
      {/* Zigzag bottom edge */}
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
