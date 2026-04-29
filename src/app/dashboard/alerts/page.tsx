'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bell, TrendingDown, TrendingUp, Minus, Plus,
  Trash2, X, Sparkles, ExternalLink,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { setSearchQuery, toggleChat } from '@/lib/features/ui-slice';
import { cn } from '@/lib/utils';
import { RealisticMockData } from '@/lib/realistic-mock-data';

type Alert = {
  id: string;
  product: string;
  target: number;
  current: number;
  trend: 'down' | 'up' | 'stable';
  change: string;
  status: 'watching' | 'triggered';
  eta: string;
};

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function AlertsPage() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  
  const INITIAL_ALERTS = useMemo(() => 
    RealisticMockData.generatePriceAlerts(user?.id),
    [user?.id]
  );
  
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newCurrent, setNewCurrent] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const triggered = alerts.filter((a) => a.status === 'triggered');
  const watching = alerts.filter((a) => a.status === 'watching');

  const addAlert = () => {
    if (!newProduct.trim() || !newTarget || !newCurrent) return;
    const target = parseInt(newTarget);
    const current = parseInt(newCurrent);
    setAlerts((p) => [{
      id: Date.now().toString(),
      product: newProduct.trim(),
      target, current,
      trend: current > target ? 'down' : 'stable',
      change: '0%',
      status: current <= target ? 'triggered' : 'watching',
      eta: current <= target ? 'Buy Now!' : 'Tracking...',
    }, ...p]);
    setNewProduct(''); setNewTarget(''); setNewCurrent('');
    setShowForm(false);
  };

  if (!mounted) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Price alerts</h1>
            <p className="text-sm text-muted-foreground mt-1">Get notified when prices hit your target.</p>
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
          <h1 className="text-2xl font-bold text-foreground">Price alerts</h1>
          <p className="text-sm text-muted-foreground mt-1">Get notified when prices hit your target.</p>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm" className="rounded-xl gap-2 shrink-0">
          <Plus size={15} /> New alert
        </Button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">Create price alert</p>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Product name</label>
                <Input autoFocus value={newProduct} onChange={(e) => setNewProduct(e.target.value)} placeholder="e.g. Sony WH-1000XM5" className="rounded-xl h-9 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Current price (₹)</label>
                <Input value={newCurrent} onChange={(e) => setNewCurrent(e.target.value)} placeholder="e.g. 29990" type="number" className="rounded-xl h-9 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Target price (₹)</label>
                <Input value={newTarget} onChange={(e) => setNewTarget(e.target.value)} placeholder="e.g. 24990" type="number" className="rounded-xl h-9 text-sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addAlert} disabled={!newProduct.trim() || !newTarget || !newCurrent} size="sm" className="rounded-xl">Create alert</Button>
              <Button onClick={() => setShowForm(false)} variant="outline" size="sm" className="rounded-xl">Cancel</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total alerts', value: alerts.length, color: 'text-primary bg-primary/10' },
          { label: 'Triggered', value: triggered.length, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Watching', value: watching.length, color: 'text-violet-600 bg-violet-50' },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <p className={cn('text-2xl font-bold mb-1', s.color.split(' ')[0])}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Triggered */}
      {triggered.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px bg-emerald-200 flex-1" />
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Price target reached</p>
            <div className="h-px bg-emerald-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {triggered.map((a, i) => <AlertCard key={a.id} alert={a} onDelete={(id) => setAlerts((p) => p.filter((x) => x.id !== id))} onAskAI={(name) => { dispatch(setSearchQuery(`Is now a good time to buy ${name}?`)); dispatch(toggleChat()); }} i={i} />)}
          </div>
        </div>
      )}

      {/* Watching */}
      {watching.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px bg-border flex-1" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Watching</p>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {watching.map((a, i) => <AlertCard key={a.id} alert={a} onDelete={(id) => setAlerts((p) => p.filter((x) => x.id !== id))} onAskAI={(name) => { dispatch(setSearchQuery(`Is now a good time to buy ${name}?`)); dispatch(toggleChat()); }} i={i} />)}
          </div>
        </div>
      )}

      {/* Empty */}
      {alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
            <Bell size={22} />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">No alerts yet</p>
            <p className="text-sm text-muted-foreground mt-1">Create an alert to track price drops.</p>
          </div>
          <Button onClick={() => setShowForm(true)} size="sm" className="rounded-xl gap-2">
            <Plus size={14} /> Create alert
          </Button>
        </div>
      )}
    </div>
  );
}

function AlertCard({ alert, onDelete, onAskAI, i }: { alert: Alert; onDelete: (id: string) => void; onAskAI: (p: string) => void; i: number }) {
  const progress = Math.min(100, Math.round(((alert.current - alert.target) / alert.current) * 100));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
      <div className={cn(
        'bg-card border rounded-2xl p-5 transition-all duration-200 hover:shadow-md',
        alert.status === 'triggered' ? 'border-emerald-200' : 'border-border'
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground truncate">{alert.product}</h3>
              {alert.status === 'triggered' && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">Triggered</span>
              )}
            </div>
          </div>
          <button onClick={() => onDelete(alert.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0">
            <Trash2 size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Current</p>
            <p className="text-base font-bold text-foreground">{fmt(alert.current)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Target</p>
            <p className="text-base font-bold text-primary">{fmt(alert.target)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Change</p>
            <div className={cn('flex items-center gap-1 text-sm font-semibold',
              alert.trend === 'down' ? 'text-emerald-600' : alert.trend === 'up' ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {alert.trend === 'down' ? <TrendingDown size={14} /> : alert.trend === 'up' ? <TrendingUp size={14} /> : <Minus size={14} />}
              {alert.change}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Forecast</p>
            <p className={cn('text-sm font-medium', alert.status === 'triggered' ? 'text-emerald-600' : 'text-muted-foreground')}>{alert.eta}</p>
          </div>
        </div>

        {alert.status === 'watching' && progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress to target</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        )}

        {alert.status === 'triggered' ? (
          <Button size="sm" className="w-full rounded-xl gap-2 text-xs">
            <ExternalLink size={13} /> Buy now
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="w-full rounded-xl gap-2 text-xs" onClick={() => onAskAI(alert.product)}>
            <Sparkles size={13} /> Ask AI for advice
          </Button>
        )}
      </div>
    </motion.div>
  );
}
