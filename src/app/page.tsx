'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/sections/hero';
import { BentoShowcase } from '@/components/sections/bento-showcase';
import { FeaturesSection } from '@/components/sections/features';
import { Testimonials } from '@/components/sections/testimonials';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <Hero />
      <BentoShowcase />
      <FeaturesSection />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Ready to shop smarter?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of shoppers saving money with Carta every day.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold gap-2 shadow-lg shadow-primary/20">
                Get started for free <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
