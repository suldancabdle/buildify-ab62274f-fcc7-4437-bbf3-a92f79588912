
import { useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

interface SupportContact {
  id: string;
  name: string;
  phone: string;
  description: string;
}

const Support = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const supportContacts: SupportContact[] = [
    {
      id: 'evc',
      name: 'EVC Plus Support',
      phone: '+252612345678',
      description: 'For EVC Plus deposit and withdrawal issues'
    },
    {
      id: 'zaad',
      name: 'Telesom ZAAD Support',
      phone: '+252634567890',
      description: 'For ZAAD deposit and withdrawal issues'
    },
    {
      id: 'golis',
      name: 'Golis Support',
      phone: '+252656789012',
      description: 'For Golis deposit and withdrawal issues'
    },
    {
      id: 'jeeb',
      name: 'Jeeb Support',
      phone: '+252678901234',
      description: 'For Jeeb deposit and withdrawal issues'
    },
    {
      id: 'general',
      name: 'General Support',
      phone: '+252690123456',
      description: 'For general inquiries and account issues'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setMessage('');
      setIsSending(false);
      toast.success('Message sent successfully');
    }, 1500);
  };

  const handleCall = (phone: string, name: string) => {
    // In a real app, this would use tel: protocol
    toast.success(`Calling ${name} at ${phone}`);
    window.location.href = `tel:${phone}`;
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat Support</TabsTrigger>
            <TabsTrigger value="call">Call Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Chat with Support</CardTitle>
                <CardDescription>
                  Send us a message and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 border rounded-md p-4 overflow-y-auto bg-muted/30">
                    <div className="flex justify-start mb-4">
                      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">
                          Hello! How can we help you today?
                        </p>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          Support • 10:30 AM
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button onClick={handleSendMessage} disabled={isSending}>
                      {isSending ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="call" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Call Support</CardTitle>
                <CardDescription>
                  Contact our support team directly by phone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportContacts.map((contact) => (
                    <Card key={contact.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {contact.description}
                            </p>
                            <p className="text-sm font-mono mt-1">
                              {contact.phone}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleCall(contact.phone, contact.name)}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Support;