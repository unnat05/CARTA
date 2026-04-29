'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, TrendingDown, Bell, Activity,
  ArrowRight, Zap, ExternalLink, ChevronRight,
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useDispatch } from 'react-redux';
import { setSearchQuery, toggleChat } from '@/lib/features/ui-slice';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { RealisticMockData } from '@/lib/realistic-mock-data';

const QUICK_SEARCHES = [
  'Best GPU under ₹50,000',
  'Mechanical keyboards',
  'Ultrawide monitors',
  '4K cameras',
];

export default function DashboardPage() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Generate realistic data based on user ID
  const dashboardData = useMemo(() => 
    RealisticMockData.generateDashboardStats(user?.id),
    [user?.id]
  );
  
  const greeting = RealisticMockData.getTimeBasedGreeting();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) return;
    dispatch(setSearchQuery(q));
    dispatch(toggleChat());
    setQuery('');
  };

  const handleQuickSearch = (q: string) => {
    dispatch(setSearchQuery(q));
    dispatch(toggleChat());
  };

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <div className="space-y-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Good morning, {user?.firstName || 'there'} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your tracked products.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/history')} className="rounded-xl">
              <Activity size={15} className="mr-2" /> View history
            </Button>
            <Button size="sm" onClick={() => router.push('/dashboard/search')} className="rounded-xl">
              <Search size={15} className="mr-2" /> New search
            </Button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 animate-pulse">
          <div className="h-10 bg-muted rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-muted mb-3"></div>
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {user?.firstName || 'there'} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your tracked products.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/history')} className="rounded-xl">
            <Activity size={15} className="mr-2" /> View history
          </Button>
          <Button size="sm" onClick={() => router.push('/dashboard/search')} className="rounded-xl">
            <Search size={15} className="mr-2" /> New search
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-4"
      >
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <Search size={18} className="text-muted-foreground shrink-0 ml-1" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Carta anything — 'best laptop for video editing under ₹80k'..."
            className="flex-1 border-none bg-transparent focus-visible:ring-0 text-sm placeholder:text-muted-foreground/60 h-10"
          />
          <Button type="submit" disabled={!query.trim()} size="sm" className="rounded-xl shrink-0">
            Ask AI <ArrowRight size={14} className="ml-1.5" />
          </Button>
        </form>
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground mr-1">Try:</span>
          {QUICK_SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => handleQuickSearch(s)}
              className="text-xs px-3 py-1 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Products tracked', value: dashboardData.stats.productsTracked.toString(), icon: Activity, desc: 'Across all stores', color: 'text-primary bg-primary/10' },
          { label: 'Price drops found', value: dashboardData.stats.priceDropsFound.toString(), icon: TrendingDown, desc: 'This week', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total saved', value: `₹${dashboardData.stats.totalSaved.toLocaleString('en-IN')}`, icon: Zap, desc: 'Estimated savings', color: 'text-violet-600 bg-violet-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', stat.color)}>
              <stat.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent + Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
            <button
              onClick={() => router.push('/dashboard/history')}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {dashboardData.recentActivity.slice(0, 5).map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{item.price}</p>
                  <p className={cn('text-xs font-medium', item.positive ? 'text-emerald-600' : 'text-muted-foreground')}>
                    {item.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Alert */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Price alert triggered</h2>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Buy now</span>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-base font-semibold text-foreground">{dashboardData.featuredAlert.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{dashboardData.featuredAlert.category} · {dashboardData.featuredAlert.store}</p>
            </div>

            <div className="flex items-end gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current price</p>
                <p className="text-3xl font-bold text-foreground">₹{dashboardData.featuredAlert.current.toLocaleString('en-IN')}</p>
              </div>
              <div className="mb-1">
                <p className="text-xs text-muted-foreground line-through">₹{dashboardData.featuredAlert.original.toLocaleString('en-IN')}</p>
                <p className="text-sm font-semibold text-emerald-600">Save ₹{dashboardData.featuredAlert.savings.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Price drop progress</span>
                <span className="font-medium text-foreground">{dashboardData.featuredAlert.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dashboardData.featuredAlert.progress}%` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button className="flex-1 rounded-xl text-sm" size="sm">
                <ExternalLink size={14} className="mr-2" /> Buy now
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl text-sm" size="sm" onClick={() => router.push('/dashboard/alerts')}>
                <Bell size={14} className="mr-2" /> View alerts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
