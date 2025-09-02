import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Nav from "@/components/Nav";
// ThemeMenu removed: single vibrant theme only
import ToastProvider from "@/components/ToastProvider";
import Link from "next/link";
import AppFrame from "@/components/AppFrame";
import TopProgress from "@/components/TopProgress";
import CommandPalette from "@/components/CommandPalette";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Brand‑Stone School Suite",
  description: "Student and staff records, academics, events, and financials",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DC143C" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <ToastProvider>
        <a className="skip-link" href="#content">Skip to content</a>
        <header className="sticky top-0 z-40 text-white">
          <div className="glass border-b border-white/10">
          <TopProgress />
          <div className="container h-14 flex items-center justify-between gap-4">
            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 min-w-0">
              {/* Place your logo file at public/logo.png */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Brand‑Stone logo" className="h-7 w-7 rounded shrink-0" />
              <div className="font-display text-lg font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">Brand‑Stone School Suite</div>
            </Link>
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl">
              <input placeholder="Search (Ctrl/Cmd + K)" className="w-full bg-white/10 text-white placeholder-white/70 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/60" />
            </div>
            <div className="flex items-center gap-2">
              <Nav />
            </div>
          </div>
          </div>
        </header>
        <main id="content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          <AppFrame>{children}</AppFrame>
        </main>
        <CommandPalette />
        <footer className="border-t border-white/10 bg-[#0b0f18]">
          <div className="container py-6 text-sm text-white/70 flex items-center justify-between">
            <span>© {new Date().getFullYear()} School Suite</span>
            <span>Made with Next.js + Prisma</span>
          </div>
        </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
