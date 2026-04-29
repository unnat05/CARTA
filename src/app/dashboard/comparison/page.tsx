'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus, Star, CheckCircle2, XCircle, Sparkles,
  Trash2, X, ArrowRight,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { setSearchQuery, toggleChat } from '@/lib/features/ui-slice';
import { cn } from '@/lib/utils';
import { RealisticMockData } from '@/lib/realistic-mock-data';

type Product = {
  id: string;
  name: string;
  price: string;
  rating: number;
  store: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  score: number;
};

export default function ComparisonPage() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  
  const DEFAULT_PRODUCTS = useMemo(() => 
    RealisticMockData.generateComparisonProducts(user?.id),
    [user?.id]
  );
  
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const winner = products.reduce((a, b) => (a.score > b.score ? a : b), products[0]);

  const addProduct = () => {
    if (!newName.trim()) return;
    setProducts((p) => [...p, {
      id: Date.now().toString(),
      name: newName.trim(),
      price: '₹—',
      rating: 0,
      store: 'Searching...',
      specs: { 'Battery': '—', 'ANC': '—', 'Weight': '—', 'Bluetooth': '—', 'Foldable': '—' },
      pros: ['Ask AI to analyze this product'],
      cons: ['Waiting for AI analysis'],
      score: 0,
    }]);
    setNewName('');
    setShowAdd(false);
  };

  if (!mounted) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Compare products</h1>
            <p className="text-sm text-muted-foreground mt-1">Side-by-side comparison with AI-powered insights.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
              <div className="h-6 bg-muted rounded mb-4"></div>
              <div className="h-32 bg-muted rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
              </div>
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
          <h1 className="text-2xl font-bold text-foreground">Compare products</h1>
          <p className="text-sm text-muted-foreground mt-1">Side-by-side comparison with AI-powered insights.</p>
        </div>
        <Button
          onClick={() => { dispatch(setSearchQuery(`Compare ${products.map((p) => p.name).join(' vs ')} and give me a final recommendation.`)); dispatch(toggleChat()); }}
          size="sm"
          className="rounded-xl gap-2 shrink-0"
        >
          <Sparkles size={14} /> Get AI verdict
        </Button>
      </div>

      {/* Winner Banner */}
      {products.length >= 2 && winner && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Sparkles size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              AI recommends: <span className="text-primary">{winner.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">Score: {winner.score}/100 — highest overall value</p>
          </div>
          <Button size="sm" variant="outline" className="rounded-xl gap-1.5 shrink-0 text-xs" onClick={() => { dispatch(setSearchQuery(`Why is ${winner.name} the best choice?`)); dispatch(toggleChat()); }}>
            Why? <ArrowRight size={12} />
          </Button>
        </div>
      )}

      {/* Product Cards */}
      <div className={cn('grid gap-4', products.length === 1 ? 'grid-cols-1 max-w-sm' : products.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3')}>
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              'bg-card border rounded-2xl p-5 flex flex-col transition-all duration-200',
              p.id === winner?.id && products.length > 1 ? 'border-primary/40 shadow-md shadow-primary/5' : 'border-border'
            )}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                {p.id === winner?.id && products.length > 1 && (
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full block mb-2">
                    Recommended
                  </span>
                )}
                <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{p.store}</p>
              </div>
              <button onClick={() => setProducts((prev) => prev.filter((x) => x.id !== p.id))} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 size={15} />
              </button>
            </div>

            {/* Price + Rating */}
            <div className="flex items-end justify-between pb-4 mb-4 border-b border-border">
              <p className="text-2xl font-bold text-foreground">{p.price}</p>
              {p.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-primary text-primary" />
                  <span className="text-sm font-semibold text-foreground">{p.rating}</span>
                </div>
              )}
            </div>

            {/* Score */}
            {p.score > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Overall score</span>
                  <span className="font-semibold text-foreground">{p.score}/100</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.score}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                    className={cn('h-full rounded-full', p.id === winner?.id && products.length > 1 ? 'bg-primary' : 'bg-muted-foreground/30')}
                  />
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="space-y-1.5 mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Specs</p>
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                  <span className="text-xs text-muted-foreground">{k}</span>
                  <span className="text-xs font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>

            {/* Pros & Cons */}
            <div className="space-y-3 mb-5">
              <div>
                <p className="text-xs font-semibold text-emerald-600 mb-2">Pros</p>
                <div className="space-y-1.5">
                  {p.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-destructive/70 mb-2">Cons</p>
                <div className="space-y-1.5">
                  {p.cons.map((con) => (
                    <div key={con} className="flex items-start gap-2">
                      <XCircle size={12} className="text-destructive/60 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={() => { dispatch(setSearchQuery(`Should I buy the ${p.name}? Give me a detailed review.`)); dispatch(toggleChat()); }}
              variant={p.id === winner?.id && products.length > 1 ? 'default' : 'outline'}
              size="sm"
              className="w-full rounded-xl mt-auto text-xs"
            >
              Ask AI about this
            </Button>
          </motion.div>
        ))}

        {/* Add Product */}
        {products.length < 3 && (
          <AnimatePresence mode="wait">
            {showAdd ? (
              <motion.div key="form" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-card border border-dashed border-border rounded-2xl p-5 flex flex-col justify-center gap-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Add product</p>
                  <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
                </div>
                <Input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addProduct()}
                  placeholder="Product name or URL..."
                  className="rounded-xl text-sm h-10"
                />
                <div className="flex gap-2">
                  <Button onClick={addProduct} disabled={!newName.trim()} size="sm" className="flex-1 rounded-xl">Add</Button>
                  <Button onClick={() => setShowAdd(false)} variant="outline" size="sm" className="rounded-xl px-3"><X size={14} /></Button>
                </div>
              </motion.div>
            ) : (
              <motion.button key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowAdd(true)}
                className="bg-muted/30 border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all group min-h-[200px]"
              >
                <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                  <Plus size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Add product</p>
              </motion.button>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
