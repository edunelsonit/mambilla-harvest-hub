import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, CloudOff, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
  role: string;
  onHome: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Layout = ({ children, role, onHome, currentPage = 'home', onNavigate }: LayoutProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl italic">
              G
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground hidden sm:inline-block">GEFOUN</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => handleNavigate('home')} className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-primary' : 'hover:text-primary'}`}>Home</button>
            <button onClick={() => handleNavigate('marketplace')} className={`text-sm font-medium transition-colors ${currentPage === 'marketplace' ? 'text-primary' : 'hover:text-primary'}`}>Marketplace</button>
            <button onClick={() => handleNavigate('transport')} className={`text-sm font-medium transition-colors ${currentPage === 'transport' ? 'text-primary' : 'hover:text-primary'}`}>Transport</button>
            <button onClick={() => handleNavigate('about')} className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-primary' : 'hover:text-primary'}`}>About</button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold bg-muted px-2 py-1 rounded-full text-muted-foreground mr-2">
              <CloudOff size={12} /> OFFLINE READY
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-background" />
            </Button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium">{profile?.full_name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{profile?.role}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={() => setAuthModalOpen(true)}>
                Sign In
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button onClick={() => handleNavigate('home')} className="text-left text-sm font-medium py-2 hover:text-primary">Home</button>
              <button onClick={() => handleNavigate('marketplace')} className="text-left text-sm font-medium py-2 hover:text-primary">Marketplace</button>
              <button onClick={() => handleNavigate('transport')} className="text-left text-sm font-medium py-2 hover:text-primary">Transport</button>
              <button onClick={() => handleNavigate('about')} className="text-left text-sm font-medium py-2 hover:text-primary">About</button>
            </nav>
          </div>
        )}
      </header>
      
      <div className="flex-1">
        {children}
      </div>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm italic">
                G
              </div>
              <span className="text-xl font-black tracking-tight">GEFOUN</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering Mambilla Plateau farmers through smart digital trade.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Gembu Market Prices</li>
              <li>Escrow Protection</li>
              <li>SMS Code Guide</li>
              <li>Transport Board</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Success Stories</li>
              <li>Verification Agents</li>
              <li>Driver Registration</li>
              <li>Farmer Groups</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Gembu Office</li>
              <li>Safety Rules</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Gefoun Marketplace. Built for the Mambilla Plateau.
        </div>
      </footer>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};
