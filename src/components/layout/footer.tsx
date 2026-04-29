import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

const LINKS = {
  Product: [
    { name: 'Features', href: '/features' },
    { name: 'How it works', href: '/how-it-works' },
    { name: 'Pricing', href: '#' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  Legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background group-hover:bg-primary transition-colors">
                <ShoppingBag size={16} />
              </div>
              <span className="text-lg font-bold tracking-tight">Carta</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your AI-powered shopping agent. Find the best deals, compare products, and save smarter.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Carta. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
