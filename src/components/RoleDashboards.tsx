import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS, MOTOR_PARK_LOADS } from '@/lib/mockData';
import { PlusCircle, ShoppingCart, Truck, ShieldCheck, Info, MapPin, Search } from 'lucide-react';

export const FarmerDashboard = () => (
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
              <Input id="crop" placeholder="e.g. Highland Avocado" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (Bags/Crates)</Label>
              <Input id="quantity" type="number" placeholder="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Expected Price (Optional)</Label>
            <Input id="price" placeholder="₦ per unit" />
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
          <Button className="w-full gap-2">
            <PlusCircle size={18} /> List Produce
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

export const BuyerDashboard = () => (
  <div className="space-y-8 py-6">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input className="pl-10" placeholder="Search Tea, Potatoes, Cattle..." />
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary" className="px-4 py-2">Location: Jalingo</Badge>
        <Badge variant="outline" className="px-4 py-2">Role: Bulk Buyer</Badge>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS.map(p => (
        <Card key={p.id} className="overflow-hidden flex flex-col">
          <div className="aspect-video relative overflow-hidden">
            <img src={p.image} alt={p.name} className="object-cover w-full h-full" />
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-green-600 hover:bg-green-600 flex gap-1 items-center">
                <ShieldCheck size={12} /> Verified
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {p.location}
                </CardDescription>
              </div>
              <span className="font-bold text-primary">{p.price}</span>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-0 flex-1">
            <p className="text-xs text-muted-foreground">{p.description}</p>
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

export const LogisticsDashboard = () => (
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
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Produce Type</th>
                  <th className="px-4 py-3 text-left">Destination</th>
                  <th className="px-4 py-3 text-left">Reward</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOTOR_PARK_LOADS.map(load => (
                  <tr key={load.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{load.type}</td>
                    <td className="px-4 py-3">{load.destination}</td>
                    <td className="px-4 py-3 text-primary font-bold">{load.reward}</td>
                    <td className="px-4 py-3 text-center">
                      <Button size="sm" variant={load.status === 'Pooling' ? 'outline' : 'default'} className="h-8 text-xs">
                        {load.status === 'Pooling' ? 'Join Pool' : 'Accept Load'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
