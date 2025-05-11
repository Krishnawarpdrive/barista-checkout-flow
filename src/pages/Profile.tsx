
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { User, Edit } from 'lucide-react';

export default function Profile() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow pb-20">
        <div className="p-4">
          <h2 className="text-2xl font-hackney text-coasters-green mb-6">YOUR PROFILE</h2>
          
          <div className="vintage-card relative overflow-hidden mb-6">
            <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
            
            <div className="pt-4 pb-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-coasters-green/10 rounded-full flex items-center justify-center mb-4">
                <User size={36} className="text-coasters-green" />
              </div>
              
              <h3 className="text-xl font-medium">{user?.name || 'User Name'}</h3>
              <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
              
              <div className="w-full mt-6">
                <div className="flex justify-between border-b border-gray-200 py-3">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">+91 9876543210</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-200 py-3">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{user?.email || 'user@example.com'}</span>
                </div>
                
                <div className="flex justify-between py-3">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium">June 2023</span>
                </div>
              </div>
            </div>
            
            <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
          </div>
          
          <Button 
            variant="outline" 
            className="mb-4 w-full"
          >
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
          
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
}
