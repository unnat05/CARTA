'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Search, TrendingDown, Scale, Bell, Shield, Cpu,
  ArrowRight, CheckCircle2, XCircle,
} from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Search,
    title: 'AI-Powered Search',
    desc: 'Describe what you want in plain language — "best laptop for video editing under ₹80,000" — and Carta finds the best matches across hundreds of stores instantly.',
    points: ['Natural language queries', 'Multi-store search', 'Image-based search', 'Instant results'],
  },
  {
    icon: TrendingDown,
    title: 'Price Intelligence',
    desc: 'Track price history, identify trends, and know exactly when to buy. Our AI predicts price movements so you always get the best deal.',
    points: ['Historical price charts', 'Price trend analysis', 'Best time to buy predictions', 'Deal score ratings'],
  },
  {
    icon: Scale,
    title: 'Smart Comparison',
    desc: 'Compare up to 3 products side-by-side with AI-generated pros, cons, and a clear recommendation tailored to your needs.',
    points: ['Side-by-side specs', 'AI pros & cons', 'Clear winner recommendation', 'Value-for-money scoring'],
  },
  {
    icon: Bell,
    title: 'Price Alerts',
    desc: 'Set a target price and let Carta watch the market for you. Get instant notifications the moment a product hits your price.',
    points: ['Instant notifications', 'Multiple products', 'Custom price targets', 'Email & push alerts'],
  },
  {
    icon: Shield,
    title: 'Verified Deals',
    desc: 'Every deal is cross-checked for authenticity. We verify merchant ratings, stock availability, and listing accuracy.',
    points: ['Merchant verification', 'Stock validation', 'Fraud detection', 'Authentic reviews only'],
  },
  {
    icon: Cpu,
    title: 'Personalized AI',
    desc: 'The more you use Carta, the smarter it gets. It learns your preferences, budget, and style to surface the most relevant products.',
    points: ['Preference learning', 'Budget awareness', 'Style matching', 'Adaptive recommendations'],
  },
];

const COMPARISON = [
  { label: 'Multi-store search', carta: true, others: false },
  { label: 'AI recommendations', carta: true, others: false },
  { label: 'Price history', carta: true, others: true },
  { label: 'Smart comparison', carta: true, others: false },
  { label: 'Price alerts', carta: true, others: true },
  { label: 'Fraud detection', carta: true, others: false },
  { label: 'Natural language search', carta: true, others: false },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Features
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Built for smarter shopping
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Every feature in Carta is designed to save you time, money, and the frustration of bad purchases.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
              <ul className="space-y-1.5">
                {f.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 size={12} className="text-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              How Carta compares
            </h2>
            <p className="text-muted-foreground">See what sets us apart from traditional shopping tools.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-muted/50 px-6 py-3 border-b border-border">
              <span className="text-xs font-semibold text-muted-foreground">Feature</span>
              <span className="text-xs font-semibold text-primary text-center">Carta</span>
              <span className="text-xs font-semibold text-muted-foreground text-center">Others</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 px-6 py-4 items-center ${i < COMPARISON.length - 1 ? 'border-b border-border' : ''}`}
              >
                <span className="text-sm text-foreground">{row.label}</span>
                <div className="flex justify-center">
                  <CheckCircle2 size={18} className="text-primary" />
                </div>
                <div className="flex justify-center">
                  {row.others ? (
                    <CheckCircle2 size={18} className="text-muted-foreground/40" />
                  ) : (
                    <XCircle size={18} className="text-muted-foreground/30" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
            Ready to try it?
          </h2>
          <p className="text-muted-foreground mb-8">Start for free. No credit card required.</p>
          <Link href="/sign-up">
            <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold gap-2">
              Get started <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
