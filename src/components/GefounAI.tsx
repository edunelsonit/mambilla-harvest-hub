import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, X, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  steps?: string[];
}

export const GefounAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      text: "Sannu! Welcome to Gefoun. I can help you with your trade between Gembu and the capital markets today.",
      steps: [
        "To SELL: Reply '1' or type 'List [Crop Name]'.",
        "To BUY: Tell me what produce you need in Jalingo/Yola.",
        "For DELIVERY: Ask me about our coordinated truck pooling options for this week."
      ]
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    
    const query = input.toLowerCase();
    let responseText = "I understand you need help with that. Here are your next steps:";
    let responseSteps: string[] = [];

    if (query.includes('sannu') || query.includes('ina kwana')) {
      responseText = "Sannu da zuwa! How can I help you with the Mambilla trade today?";
      responseSteps = [
        "Tell me if you are selling or buying.",
        "Check current Gembu market prices.",
        "Ask about truck pooling to Jalingo."
      ];
    } else if (query.includes('sell') || query.includes('list') || query.includes('1')) {
      responseText = "Excellent! Let's get your Mambilla produce listed.";
      responseSteps = [
        "Tell me the crop name and quantity.",
        "Upload a photo or use our SMS listing if network is low.",
        "Wait for a Gefoun Verification Agent to visit your farm."
      ];
    } else if (query.includes('buy') || query.includes('need') || query.includes('2')) {
      responseText = "We have high-quality Mambilla produce ready for transit.";
      responseSteps = [
        "Browse the marketplace for Tea, Avocados, or Potatoes.",
        "Deposit funds into our secure Escrow Wallet.",
        "Track your delivery as it moves down the plateau road."
      ];
    } else if (query.includes('delivery') || query.includes('transport') || query.includes('truck') || query.includes('3')) {
      responseText = "Moving goods off the plateau is easier with truck pooling.";
      responseSteps = [
        "View current 'Group Shipping' pools at Gembu motor park.",
        "Join a pool to share costs with other farmers.",
        "Confirm your loading with our park agents."
      ];
    } else if (query.includes('network') || query.includes('data')) {
      responseText = "No data? No problem. Gembu network can be tricky.";
      responseSteps = [
        "Use our SMS code *555*GEFOUN# to list crops offline.",
        "Automated postings will sync once you reach better signal.",
        "Call our local Gembu hotline for urgent transport help."
      ];
    } else {
      responseSteps = [
        "Try typing 'Sell' to list your highland crops.",
        "Try typing 'Buy' to source goods for Jalingo/Yola.",
        "Try typing 'Transport' for Gembu motor park updates."
      ];
    }

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: responseText,
        steps: responseSteps
      }]);
    }, 600);

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4"
          >
            <Card className="w-80 md:w-96 h-[500px] flex flex-col shadow-2xl border-primary/20 bg-background overflow-hidden">
              <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <h3 className="font-bold">Gefoun-AI</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/10">
                  <X size={20} />
                </Button>
              </div>
              
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 ${
                        m.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted text-foreground rounded-tl-none border border-border'
                      }`}>
                        <p className="text-sm">{m.text}</p>
                        {m.steps && (
                          <ul className="mt-2 space-y-1">
                            {m.steps.map((step, idx) => (
                              <li key={idx} className="text-xs flex gap-2">
                                <span className="text-primary font-bold">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-muted/50">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type 'Sell' or 'Ina kwana'..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="bg-background"
                  />
                  <Button size="icon" onClick={handleSend}>
                    <Send size={18} />
                  </Button>
                </div>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {['Sell', 'Buy', 'Transport', 'Ina kwana'].map(btn => (
                    <Badge 
                      key={btn} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground shrink-0"
                      onClick={() => setInput(btn)}
                    >
                      {btn}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        size="lg" 
        className="rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </Button>
    </div>
  );
};
