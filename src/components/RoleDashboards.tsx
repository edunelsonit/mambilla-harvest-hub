import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PRODUCTS, MOTOR_PARK_LOADS } from '@/lib/mockData';
import { PlusCircle, ShoppingCart, Truck, ShieldCheck, Info, MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';

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

interface Payload {
  id: string;
  route_from: string;
  route_to: string;
  destination: string | null;
  capacity_kg: number;
  available_space_kg: number;
  price_per_kg: number;
  status: string | null;
  departure_date: string | null;
  vehicle_type: string | null;
  notes: string | null;
}

export const FarmerDashboard = () => {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('fresh');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

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
    }
  };

  const handleListProduce = async () => {
    if (!selectedProduct || !quantity || !price) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!profile) {
      toast.error('Please sign in to list produce');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('listings')
        .insert({
          farmer_id: profile.id,
          product_id: selectedProduct,
          quantity: parseFloat(quantity),
          price_per_unit: parseFloat(price),
          condition: condition,
          notes: notes,
          status: 'active'
        });

      if (error) throw error;
      toast.success('Produce listed successfully!');
      setSelectedProduct('');
      setQuantity('');
      setPrice('');
      setCondition('fresh');
      setNotes('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to list produce');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>List Your Crop</CardTitle>
            <CardDescription>Add your harvest to the Gefoun marketplace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Name</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  placeholder="0" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price per Unit (₦)</Label>
                <Input 
                  id="price" 
                  type="number"
                  placeholder="₦ per unit" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh</SelectItem>
                    <SelectItem value="dried">Dried</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input 
                id="notes" 
                placeholder="Any additional information..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="p-4 bg-muted rounded-lg flex items-start gap-3">
              <Info className="text-primary shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">Low Network?</p>
                Listing will be saved offline and synced when you reach signal. You can also dial *555*GEFOUN# to list via SMS.
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2" onClick={handleListProduce} disabled={loading}>
              <PlusCircle size={18} /> {loading ? 'Listing...' : 'List Produce'}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gembu Market Prices</CardTitle>
            <CardDescription>Today's local rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {PRODUCTS.slice(0, 4).map(p => (
                <div key={p.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-sm font-bold text-primary">{p.price.split(' / ')[0]}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-xs">View Full Price Index</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export const BuyerDashboard = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredListings = listings.filter(l => 
    l.products?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.products?.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Search Tea, Potatoes, Cattle..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-4 py-2">Location: Jalingo</Badge>
          <Badge variant="outline" className="px-4 py-2">Role: Bulk Buyer</Badge>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading listings...</div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No listings available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(p => (
            <Card key={p.id} className="overflow-hidden flex flex-col">
              {p.products?.image_url && (
                <div className="aspect-video relative overflow-hidden">
                  <img src={p.products.image_url} alt={p.products.name} className="object-cover w-full h-full" />
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-green-600 hover:bg-green-600 flex gap-1 items-center">
                      <ShieldCheck size={12} /> Verified
                    </Badge>
                  </div>
                </div>
              )}
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{p.products?.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {p.profiles?.location || 'Gembu'}
                    </CardDescription>
                  </div>
                  <span className="font-bold text-primary">₦{p.price_per_unit.toLocaleString()} / {p.products?.unit}</span>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-0 flex-1">
                <p className="text-xs text-muted-foreground">{p.products?.description}</p>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Quantity: </span>
                  <span>{p.quantity} {p.products?.unit}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 gap-2">
                <Button variant="outline" className="flex-1 text-xs">View Details</Button>
                <Button className="flex-1 text-xs gap-1">
                  <ShoppingCart size={14} /> Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Secure Escrow Protection</h3>
            <p className="text-sm text-muted-foreground">
              Payments are held safely. Funds are only released to the Mambilla farmer once our agents confirm your produce is loaded on transit.
            </p>
          </div>
          <Button className="shrink-0">How Escrow Works</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export const LogisticsDashboard = () => {
  const [payloads, setPayloads] = useState<Payload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayloads();
  }, []);

  const fetchPayloads = async () => {
    try {
      const { data, error } = await supabase
        .from('payloads')
        .select('*')
        .in('status', ['available', 'full'])
        .order('departure_date', { ascending: true });

      if (error) throw error;
      setPayloads(data || []);
    } catch (error) {
      console.error('Error fetching payloads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gembu Motor Park Board</CardTitle>
                <CardDescription>Available payloads awaiting transit off-plateau</CardDescription>
              </div>
              <Badge variant="outline" className="flex gap-1 animate-pulse border-orange-500 text-orange-600">
                <div className="h-2 w-2 bg-orange-500 rounded-full" /> Live Updates
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading payloads...</div>
            ) : payloads.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No payloads available at the moment.</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left">Route</th>
                      <th className="px-4 py-3 text-left">Destination</th>
                      <th className="px-4 py-3 text-left">Capacity</th>
                      <th className="px-4 py-3 text-left">Price/kg</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {payloads.map(payload => (
                      <tr key={payload.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{payload.route_from} → {payload.route_to}</td>
                        <td className="px-4 py-3">{payload.destination || '-'}</td>
                        <td className="px-4 py-3">{payload.available_space_kg} / {payload.capacity_kg} kg</td>
                        <td className="px-4 py-3 text-primary font-bold">₦{payload.price_per_kg.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <Button size="sm" variant={payload.status === 'available' ? 'outline' : 'default'} className="h-8 text-xs">
                            {payload.status === 'available' ? 'Join Pool' : 'Accept Load'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-secondary text-secondary-foreground border-none">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Truck />
              <CardTitle>Group Shipping</CardTitle>
            </div>
            <CardDescription className="text-secondary-foreground/80">Cut costs by pooling produce into a single vehicle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 p-3 rounded-md text-xs">
              "Transport off Mambilla is unpredictable. Co-loading helps everyone save."
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-bold">1.</span> Register your vehicle capacity
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span> Find small-lot farmers
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span> Coordinate at Gembu Motor Park
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full bg-white text-secondary hover:bg-white/90">Find Group Transit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
