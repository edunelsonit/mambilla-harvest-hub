import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
  unit: string;
}

export const SpecialtiesGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Mambilla Specialties</h2>
          <p className="text-muted-foreground">Premium produce from the Gembu highlands</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-4xl">🌾</span>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4 bg-background">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description || 'Fresh from Mambilla Plateau'}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
