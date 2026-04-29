'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Sparkles, Star, X,
  SlidersHorizontal, Loader2, ArrowRight,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, toggleChat } from '@/lib/features/ui-slice';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/mock-data';
import { RealisticMockData } from '@/lib/realistic-mock-data';
import Image from 'next/image';

const SUGGESTIONS = ['iPhone 15 Pro', 'Sony headphones', 'Nike shoes', 'Samsung TV', 'Air fryer'];

export default function SearchPage() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(false);
    setError('');
    setLastQuery(q);
    
    try {
      const response = await fetch('/api/products/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      // Use realistic mock data system to rank results
      const rankedProducts = RealisticMockData.generateSearchResults(q, data.products || []);
      setResults(rankedProducts);
      setSearched(true);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search products. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    runSearch(query);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getMatchScore = (index: number) => {
    return Math.max(99 - index * 5, 75);
  };

  const getTag = (product: Product, index: number) => {
    if (index === 0) return 'Best match';
    if (product.discount && product.discount > 30) return 'Best value';
    if (product.rating >= 4.7) return 'Top rated';
    return product.marketplace.charAt(0).toUpperCase() + product.marketplace.slice(1);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Search</h1>
        <p className="text-sm text-muted-foreground mt-1">Search for any product using natural language.</p>
      </div>

      {/* Search Input */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Search size={18} className="text-muted-foreground shrink-0 ml-1" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you're looking for..."
            className="flex-1 border-none bg-transparent focus-visible:ring-0 text-sm h-10"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setSearched(false); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          )}
          <Button type="submit" disabled={!query.trim() || loading} size="sm" className="rounded-xl shrink-0 gap-2">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground mr-1">Suggestions:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setQuery(s); runSearch(s); }}
              className="text-xs px-3 py-1 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles size={22} className="text-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">Searching across thousands of stores...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {searched && !loading && results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {results.length} results for <span className="font-medium text-foreground">“{lastQuery}”</span>
              </p>
              <Button variant="outline" size="sm" className="rounded-xl gap-2 text-xs">
                <SlidersHorizontal size={13} /> Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 group flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {getTag(product, i)}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{getMatchScore(i)}% match</span>
                  </div>

                  <div className="relative w-full h-32 rounded-xl bg-muted mb-3 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-foreground mb-0.5 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 capitalize">{product.marketplace}</p>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={11} className={cn(j < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted')} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{product.rating} ({product.reviews.toLocaleString()})</span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-xl font-bold text-foreground">{formatPrice(product.price, product.currency)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through mb-0.5">
                          {formatPrice(product.originalPrice, product.currency)}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        className="rounded-xl text-xs" 
                        onClick={() => { 
                          dispatch(setSearchQuery(`Tell me more about ${product.name}`)); 
                          dispatch(toggleChat()); 
                        }}
                      >
                        Ask AI
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={cn('rounded-xl text-xs', saved.includes(product.id) && 'border-primary/40 text-primary bg-primary/5')} 
                        onClick={() => setSaved((p) => p.includes(product.id) ? p.filter((n) => n !== product.id) : [...p, product.id])}
                      >
                        {saved.includes(product.id) ? 'Saved' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Want a detailed comparison?</p>
                  <p className="text-xs text-muted-foreground">Let AI analyze all results and give you a clear recommendation.</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="rounded-xl gap-2 shrink-0" 
                onClick={() => { 
                  dispatch(setSearchQuery(`Compare all results for "${lastQuery}" and give me a recommendation.`)); 
                  dispatch(toggleChat()); 
                }}
              >
                Generate report <ArrowRight size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results */}
      {searched && !loading && results.length === 0 && (
        <div className="text-center py-20">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Search size={22} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">No results found</p>
          <p className="text-xs text-muted-foreground">Try a different search term or browse suggestions above</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 text-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!searched && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { icon: Sparkles, title: 'Natural language', desc: 'Describe what you need in plain English — no exact product names required.' },
            { icon: Search, title: 'Multi-store search', desc: 'We scan thousands of stores simultaneously to find the best prices.' },
            { icon: Star, title: 'Smart ranking', desc: 'Results are ranked by value, not just price — quality matters too.' },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <item.icon size={18} />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
