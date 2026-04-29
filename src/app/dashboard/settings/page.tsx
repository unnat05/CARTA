'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  User, Bell, Shield, Palette, Globe,
  ChevronRight, Check, Trash2, LogOut, Moon, Sun, Monitor,
} from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Shield, label: 'Privacy', id: 'privacy' },
  { icon: Palette, label: 'Appearance', id: 'appearance' },
  { icon: Globe, label: 'Region', id: 'region' },
];

type NotifKey = 'priceAlerts' | 'weeklyDigest' | 'newFeatures' | 'aiInsights';
type PrivacyKey = 'saveHistory' | 'personalised' | 'analytics';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn('w-11 h-6 rounded-full transition-colors relative shrink-0', on ? 'bg-primary' : 'bg-muted-foreground/20')}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [active, setActive] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [budget, setBudget] = useState('');

  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    priceAlerts: true, weeklyDigest: true, newFeatures: false, aiInsights: true,
  });

  const [privacy, setPrivacy] = useState<Record<PrivacyKey, boolean>>({
    saveHistory: true, personalised: true, analytics: false,
  });

  const [language, setLanguage] = useState('English (India)');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-2 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all',
                  active === s.id ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <s.icon size={15} />
                  {s.label}
                </div>
                <ChevronRight size={14} className={cn('transition-transform', active === s.id ? 'rotate-90' : 'opacity-30')} />
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-border">
              <button
                onClick={() => signOut(() => router.push('/'))}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/5 transition-all"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6">
                {/* PROFILE */}
                {active === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">Profile</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Update your personal information.</p>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold shrink-0">
                        {user?.firstName?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{user?.fullName || 'Anonymous'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">First name</label>
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-xl h-9 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Last name</label>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-xl h-9 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email</label>
                      <Input value={user?.primaryEmailAddress?.emailAddress || ''} disabled className="rounded-xl h-9 text-sm text-muted-foreground" />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Monthly budget</label>
                      <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. ₹50,000" className="rounded-xl h-9 text-sm" />
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {active === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">Notifications</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Choose what you want to be notified about.</p>
                    </div>
                    <div className="space-y-3">
                      {([
                        { key: 'priceAlerts' as NotifKey, label: 'Price alerts', desc: 'Get notified when a tracked product hits your target price' },
                        { key: 'weeklyDigest' as NotifKey, label: 'Weekly digest', desc: 'A weekly summary of price movements and deals' },
                        { key: 'newFeatures' as NotifKey, label: 'New features', desc: 'Updates about new Carta features and improvements' },
                        { key: 'aiInsights' as NotifKey, label: 'AI insights', desc: 'Personalized buying recommendations from Carta AI' },
                      ]).map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          </div>
                          <Toggle on={notifs[item.key]} onToggle={() => setNotifs((p) => ({ ...p, [item.key]: !p[item.key] }))} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PRIVACY */}
                {active === 'privacy' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">Privacy</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Control your data and privacy settings.</p>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <Shield size={18} className="text-emerald-600 shrink-0" />
                      <p className="text-sm text-emerald-700">Your data is encrypted and never sold to third parties.</p>
                    </div>

                    <div className="space-y-3">
                      {([
                        { key: 'saveHistory' as PrivacyKey, label: 'Save search history', desc: 'Keep a record of your past searches and comparisons' },
                        { key: 'personalised' as PrivacyKey, label: 'Personalized recommendations', desc: 'Allow AI to learn from your behavior to improve suggestions' },
                        { key: 'analytics' as PrivacyKey, label: 'Anonymous analytics', desc: 'Help improve Carta by sharing anonymized usage data' },
                      ]).map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          </div>
                          <Toggle on={privacy[item.key]} onToggle={() => setPrivacy((p) => ({ ...p, [item.key]: !p[item.key] }))} />
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full rounded-xl text-destructive hover:bg-destructive/5 hover:text-destructive gap-2">
                      <Trash2 size={15} /> Delete all my data
                    </Button>
                  </div>
                )}

                {/* APPEARANCE */}
                {active === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">Appearance</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Choose your preferred theme.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'system', label: 'System', icon: Monitor },
                      ] as const).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={cn(
                            'p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all',
                            theme === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80'
                          )}
                        >
                          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', theme === t.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground')}>
                            <t.icon size={18} />
                          </div>
                          <span className={cn('text-xs font-medium', theme === t.id ? 'text-primary' : 'text-muted-foreground')}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* REGION */}
                {active === 'region' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">Region</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Set your language and currency preferences.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-2">Language</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['English (India)', 'Hindi', 'Tamil', 'Telugu'].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setLanguage(lang)}
                              className={cn(
                                'h-10 rounded-xl border text-sm font-medium transition-all text-left px-4',
                                language === lang ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-border/80 hover:text-foreground'
                              )}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-2">Currency</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['₹ INR', '$ USD', '€ EUR'].map((c) => (
                            <button key={c} className="h-10 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-border/80 transition-all px-4 text-left">
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-border flex justify-end">
                  <Button
                    onClick={handleSave}
                    className={cn('rounded-xl gap-2 transition-all', saved && 'bg-emerald-500 hover:bg-emerald-500')}
                  >
                    {saved ? <><Check size={16} /> Saved</> : 'Save changes'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
