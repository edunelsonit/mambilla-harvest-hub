import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Calendar, Package } from 'lucide-react';
import { motion } from 'framer-motion';

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
  profiles: {
    full_name: string;
    phone: string | null;
  } | null;
}

export const TransportPage = () => {
  const [payloads, setPayloads] = useState<Payload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayloads();
  }, []);

  const fetchPayloads = async () => {
    try {
      const { data, error } = await supabase
        .from('payloads')
        .select(`
          *,
          profiles:driver_id (full_name, phone)
        `)
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

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'available': return 'default';
      case 'full': return 'secondary';
      case 'in_transit': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-muted-foreground">Loading transport options...</div>
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
        <h1 className="text-4xl font-bold mb-4">Transport & Logistics</h1>
        <p className="text-lg text-muted-foreground">
          Group shipping from Gembu Motor Park. Share truck payloads and save on transport costs.
        </p>
      </motion.div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">💡 Group Shipping Benefits</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Share transport costs with other farmers</li>
          <li>• Coordinated departures from Gembu to major cities</li>
          <li>• Real-time tracking and verification agents</li>
          <li>• Lower per-kg pricing for pooled shipments</li>
        </ul>
      </div>

      {payloads.length === 0 ? (
        <div className="text-center py-16">
          <Truck className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No transport available</h3>
          <p className="text-muted-foreground">
            Check back soon for available transport options from Gembu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payloads.map((payload, index) => (
            <motion.div
              key={payload.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{payload.vehicle_type || 'Truck'}</span>
                      </div>
                      <Badge variant={getStatusColor(payload.status) as any}>
                        {payload.status?.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ₦{payload.price_per_kg.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">per kg</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{payload.route_from}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">{payload.route_to}</span>
                    </div>
                    {payload.destination && (
                      <div className="text-xs text-muted-foreground ml-6">
                        Final destination: {payload.destination}
                      </div>
                    )}
                  </div>

                  {payload.departure_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Departure: {new Date(payload.departure_date).toLocaleDateString()}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground">Total Capacity</div>
                      <div className="font-semibold">{payload.capacity_kg} kg</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Available Space</div>
                      <div className="font-semibold text-primary">{payload.available_space_kg} kg</div>
                    </div>
                  </div>

                  {payload.profiles && (
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground">Driver</div>
                      <div className="font-medium">{payload.profiles.full_name}</div>
                      {payload.profiles.phone && (
                        <div className="text-xs text-muted-foreground">{payload.profiles.phone}</div>
                      )}
                    </div>
                  )}

                  {payload.notes && (
                    <div className="text-sm text-muted-foreground italic">
                      {payload.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
