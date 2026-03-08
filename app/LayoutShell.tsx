"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,46,147,0.3)] group-hover:shadow-[0_0_15px_rgba(255,46,147,0.5)] transition-all group-hover:scale-105">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-foreground tracking-tight">
                NegocIA+
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/salary-input"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Herramientas
            </Link>
          </nav>
        </div>
      </header>

      <main
        className={`relative ${
          pathname === "/simulator" || pathname === "/"
            ? "w-full px-0 py-0 flex flex-col"
            : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={
              pathname === "/simulator"
                ? "flex-1 flex flex-col h-[calc(100vh-4rem)]"
                : pathname === "/"
                  ? "min-h-[calc(100vh-4rem)]"
                  : "min-h-[calc(100vh-14rem)]"
            }
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {pathname !== "/simulator" && (
        <footer className="border-t border-border bg-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              © 2026 NegocIA+. Empoderando mujeres financieramente.
            </p>
            <div className="flex items-center gap-6 text-sm font-bold text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Términos
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
