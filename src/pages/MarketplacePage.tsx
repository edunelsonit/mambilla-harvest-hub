import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
  unit: string;
}

interface Listing {
  id: string;
  quantity: number;
  price_per_unit: number;
  condition: string | null;
  status: string | null;
  notes: string | null;
  products: Product;
  profiles: {
    full_name: string;
    location: string | null;
  } | null;
}

export const MarketplacePage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          products:product_id (*),
          profiles:farmer_id (full_name, location)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Beverages', 'Spices', 'Meat', 'Natural Products'];

  const filteredListings = selectedCategory === 'all' 
    ? listings 
    : listings.filter(l => l.products?.category === selectedCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-muted-foreground">Loading marketplace...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
        <p className="text-lg text-muted-foreground">
          Fresh produce from Mambilla Plateau farmers, delivered with trust.
        </p>
      </motion.div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category === 'all' ? 'All Products' : category}
          </Button>
        ))}
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No listings available</h3>
          <p className="text-muted-foreground">
            Check back soon for fresh produce from our farmers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                {listing.products?.image_url && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={listing.products.image_url} 
                      alt={listing.products.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{listing.products?.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {listing.products?.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ₦{listing.price_per_unit.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">per {listing.products?.unit}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  {listing.products?.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {listing.products.description}
                    </p>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity Available:</span>
                      <span className="font-semibold">{listing.quantity} {listing.products?.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="font-semibold capitalize">{listing.condition}</span>
                    </div>
                    {listing.profiles && (
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin size={14} />
                          <span className="text-xs">{listing.profiles.location || 'Gembu'}</span>
                        </div>
                        <span className="text-xs font-medium">{listing.profiles.full_name}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
