'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  History, Search, Scale, Clock, Trash2,
  RotateCcw, X, Zap,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, toggleChat } from '@/lib/features/ui-slice';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { RealisticMockData } from '@/lib/realistic-mock-data';

type HistoryItem = {
  id: string;
  type: 'search' | 'comparison';
  query: string;
  time: string;
  results: number;
};

export default function HistoryPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  
  const INITIAL_HISTORY = useMemo(() => 
    RealisticMockData.generateSearchHistory(user?.id),
    [user?.id]
  );
  
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [filter, setFilter] = useState<'all' | 'search' | 'comparison'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const filtered = history.filter((item) => {
    const matchType = filter === 'all' || item.type === filter;
    const matchSearch = item.query.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const rerun = (item: HistoryItem) => {
    if (item.type === 'search') {
      dispatch(setSearchQuery(item.query));
      dispatch(toggleChat());
    } else {
      router.push('/dashboard/comparison');
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Search history</h1>
            <p className="text-sm text-muted-foreground mt-1">Your past searches and comparisons.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center animate-pulse">
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Search history</h1>
          <p className="text-sm text-muted-foreground mt-1">Your past searches and comparisons.</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => { setHistory([]); setCleared(true); }} className="rounded-xl gap-2 text-destructive hover:text-destructive hover:bg-destructive/5 shrink-0">
            <Trash2 size={14} /> Clear all
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Searches', value: history.filter((h) => h.type === 'search').length },
          { label: 'Comparisons', value: history.filter((h) => h.type === 'comparison').length },
          { label: 'Total', value: history.length },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground mb-0.5">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history..."
            className="pl-9 rounded-xl h-9 text-sm"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {(['all', 'search', 'comparison'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                filter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f === 'all' ? 'All' : f === 'search' ? 'Searches' : 'Comparisons'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="bg-card border border-border rounded-xl flex items-center gap-4 p-4 hover:border-primary/30 hover:shadow-sm transition-all group">
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                    item.type === 'search' ? 'bg-primary/10 text-primary' : 'bg-violet-100 text-violet-600'
                  )}>
                    {item.type === 'search' ? <Search size={15} /> : <Scale size={15} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.query}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={10} />
                        {item.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Zap size={10} />
                        {item.results} results
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" onClick={() => rerun(item)} className="rounded-lg h-8 text-xs gap-1.5">
                      <RotateCcw size={12} /> Rerun
                    </Button>
                    <button onClick={() => setHistory((p) => p.filter((h) => h.id !== item.id))} className="text-muted-foreground hover:text-destructive transition-colors p-1.5">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
              <History size={22} />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">
                {cleared ? 'History cleared' : searchTerm ? 'No results found' : 'No history yet'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {cleared ? 'Your search history has been cleared.' : 'Start searching to build your history.'}
              </p>
            </div>
            <Button size="sm" onClick={() => router.push('/dashboard/search')} className="rounded-xl gap-2">
              <Search size={14} /> Start searching
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
