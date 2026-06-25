import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
  unit: string;
}

const SEASONAL_HIGHLIGHTS = [
  {
    id: 'seasonal-1',
    name: 'Mambilla Wild Honey',
    description: '100% pure organic honey harvested from the deep forests of the plateau.',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f1dc251-c63c-4e58-9764-635d156d943a/mambilla-wild-honey-480b11b6-1782351359750.webp',
    category: 'Natural Products',
    unit: 'liter'
  },
  {
    id: 'seasonal-2',
    name: 'Highland Cabbage',
    description: 'Vibrant, crunchy cabbages grown in the cool mists of Maisamari.',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f1dc251-c63c-4e58-9764-635d156d943a/highland-cabbage-00175339-1782351359541.webp',
    category: 'Vegetables',
    unit: 'head'
  }
];

export const SpecialtiesGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'seasonal'>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Loading specialties...
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
        <div>
          <Badge variant="outline" className="mb-2 text-primary border-primary/20 bg-primary/5 uppercase tracking-tighter px-3">
            Local Excellence
          </Badge>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">Mambilla Specialties</h2>
          <p className="text-muted-foreground mt-1">Premium organic produce from the Gembu highlands</p>
        </div>
        
        <div className="flex bg-muted p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'all' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All Produce
          </button>
          <button 
            onClick={() => setActiveTab('seasonal')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${activeTab === 'seasonal' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Sparkles size={14} /> Seasonal
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {(activeTab === 'all' ? products : SEASONAL_HIGHLIGHTS).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-4xl">🌾</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  {activeTab === 'seasonal' && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-white border-none text-[10px] font-bold py-0.5">NEW</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-5 bg-background border-x border-b rounded-b-xl group-hover:border-primary/20 transition-colors">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description || 'Freshly harvested from the rich volcanic soils of the Mambilla Plateau.'}
                  </p>
                  <div className="mt-4 flex items-center text-primary text-xs font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW DETAILS <ArrowRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
