import { SignIn } from '@clerk/nextjs';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-foreground rounded-xl flex items-center justify-center text-background group-hover:bg-primary transition-colors">
              <ShoppingBag size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Carta</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-foreground hover:bg-primary text-background text-sm normal-case font-medium rounded-xl h-10',
                card: 'bg-transparent shadow-none border-none p-0',
                headerTitle: 'text-xl font-bold text-foreground',
                headerSubtitle: 'text-sm text-muted-foreground',
                footer: 'hidden',
                formFieldInput: 'rounded-xl border-border bg-background text-sm h-10',
                formFieldLabel: 'text-sm font-medium text-foreground',
                identityPreviewText: 'text-sm text-foreground',
                formResendCodeLink: 'text-primary',
                footerActionLink: 'text-primary',
              },
            }}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
