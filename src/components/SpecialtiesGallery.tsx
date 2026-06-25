import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PRODUCTS } from '@/lib/mockData';
import { motion } from 'framer-motion';

export const SpecialtiesGallery = () => {
  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Mambilla Specialties</h2>
          <p className="text-muted-foreground">Premium produce from the Gembu highlands</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4 bg-background">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-primary font-semibold text-sm">{product.price}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.location}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
