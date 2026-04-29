import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/store-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carta | AI-Powered Personal Shopping Agent",
  description: "Your autonomous buying agent. Search, compare, and save smarter with Carta AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${plusJakarta.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
          <StoreProvider>
            {children}
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
