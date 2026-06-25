import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Truck, Smartphone, CloudOff, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Escrow Protection',
      description: 'Payments are held securely until produce is verified at Gembu motor park. No more risks, just safe trade.'
    },
    {
      icon: Users,
      title: 'Verification Agents',
      description: 'Local agents confirm produce quality and loading, ensuring trust between farmers and buyers.'
    },
    {
      icon: Truck,
      title: 'Group Shipping',
      description: 'Pool your produce with other farmers to share truck payloads and reduce transport costs from the plateau.'
    },
    {
      icon: Smartphone,
      title: 'SMS & Offline Support',
      description: 'List your crops via SMS or offline mode. Perfect for areas with limited network coverage on the plateau.'
    },
    {
      icon: CloudOff,
      title: 'Offline Ready',
      description: 'Continue working even without internet. Your data syncs automatically when connection is restored.'
    },
    {
      icon: MessageSquare,
      title: 'Multilingual AI Assistant',
      description: 'Gefoun-AI speaks English, Pidgin, and Hausa. Get help in your preferred language anytime.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About Gefoun</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empowering Mambilla Plateau farmers through smart digital trade. 
            Connecting the hills of Gembu to markets in Jalingo, Yola, and beyond.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden mb-16 h-[400px] flex items-center justify-center">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9f1dc251-c63c-4e58-9764-635d156d943a/mambilla-hero-036167a7-1782246912448.webp" 
            alt="Mambilla Plateau"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 text-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Built for the Mambilla Plateau</h2>
            <p className="text-lg max-w-2xl">
              Understanding the unique challenges of highland farming and trade in Taraba State.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Gefoun?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Gefoun bridges the gap between rural farmers on the Mambilla Plateau and buyers across Nigeria. 
            We understand the challenges of highland agriculture—erratic network coverage, expensive transport, 
            and the need for trust in trade.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our platform is designed specifically for the realities of Gembu and surrounding communities, 
            with offline capabilities, SMS integration, and local verification agents who ensure every 
            transaction is secure and fair.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of farmers and buyers already trading on Gefoun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg">
              Start Selling
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
              Browse Marketplace
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
