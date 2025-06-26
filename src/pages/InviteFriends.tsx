
import { useState } from 'react';
import { Share2, Copy, MessageSquare, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const InviteFriends = () => {
  const { user } = useAuth();
  const [referrals] = useState(0); // In a real app, this would come from the API

  const referralLink = `https://faluus.com/ref/${user?.referralCode}`;

  const handleCopyLink = async () => {
    await copyToClipboard(referralLink);
    toast.success('Referral link copied to clipboard');
  };

  const handleCopyCode = async () => {
    if (user?.referralCode) {
      await copyToClipboard(user.referralCode);
      toast.success('Referral code copied to clipboard');
    }
  };

  const handleShare = (method: string) => {
    const message = `Join Faluus Exchange using my referral code: ${user?.referralCode}. Sign up here: ${referralLink}`;
    
    switch (method) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Join Faluus Exchange&body=${encodeURIComponent(message)}`, '_blank');
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'Join Faluus Exchange',
            text: message,
            url: referralLink
          }).catch(err => console.error('Error sharing:', err));
        } else {
          handleCopyLink();
        }
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Invite Friends</CardTitle>
            <CardDescription>
              Share your referral code with friends and earn rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-2">Your Referral Code</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-mono font-bold">{user.referralCode}</span>
                  <Button variant="ghost" size="icon" onClick={handleCopyCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Share Your Link</h3>
                <div className="flex items-center space-x-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="icon" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Share via</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleShare('sms')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    SMS
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleShare('email')}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleShare('other')}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Other
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Total Referrals</h3>
                    <p className="text-muted-foreground text-sm">
                      Friends who joined using your code
                    </p>
                  </div>
                  <span className="text-2xl font-bold">{referrals}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InviteFriends;