
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, History, User, MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/deposit', label: 'Deposit', icon: Wallet },
    { path: '/withdraw', label: 'Withdraw', icon: Wallet },
    { path: '/transactions', label: 'History', icon: History },
    { path: '/support', label: 'Support', icon: MessageSquare },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Faluus Exchange</span>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-4">
        {children}
      </main>
      
      <footer className="sticky bottom-0 border-t bg-background">
        <nav className="container">
          <ul className="flex justify-between items-center h-16">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex flex-col items-center justify-center px-4 py-2 text-xs",
                    location.pathname === item.path 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;