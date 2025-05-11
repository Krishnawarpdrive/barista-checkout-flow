
import { useState } from 'react';
import { CartItem, useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity } = useCart();
  
  return (
    <div className="bg-white rounded-lg p-4 flex">
      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="ml-3 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{item.name}</h3>
          <span className="text-sm text-gray-600">Edit</span>
        </div>
        
        <p className="font-bold">₹{item.price}</p>
        
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
          -
        </button>
        
        <span className="w-6 text-center">{item.quantity}</span>
        
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-coasters-green text-white flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
