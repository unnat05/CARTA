'use client';

import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { AiAssistant } from '@/components/ai/ai-assistant';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
          {children}
        </div>
      </main>
      <AiAssistant />
    </div>
  );
}
