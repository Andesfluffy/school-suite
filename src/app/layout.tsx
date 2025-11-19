import "./globals.css";
import type { Metadata, Viewport } from "next";
// ThemeMenu removed: single vibrant theme only
import ToastProvider from "@/components/ToastProvider";
import AppFrame from "@/components/AppFrame";
import TopProgress from "@/components/TopProgress";
import CommandPalette from "@/components/CommandPalette";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Brand-Stone School Suite",
  description: "Student and staff records, academics, events, and financials",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ce7b91" },
    { media: "(prefers-color-scheme: dark)", color: "#1a281f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <TopProgress />
            <a className="skip-link" href="#content">
              Skip to content
            </a>

            <main id="content" className="flex-1">
              <AppFrame>{children}</AppFrame>
            </main>

            <CommandPalette />

            <footer className="border-t border-[var(--border)] bg-white/80">
              <div className="container flex flex-col gap-2 py-6 text-sm text-[var(--slate-600)] sm:flex-row sm:items-center sm:justify-between">
                <span>© {new Date().getFullYear()} School Suite</span>
                <span>Designed for clarity · Powered by Next.js + Prisma</span>
              </div>
            </footer>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
