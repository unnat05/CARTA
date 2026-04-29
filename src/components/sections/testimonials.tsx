'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Alex Rivera',
    role: 'Software Engineer',
    text: "Carta found me a deal I'd been waiting months for. The price alert fired at 2am and I grabbed it before anyone else. Saved ₹8,000.",
    avatar: 'AR',
  },
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    text: "The comparison feature is genuinely useful. It doesn't just list specs — it tells you which product actually fits your use case.",
    avatar: 'SC',
  },
  {
    name: 'Marcus Thorne',
    role: 'Entrepreneur',
    text: "I've tried every shopping tool out there. Carta is the only one that feels like it actually understands what I'm looking for.",
    avatar: 'MT',
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            Loved by smart shoppers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-foreground leading-relaxed flex-1">“{t.text}”</p>

              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
