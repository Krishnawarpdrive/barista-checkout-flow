
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface CartCouponSectionProps {
  onOpenCouponDrawer: () => void;
}

export default function CartCouponSection({ onOpenCouponDrawer }: CartCouponSectionProps) {
  const { couponCode, removeCoupon } = useCart();

  return (
    <div className="vintage-card mb-6 relative overflow-hidden">
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      {couponCode ? (
        <Alert className="bg-green-50 border-green-200 text-green-800 mt-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <AlertDescription>
                <strong>Offer applied successfully!</strong>
              </AlertDescription>
            </div>
            <button onClick={removeCoupon} className="text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
        </Alert>
      ) : (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={onOpenCouponDrawer}
            className="bg-coasters-orange hover:bg-coasters-orange/90 whitespace-nowrap font-hackney flex-grow"
          >
            Browse Available Coupons
          </Button>
        </div>
      )}
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}
