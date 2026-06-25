import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Package, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as Sonner from 'sonner';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

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
    } catch (error: any) {
      Sonner.toast.error("Could not load listings. Please check your connection.");
      console.error('Error fetching listings:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Beverages', 'Spices', 'Meat', 'Natural Products'];

  const filteredListings = listings
    .filter(l => {
      const matchesCategory = selectedCategory === 'all' || l.products?.category === selectedCategory;
      const matchesSearch = l.products?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (l.profiles?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price_per_unit - b.price_per_unit;
      if (sortBy === 'price-high') return b.price_per_unit - a.price_per_unit;
      return 0;
    });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-muted-foreground">Loading marketplace...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative rounded-3xl overflow-hidden h-[300px] mb-12 flex items-center p-8 md:p-12">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f1dc251-c63c-4e58-9764-635d156d943a/mambilla-hero-036167a7-1782246912448.webp" 
          alt="Mambilla Marketplace" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
        />
        <div className="relative z-10 max-w-2xl text-white">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Mambilla Marketplace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90"
          >
            Direct from the highlands of Gembu. Support local farmers and get the freshest produce at mountain-fair prices.
          </motion.p>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products or farmers..." 
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full px-6 transition-all"
          >
            {category === 'all' ? 'All Products' : category}
          </Button>
        ))}
      </div>

      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-medium">
            Results for <span className="font-bold">"{searchQuery}"</span>
            <span className="text-muted-foreground ml-2">({filteredListings.length} items)</span>
          </h2>
        </div>
      )}

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
