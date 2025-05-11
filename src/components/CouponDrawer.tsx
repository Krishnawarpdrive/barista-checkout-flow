
import { useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Ticket, Gift, Users, Dices, Check } from 'lucide-react';

interface CouponDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface CouponType {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
}

export default function CouponDrawer({ open, onClose }: CouponDrawerProps) {
  const { applyCoupon, couponCode } = useCart();
  
  // Mock coupons
  const availableCoupons: CouponType[] = [
    {
      id: '1',
      code: 'COASTERS50',
      title: 'FIRST ORDER',
      description: 'Get 25% off on your first order (up to ₹50)',
      icon: <Ticket />,
      type: 'first-order'
    },
    {
      id: '2',
      code: 'FIRST100',
      title: 'REFER A FRIEND',
      description: 'Get 30% off when you refer a friend (up to ₹100)',
      icon: <Users />,
      type: 'referral'
    },
    {
      id: '3',
      code: 'WINNERSDICE',
      title: 'DICE GAME REWARD',
      description: 'You won this coupon by playing the dice game!',
      icon: <Dices />,
      type: 'game'
    },
    {
      id: '4',
      code: 'EMPLOYEE25',
      title: 'EMPLOYEE DISCOUNT',
      description: 'Special discount for our team members',
      icon: <Gift />,
      type: 'employee'
    },
  ];
  
  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
    onClose();
  };
  
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-h-[85vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="font-hackney text-coasters-green text-2xl">CHOOSE A COUPON</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-2">
          <p className="text-sm text-gray-500 mb-4">Select one of these vintage coupons to get a discount on your order</p>
          
          <div className="space-y-4">
            {availableCoupons.map((coupon) => (
              <div 
                key={coupon.id}
                className="relative vintage-ticket bg-white border-2 border-coasters-gold/70 rounded-lg overflow-hidden"
              >
                {/* Zigzag edges */}
                <div className="absolute top-0 left-0 right-0 h-3 zigzag-divider"></div>
                <div className="absolute bottom-0 left-0 right-0 h-3 zigzag-divider-reverse"></div>
                
                {/* Left circle cutout */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-coasters-cream rounded-full border-2 border-coasters-gold/70"></div>
                
                {/* Right circle cutout */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-coasters-cream rounded-full border-2 border-coasters-gold/70"></div>
                
                <div className="flex py-6 px-8">
                  <div className="flex-shrink-0 bg-coasters-gold/20 w-12 h-12 rounded-full flex items-center justify-center text-coasters-green">
                    {coupon.icon}
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <h3 className="font-hackney text-coasters-green">{coupon.title}</h3>
                    <p className="text-sm text-gray-500">{coupon.description}</p>
                    <div className="mt-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{coupon.code}</code>
                    </div>
                  </div>
                  
                  <div className="flex items-center pl-4">
                    <Button 
                      onClick={() => handleApplyCoupon(coupon.code)}
                      className={`${couponCode === coupon.code ? 'bg-green-500 hover:bg-green-600' : 'bg-coasters-orange hover:bg-coasters-orange/90'}`}
                      size="sm"
                    >
                      {couponCode === coupon.code ? (
                        <><Check className="mr-1" size={16} /> Applied</>
                      ) : (
                        'Use'
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Dotted divider in middle */}
                <div className="absolute left-16 top-0 bottom-0 border-l-2 border-dashed border-coasters-gold/30"></div>
              </div>
            ))}
          </div>
        </div>
        
        <DrawerFooter>
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
