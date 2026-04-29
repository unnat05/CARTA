'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Users, Target, Heart, Shield, Sparkles, TrendingDown, ArrowRight, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

const TEAM = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', avatar: 'AM', bio: 'Building the bridge between human intent and intelligent procurement.' },
  { name: 'Priya Sharma', role: 'Tech Lead', avatar: 'PS', bio: 'Architecting the systems that power real-time market discovery.' },
  { name: 'Rohan Kapoor', role: 'Design Lead', avatar: 'RK', bio: 'Translating complex data into clear, beautiful interfaces.' },
  { name: 'Ananya Singh', role: 'AI Architect', avatar: 'AS', bio: 'Training the models that predict price movements and surface deals.' },
];

const VALUES = [
  { icon: Sparkles, title: 'Transparency', desc: 'Every deal is verified at source. No hidden fees, no dark patterns.' },
  { icon: Shield, title: 'Privacy first', desc: 'Your data is yours. We never sell it or use it for advertising.' },
  { icon: Globe, title: 'Accessibility', desc: 'Great deals should be available to everyone, not just power users.' },
  { icon: Target, title: 'Precision', desc: 'We obsess over accuracy so you can shop with confidence.' },
];

const STATS = [
  { value: '200K+', label: 'Active users', icon: Users },
  { value: '₹50Cr+', label: 'Saved by users', icon: TrendingDown },
  { value: '5M+', label: 'Deals tracked', icon: Sparkles },
  { value: '24/7', label: 'Market monitoring', icon: Zap },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            About
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Shopping intelligence for everyone
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground leading-relaxed">
            Carta was founded on a simple belief: finding the best deal shouldn&apos;t require hours of research. We built the AI assistant we always wished existed.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-5 text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <stat.icon size={18} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our mission</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                Making smart shopping accessible to everyone
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The retail industry is built on information asymmetry. Prices fluctuate constantly, deals disappear in hours, and comparing products across dozens of stores is exhausting.
                </p>
                <p>
                  We built Carta to level the playing field. Our AI does the heavy lifting — tracking prices, verifying deals, and surfacing the best options — so you can shop with confidence.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <Heart size={32} className="text-primary mb-4" />
              <p className="text-lg font-semibold text-foreground mb-3">Built with care</p>
              <p className="text-muted-foreground leading-relaxed">
                Every feature in Carta is designed with one question in mind: does this actually help the user make a better decision? If the answer isn&apos;t yes, we don&apos;t ship it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Values</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 flex gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <v.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{v.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Team</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">The people behind Carta</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 text-center group hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {member.avatar}
                </div>
                <p className="text-sm font-semibold text-foreground">{member.name}</p>
                <p className="text-xs text-primary mt-0.5 mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
            Join us on the mission
          </h2>
          <p className="text-muted-foreground mb-8">Start shopping smarter today. It&apos;s free.</p>
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
