'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { MessageSquare, Search, ShoppingCart, ArrowRight, Zap, Shield, Smile, Activity } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Tell Carta what you need',
    desc: "Just describe what you're looking for in plain language. Include your budget, preferences, and any specific requirements. No need for exact product names.",
    example: '"I need a laptop for video editing, budget around ₹80,000, prefer something lightweight."',
  },
  {
    number: '02',
    icon: Search,
    title: 'Carta searches and analyzes',
    desc: 'Our AI scans thousands of stores, checks price history, verifies deals, and ranks results by value — all in under a second.',
    example: 'Scanning 12,000+ stores · Checking price history · Verifying authenticity · Ranking by value',
  },
  {
    number: '03',
    icon: ShoppingCart,
    title: 'Buy with confidence',
    desc: "You get a curated shortlist with clear recommendations. Compare options, set price alerts, or buy directly — knowing you're getting the best deal.",
    example: 'Best match found · Price at 6-month low · 98% authenticity score · Save ₹12,000',
  },
];

const METRICS = [
  { icon: Activity, label: 'Real-time', desc: 'Live price tracking' },
  { icon: Shield, label: 'Verified', desc: 'Every deal authenticated' },
  { icon: Smile, label: 'Simple', desc: 'No learning curve' },
  { icon: Zap, label: 'Fast', desc: 'Results in under 1 second' },
];

export default function HowItWorksPage() {
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
            How it works
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Three steps to a better deal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Carta makes finding the best deal effortless. Here&apos;s exactly how it works.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8 hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-5 flex-1">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <step.icon size={22} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                  <div className="bg-muted/50 border border-border rounded-xl p-4 text-sm text-muted-foreground italic">
                    {step.example}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <m.icon size={20} />
              </div>
              <p className="text-base font-bold text-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
            See it in action
          </h2>
          <p className="text-muted-foreground mb-8">
            Create a free account and start finding better deals in minutes.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold gap-2">
              Try Carta free <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
