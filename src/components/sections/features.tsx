'use client';

import { motion } from 'framer-motion';
import { Search, TrendingDown, Scale, Bell, Shield, Cpu } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'AI-powered search',
    desc: 'Describe what you want in plain language. Carta finds the best matches across hundreds of stores instantly.',
  },
  {
    icon: TrendingDown,
    title: 'Price tracking',
    desc: 'Monitor prices over time and get notified the moment a product hits your target price.',
  },
  {
    icon: Scale,
    title: 'Smart comparison',
    desc: 'Compare products side-by-side with AI-generated pros, cons, and a clear recommendation.',
  },
  {
    icon: Bell,
    title: 'Price alerts',
    desc: 'Set a target price and let Carta watch the market for you. Never miss a deal again.',
  },
  {
    icon: Shield,
    title: 'Verified deals',
    desc: 'Every deal is cross-checked for authenticity. Shop with confidence knowing listings are legitimate.',
  },
  {
    icon: Cpu,
    title: 'Personalized picks',
    desc: 'The more you use Carta, the better it understands your preferences and budget.',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Everything you need to shop smarter
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
