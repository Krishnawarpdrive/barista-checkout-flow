
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import ReferCard from '@/components/ReferCard';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Refer() {
  const { isAuthenticated } = useAuth();
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
          <h2 className="text-2xl font-hackney text-coasters-green mb-6">REFER & EARN</h2>
          
          <ReferCard />
        </div>
      </main>
    </div>
  );
}
