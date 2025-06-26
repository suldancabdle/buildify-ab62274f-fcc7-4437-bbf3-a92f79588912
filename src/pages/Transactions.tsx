
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  method: string;
  recipient?: string;
}

const Transactions = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Mock transactions data
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'deposit',
        amount: 50,
        status: 'success',
        date: '2025-06-20T14:30:00',
        method: 'EVC Plus'
      },
      {
        id: '2',
        type: 'withdraw',
        amount: 20,
        status: 'success',
        date: '2025-06-18T09:15:00',
        method: 'Telesom ZAAD',
        recipient: '+252612345678'
      },
      {
        id: '3',
        type: 'deposit',
        amount: 100,
        status: 'pending',
        date: '2025-06-15T16:45:00',
        method: '1Xbet'
      },
      {
        id: '4',
        type: 'withdraw',
        amount: 30,
        status: 'failed',
        date: '2025-06-10T11:20:00',
        method: 'Golis',
        recipient: '+252698765432'
      },
      {
        id: '5',
        type: 'deposit',
        amount: 75,
        status: 'success',
        date: '2025-06-05T13:10:00',
        method: 'Linebet'
      }
    ];
    
    setTransactions(mockTransactions);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'deposit' && transaction.type === 'deposit') return true;
    if (filter === 'withdraw' && transaction.type === 'withdraw') return true;
    if (filter === 'failed' && transaction.status === 'failed') return true;
    return false;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'pending': return 'text-amber-600';
      case 'failed': return 'text-red-600';
      default: return '';
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdraw">Withdrawals</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </span>
                        <span className={`text-sm font-medium capitalize ${getStatusColor(transaction.status)}`}>
                          • {transaction.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {transaction.method}
                        {transaction.recipient && ` • ${transaction.recipient}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Transactions;