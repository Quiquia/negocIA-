"use client";

import { ChevronDown, Info, Linkedin, Package, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  /** Abierto por defecto: el HTML del servidor coincide con escritorio y evita hidratar vacío. */
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col border-b border-border/50 md:border-none py-4 md:py-0">
      <button
        onClick={() => isMobile && setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full font-bold text-foreground md:cursor-default md:mb-4"
        disabled={!isMobile}
      >
        {title}
        {isMobile && (
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {/* Sin motion aquí: evita estilos inline distintos entre SSR y cliente en el footer. */}
      {(!isMobile || isOpen) && (
        <div className="overflow-hidden md:overflow-visible">
          <div className="flex flex-col gap-4 pt-4 md:pt-0">{children}</div>
        </div>
      )}
    </div>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    {
      label: "Producto",
      path: "/producto",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Cómo funciona",
      path: "/como-funciona",
      icon: <Info className="w-5 h-5" />,
    },
    {
      label: "Sobre nosotros",
      path: "/sobre-nosotros",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white flex flex-col">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-white/50 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={() => {
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2.5 group hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/assets/logo-negocia.png"
                alt="NegocIA+"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[15px] font-medium transition-colors duration-200 relative group py-2 flex items-center gap-1.5 ${
                  pathname === link.path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ease-out ${
                    pathname === link.path
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-4">
            <LanguageSwitcher />
          </div>

          <div className="flex xl:hidden items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-12 h-12 flex items-center justify-center text-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between items-center">
                <span
                  className={`block h-[2px] w-full bg-current rounded-full transition-all duration-[220ms] ease-in-out origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
                />
                <span
                  className={`block h-[2px] w-full bg-current rounded-full transition-all duration-[220ms] ease-in-out ${isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"}`}
                />
                <span
                  className={`block h-[2px] w-full bg-current rounded-full transition-all duration-[220ms] ease-in-out origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-0 top-20 z-40 bg-black/25 backdrop-blur-sm xl:hidden cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 right-0 z-40 w-full md:w-[75%] h-screen max-h-[calc(100vh-5rem)] bg-background shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col xl:hidden overflow-y-auto border-t border-border/50"
            >
              <div className="h-auto p-6 sm:p-8 flex flex-col">
                <nav className="flex flex-col gap-3 sm:gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-4 p-4 rounded-xl text-[18px] md:text-[20px] font-medium transition-all duration-150 active:scale-[0.98] group relative overflow-hidden ${
                        pathname === link.path
                          ? "bg-primary/5 text-primary font-bold shadow-sm border border-primary/10"
                          : "text-foreground hover:bg-muted/40 hover:text-primary hover:shadow-sm"
                      }`}
                    >
                      <span
                        className={`${pathname === link.path ? "text-primary" : "text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-transform duration-150"}`}
                      >
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main
        className={`relative ${
          pathname === "/simulator" || pathname === "/"
            ? "w-full px-0 py-0 flex flex-col"
            : "max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        }`}
      >
        <div
          key={pathname}
          className={
            pathname === "/simulator"
              ? "flex-1 flex flex-col h-[calc(100vh-4rem)]"
              : pathname === "/"
                ? "min-h-[calc(100vh-4rem)]"
                : "min-h-[calc(100vh-14rem)]"
          }
        >
          {children}
        </div>
      </main>

      {pathname !== "/simulator" && (
        <footer className="border-t border-border bg-white mt-auto pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col pr-0 lg:pr-8 border-b border-border/50 md:border-none pb-8 md:pb-0">
                <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                  <Image
                    src="/assets/logo-negocia.png"
                    alt="NegocIA+"
                    width={100}
                    height={40}
                  />
                </Link>
              
              </div>

              <FooterSection title="Producto">
                <Link
                  href="/simulator"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 md:py-0"
                >
                  Simulador de negociación
                </Link>
                <Link
                  href="/salary-input"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 md:py-0"
                >
                  Análisis salarial
                </Link>
                <Link
                  href="/como-funciona"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 md:py-0"
                >
                  Cómo funciona
                </Link>
              </FooterSection>

              <FooterSection title="Contacto">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-1 md:py-0"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="mailto:hola@negociaplus.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-1 md:py-0"
                >
                  Email
                </a>
              </FooterSection>
            </div>

            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center md:items-start gap-1">
                <p className="text-sm font-medium text-muted-foreground text-center md:text-left">
                  © 2026 NegocIA+
                </p>
                <p className="text-xs font-medium text-muted-foreground/80 text-center md:text-left">
                  Empoderando a mujeres en tecnología con inteligencia salarial
                  basada en datos.
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-muted-foreground">
                <a
                  href="#"
                  className="hover:text-primary transition-colors p-2 md:p-0"
                >
                  Política de Privacidad
                </a>
                <a
                  href="#"
                  className="hover:text-primary transition-colors p-2 md:p-0"
                >
                  Términos de Servicio
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
