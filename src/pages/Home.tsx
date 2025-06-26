
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { formatCurrency, copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode] = useState('1XBET100');

  const handleCopyPromo = async () => {
    await copyToClipboard(promoCode);
    toast.success('Promo code copied to clipboard');
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Balance Card */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <h2 className="text-lg font-medium">Your Balance</h2>
            <p className="text-3xl font-bold mt-2">{formatCurrency(user.balance)}</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            size="lg" 
            className="h-20 text-lg"
            onClick={() => navigate('/deposit')}
          >
            Deposit
          </Button>
          <Button 
            size="lg" 
            className="h-20 text-lg"
            onClick={() => navigate('/withdraw')}
          >
            Withdraw
          </Button>
        </div>

        {/* Promo Code */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium">1Xbet Promo Code</h3>
              <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                <span className="font-mono text-lg">{promoCode}</span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleCopyPromo}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => window.open('https://1xbet.com', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invite Friends */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium">Invite Friends</h3>
              <p className="text-sm text-muted-foreground">
                Share your referral code and earn rewards
              </p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => navigate('/invite')}
              >
                Share Your Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;