
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface CartLoginDrawerProps {
  open: boolean;
  onClose: () => void;
  onGuestCheckout: () => void;
}

export default function CartLoginDrawer({ open, onClose, onGuestCheckout }: CartLoginDrawerProps) {
  const navigate = useNavigate();
  
  const handleLoginWithWhatsApp = () => {
    // Navigate to login page
    navigate('/login');
  };
  
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-hackney text-coasters-green text-2xl">LOGIN OPTIONS</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-2">
          <p className="text-gray-500 mb-6">Choose how you'd like to continue with your order</p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleLoginWithWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 h-14 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                <path d="M9 14a.5.5 0 0 0 .5.5c.667 0 1.333-.083 2-.25.667-.167 1.333-.417 2-.75a.5.5 0 0 0-.5-.866 9.11 9.11 0 0 1-1.75.666c-.583.15-1.167.217-1.75.2a.5.5 0 0 0-.5.5Z"/>
              </svg>
              Login with WhatsApp
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-400">
                  OR
                </span>
              </div>
            </div>
            
            <Button 
              onClick={onGuestCheckout}
              variant="outline" 
              className="w-full border-2 h-14 text-lg"
            >
              Continue as Guest
            </Button>
          </div>
        </div>
        
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
