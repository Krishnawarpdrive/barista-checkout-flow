
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <header className="bg-coasters-green py-4 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white p-1"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="text-center flex-1">
        <h1 className="font-hackney text-white text-2xl tracking-wider">COASTERS</h1>
      </div>
      
      <button className="text-white p-1 relative">
        <Bell size={24} />
        <span className="absolute top-0 right-0 bg-coasters-orange rounded-full w-3 h-3"></span>
      </button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 bg-coasters-green shadow-lg rounded-r-lg w-64 z-50 animate-fade-in">
          <div className="p-4 border-b border-white/10">
            <p className="text-white font-hackney text-lg">Menu</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-coasters-gold w-full text-left py-2"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigate('/cart');
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-coasters-gold w-full text-left py-2"
                >
                  My Cart
                </button>
              </li>
              {isAuthenticated ? (
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="text-white hover:text-coasters-gold w-full text-left py-2"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button 
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    className="text-white hover:text-coasters-gold w-full text-left py-2"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
