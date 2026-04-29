'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Features', href: '/features' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'About', href: '/about' },
];

export const Navbar = () => {
  const { isSignedIn } = useUser();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    setHidden(latest > prev && latest > 100);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-6 transition-all duration-300',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300',
            scrolled
              ? 'bg-white/80 backdrop-blur-xl border border-border shadow-sm'
              : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background group-hover:bg-primary transition-colors duration-200">
              <ShoppingBag size={16} />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Carta
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-sm font-medium">
                    Dashboard
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: { userButtonAvatarBox: 'w-8 h-8' },
                  }}
                />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="text-sm font-medium">
                    Sign in
                  </Button>
                </SignInButton>
                <Link href="/sign-up">
                  <Button size="sm" className="text-sm font-medium rounded-xl">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
