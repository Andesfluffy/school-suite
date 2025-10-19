import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Nav from "@/components/Nav";
// ThemeMenu removed: single vibrant theme only
import ToastProvider from "@/components/ToastProvider";
import Link from "next/link";
import AppFrame from "@/components/AppFrame";
import TopProgress from "@/components/TopProgress";
import CommandPalette from "@/components/CommandPalette";
import { AuthProvider } from "@/components/AuthProvider";
import UserMenu from "@/components/UserMenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Brand-Stone School Suite",
  description: "Student and staff records, academics, events, and financials",
};

export const viewport: Viewport = {
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
        <AuthProvider>
          <ToastProvider>
            <TopProgress />
            <a className="skip-link" href="#content">
              Skip to content
            </a>

            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1220eb] backdrop-blur">
              <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                  href="/"
                  aria-label="Go to homepage"
                  className="group flex min-w-0 items-center gap-3 rounded-full px-2.5 py-1.5 text-white transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.svg"
                    alt="Brand-Stone logo"
                    className="h-9 w-9 rounded-full border border-white/20 bg-black/50 p-1"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold tracking-tight">Brand-Stone</span>
                    <span className="text-xs font-medium text-white/60">School Suite</span>
                  </div>
                </Link>

                <div className="hidden flex-1 justify-center md:flex">
                  <Nav />
                </div>

                <div className="flex flex-1 items-center justify-end gap-3 text-white/80">
                  <div className="md:hidden">
                    <Nav />
                  </div>
                  <UserMenu />
                </div>
              </div>
            </header>

            <main
              id="content"
              className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in"
            >
              <AppFrame>{children}</AppFrame>
            </main>

            <CommandPalette />

            <footer className="border-t border-white/10 bg-[#0b1324]">
              <div className="container flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
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
