
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'evc', name: 'EVC Plus' },
  { id: 'zaad', name: 'Telesom ZAAD' },
  { id: 'golis', name: 'Golis' },
  { id: 'jeeb', name: 'Jeeb' },
  { id: '1xbet', name: '1Xbet' },
  { id: 'linebet', name: 'Linebet' },
  { id: 'betwinner', name: 'Betwinner' },
];

const Deposit = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user balance (mock)
      if (user) {
        updateUser({ 
          balance: user.balance + parseFloat(amount) 
        });
      }
      
      toast.success(`Successfully deposited ${amount}`);
      navigate('/');
    } catch (error) {
      toast.error('Deposit failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Deposit Funds</CardTitle>
            <CardDescription>
              Add money to your Faluus Exchange account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                >
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={user.phone}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  We'll use your registered phone number
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Deposit'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Funds will be added to your account immediately after payment confirmation
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Deposit;