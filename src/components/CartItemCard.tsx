
import { useState } from 'react';
import { CartItem, useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity } = useCart();
  
  return (
    <div className="bg-white rounded-lg p-4 flex border-2 border-coasters-gold relative overflow-hidden">
      {/* Zigzag top edge */}
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 border-coasters-gold">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="ml-3 flex-grow">
        <h3 className="font-hackney text-coasters-green">{item.name}</h3>
        <p className="font-bold text-coasters-orange">₹{item.price}</p>
        
        {item.customization && (
          <div className="text-xs text-gray-500 mt-1">
            <p>{item.customization.preparation}, {item.customization.sweetness}</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2 ml-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-coasters-green text-white flex items-center justify-center"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-6 text-center font-bold">{item.quantity}</span>
        
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-coasters-green text-white flex items-center justify-center"
        >
          <Plus size={16} />
        </button>
      </div>
      
      {/* Zigzag bottom edge */}
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
