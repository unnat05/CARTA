'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingDown, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { icon: TrendingDown, label: 'Average savings', value: '23%' },
  { icon: Shield, label: 'Verified deals', value: '99.9%' },
  { icon: Zap, label: 'Search speed', value: '<1s' },
];

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <Sparkles size={14} />
          AI-powered shopping intelligence
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
        >
          Shop smarter with{' '}
          <span className="text-primary">AI</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Carta finds the best deals across thousands of stores, compares products intelligently, and alerts you when prices drop — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <Link href="/sign-up">
            <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold gap-2 shadow-lg shadow-primary/20">
              Start for free <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="outline" size="lg" className="rounded-xl px-8 h-12 text-base font-semibold">
              See how it works
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <stat.icon size={18} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground text-center">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
