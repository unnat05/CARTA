'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Search, Scale, History,
  Settings, Bell, ShoppingBag, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Search, label: 'Search', href: '/dashboard/search' },
  { icon: Scale, label: 'Compare', href: '/dashboard/comparison' },
  { icon: History, label: 'History', href: '/dashboard/history' },
  { icon: Bell, label: 'Alerts', href: '/dashboard/alerts' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      className="h-screen bg-card border-r border-border flex flex-col sticky top-0 overflow-hidden shrink-0 z-40"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border shrink-0">
        <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background shrink-0">
          <ShoppingBag size={16} />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-base font-bold tracking-tight text-foreground whitespace-nowrap"
          >
            Carta
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative cursor-pointer',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
                {/* Tooltip */}
                {collapsed && (
                  <div className="absolute left-14 bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User + Collapse */}
      <div className="px-2 py-4 border-t border-border shrink-0 space-y-2">
        <div className={cn('flex items-center gap-3 px-3 py-2', collapsed && 'justify-center')}>
          <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-7 h-7' } }} />
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
              <p className="text-xs font-semibold text-foreground truncate">My Account</p>
            </motion.div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-xs"
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </motion.aside>
  );
};
