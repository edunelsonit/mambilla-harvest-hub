import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpecialtiesGallery } from './components/SpecialtiesGallery';
import { FarmerDashboard, BuyerDashboard, LogisticsDashboard } from './components/RoleDashboards';
import { GefounAI } from './components/GefounAI';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MarketplacePage } from './pages/MarketplacePage';
import { TransportPage } from './pages/TransportPage';
import { AboutPage } from './pages/AboutPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Tractor, ShoppingBag, Truck } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'marketplace' | 'transport' | 'about' | 'farmer' | 'buyer' | 'logistics'>('home');
  const { user, profile } = useAuth();

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'marketplace':
        return <MarketplacePage />;
      case 'transport':
        return <TransportPage />;
      case 'about':
        return <AboutPage />;
      case 'farmer':
        return (
          <motion.div
            key="farmer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="py-6 border-b mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
              <Badge variant="outline" className="text-primary border-primary px-3 py-1 uppercase tracking-tighter">Gembu Hub</Badge>
            </div>
            <FarmerDashboard />
          </motion.div>
        );
      case 'buyer':
        return (
          <motion.div
            key="buyer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="py-6 border-b mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Buyer Marketplace</h1>
              <Badge variant="outline" className="text-primary border-primary px-3 py-1 uppercase tracking-tighter">Jalingo Portal</Badge>
            </div>
            <BuyerDashboard />
          </motion.div>
        );
      case 'logistics':
        return (
          <motion.div
            key="logistics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="py-6 border-b mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Logistics & Transport</h1>
              <Badge variant="outline" className="text-primary border-primary px-3 py-1 uppercase tracking-tighter">Gembu Motor Park</Badge>
            </div>
            <LogisticsDashboard />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12"
          >
            <div className="relative rounded-3xl overflow-hidden h-[500px] mb-16 flex items-center justify-center text-center p-8">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f1dc251-c63c-4e58-9764-635d156d943a/mambilla-hero-036167a7-1782246912448.webp" 
                alt="Mambilla Plateau" 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
              />
              <div className="relative z-10 max-w-3xl">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-6xl font-extrabold text-white mb-6"
                >
                  Connecting Mambilla Farmers to the World
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-white/90 mb-10"
                >
                  From the hills of Gembu to Jalingo and beyond. Buy, sell, and ship agricultural excellence.
                </motion.p>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Button size="lg" onClick={() => setCurrentPage('farmer')} className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-8 text-lg gap-2">
                    <Tractor /> I'm a Farmer
                  </Button>
                  <Button size="lg" onClick={() => setCurrentPage('buyer')} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 px-8 text-lg gap-2">
                    <ShoppingBag /> I'm a Buyer
                  </Button>
                  <Button size="lg" variant="secondary" onClick={() => setCurrentPage('logistics')} className="font-bold h-14 px-8 text-lg gap-2">
                    <Truck /> Logistics
                  </Button>
                </motion.div>
              </div>
            </div>
            
            <SpecialtiesGallery />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
              <div className="bg-primary/5 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4">Gefoun Escrow Wallet</h3>
                <p className="text-muted-foreground mb-6">
                  Buy with confidence. We hold payments until the produce is confirmed at the Gembu motor park. No more risks, just trade.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-secondary/5 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4">Group Shipping</h3>
                <p className="text-muted-foreground mb-6">
                  High transport costs? Our pooling system connects you with other farmers to share truck payloads and save money.
                </p>
                <Button variant="outline">Check Availability</Button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <Layout 
        role={profile?.role || 'guest'} 
        onHome={() => setCurrentPage('home')}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      >
        <main className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>
      </Layout>
      <GefounAI />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
};

export default App;
