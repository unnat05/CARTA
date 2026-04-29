'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Bell, Scale, Search, Sparkles } from 'lucide-react';

const CARDS = [
  {
    icon: Search,
    title: 'Search anything',
    desc: 'Natural language search across 12,000+ stores',
    preview: (
      <div className="mt-4 bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground border border-border">
        “Best noise-cancelling headphones under ₹30,000”
      </div>
    ),
    span: 'md:col-span-2',
  },
  {
    icon: TrendingDown,
    title: 'Price history',
    desc: 'See how prices move over time',
    preview: (
      <div className="mt-4 flex items-end gap-1 h-12">
        {[60, 80, 55, 90, 70, 45, 30, 50, 65, 40, 25, 55].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
            className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-sm transition-colors"
          />
        ))}
      </div>
    ),
    span: 'md:col-span-1',
  },
  {
    icon: Bell,
    title: 'Price alerts',
    desc: 'Get notified when prices drop',
    preview: (
      <div className="mt-4 space-y-2">
        {[
          { name: 'Sony WH-1000XM5', status: 'Watching', color: 'text-amber-500 bg-amber-50' },
          { name: 'MacBook Air M3', status: 'Triggered!', color: 'text-emerald-600 bg-emerald-50' },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded-lg border border-border">
            <span className="text-foreground font-medium truncate">{item.name}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    ),
    span: 'md:col-span-1',
  },
  {
    icon: Scale,
    title: 'Compare products',
    desc: 'Side-by-side AI comparison with a clear winner',
    preview: (
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {['Sony XM5', 'Bose QC45'].map((name, i) => (
          <div key={name} className={`p-2.5 rounded-xl border ${i === 0 ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/30'}`}>
            <p className="font-semibold text-foreground">{name}</p>
            <p className={`text-[10px] mt-1 font-medium ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
              {i === 0 ? '94/100 ★ Winner' : '88/100'}
            </p>
          </div>
        ))}
      </div>
    ),
    span: 'md:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'AI assistant',
    desc: 'Ask anything, get expert buying advice instantly',
    preview: (
      <div className="mt-4 space-y-2 text-xs">
        <div className="bg-muted/50 rounded-xl p-2.5 border border-border text-muted-foreground">
          “Should I buy the Sony XM5 now or wait?”
        </div>
        <div className="bg-primary/10 rounded-xl p-2.5 border border-primary/20 text-foreground">
          Buy now — prices are at a 6-month low and unlikely to drop further.
        </div>
      </div>
    ),
    span: 'md:col-span-2',
  },
];

export const BentoShowcase = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Product
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            One platform, every tool you need
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`${card.span} bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 group`}
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <card.icon size={18} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
              {card.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
