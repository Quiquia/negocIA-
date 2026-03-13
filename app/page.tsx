"use client";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Lock,
  MapPin,
  Monitor,
  Briefcase,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HeroSalaryForm } from "./components/HeroSalaryForm";
import { MarketIntelligence } from "./components/MarketIntelligence";
import { ProductExpansion } from "./components/ProductExpansion";

// Particle component for subtle hero animation
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const COMPARISON_PROFILES = [
  {
    role: "Frontend Developer",
    icon: Monitor,
    salaryAvg: "$3,800 USD",
    gap: "+18% por especialización React",
    region: "LatAm (Remoto)",
  },
  {
    role: "Backend Developer",
    icon: Search,
    salaryAvg: "$4,500 USD",
    gap: "+22% por arquitectura cloud",
    region: "Remoto Latinoamérica",
  },
  {
    role: "Data Analyst",
    icon: BarChart3,
    salaryAvg: "$3,200 USD",
    gap: "+15% por visualización avanzada",
    region: "Colombia & México",
  },
  {
    role: "UX Designer",
    icon: Settings,
    salaryAvg: "$3,500 USD",
    gap: "+20% por research UX",
    region: "Startups (Global)",
  },
  {
    role: "Product Manager",
    icon: Briefcase,
    salaryAvg: "$4,200 USD",
    gap: "+30% por liderazgo técnico",
    region: "Global (Startups)",
  },
];

export default function Home() {
  const router = useRouter();
  const [activeProfile, setActiveProfile] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProfile((prev) => (prev + 1) % COMPARISON_PROFILES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAnalyzeClick = () => {
    setIsNavigating(true);
    router.push("/salary-input");
  };

  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">
      {/* ===== 1. Hero Section ===== */}
      <section className="relative w-full pt-20 pb-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-br from-secondary via-accent/80 to-secondary text-white min-h-[90vh] flex items-center">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none mix-blend-screen" />
        <Particles />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          {/* Left: Text */}
          <div className="flex flex-col gap-8 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-[1.1] tracking-tight drop-shadow-lg"
            >
              ¿Te están pagando lo que realmente vales en tecnología?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-lg"
            >
              NegocIA+ ayuda a mujeres en tecnología a analizar su salario con
              datos reales del mercado y negociar con confianza.
            </motion.p>

            {/* Social proof badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {[
                {
                  icon: CheckCircle2,
                  text: "+5,000 análisis salariales realizados",
                },
                {
                  icon: BarChart3,
                  text: "Datos reales del mercado tecnológico",
                },
                {
                  icon: Users,
                  text: "Plataforma diseñada para mujeres en tecnología",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-white/80 text-sm font-medium"
                >
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex"
            >
              <Link
                href="/salary-input"
                className="inline-flex h-16 items-center justify-center gap-3 px-10 rounded-full bg-gradient-to-r from-primary to-[#FF5EAB] text-white font-extrabold text-lg shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:scale-105 transition-all"
              >
                Analizar mi salario
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Floating elements + Form */}
          <div className="flex flex-col items-center lg:items-end gap-5 relative">
            {/* Floating decorative elements */}
            <div className="hidden lg:block absolute -top-8 -left-16 z-20">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg"
              >
                <TrendingUp className="w-4 h-4 text-green-400" />
                <div className="text-xs">
                  <p className="font-bold text-white">Demanda de mercado</p>
                  <p className="text-green-400 font-semibold">
                    +15% este mes
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="hidden lg:block absolute -top-4 -right-8 z-20">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg"
              >
                <Target className="w-4 h-4 text-primary" />
                <div className="text-xs">
                  <p className="font-bold text-white">Brecha salarial</p>
                  <p className="text-primary font-semibold">Identificada</p>
                </div>
              </motion.div>
            </div>

            {/* Trust badges above form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {[
                { icon: Lock, text: "100% confidencial" },
                { icon: Sparkles, text: "Creado para mujeres en tech" },
                { icon: CheckCircle2, text: "Gratis y sin registro" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-white/60 text-xs font-medium"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            <HeroSalaryForm />

            {/* CTA on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:hidden w-full max-w-md"
            >
              <Link
                href="/salary-input"
                className="text-xs md:text-lg inline-flex h-16 w-full items-center justify-center gap-3 px-10 rounded-full bg-gradient-to-r from-primary to-[#FF5EAB] text-white font-extrabold shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:scale-105 transition-all"
              >
                Analizar mi salario
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. Social Proof Bar ===== */}
      <section className="w-full py-6 px-6 md:px-12 lg:px-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center -space-x-3">
            {[
              "https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?w=80&h=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1573164574001-518958d9baa2?w=80&h=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Usuaria"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">
              +5k
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground text-center sm:text-left">
            <span className="font-semibold text-foreground">
              Más de 5,000 mujeres en tecnología
            </span>{" "}
            ya han analizado su salario con NegocIA+
          </p>
        </div>
      </section>

      {/* ===== 3. Narrative Section ===== */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 mb-6">
            <Users className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-6">
            Nuestro propósito: Cerrar la brecha salarial
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            En Latinoamérica, las mujeres en tecnología ganan en promedio un 20%
            menos que sus pares masculinos por el mismo trabajo. NegocIA+ existe
            para cambiar eso, brindándote datos reales, herramientas de
            negociación y la confianza que necesitas para pedir lo que mereces.
          </p>
        </motion.div>
      </section>

      {/* ===== 4. Market Intelligence ===== */}
      <MarketIntelligence />

      {/* ===== 5. Comparaciones Reales Section ===== */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading mb-4">
              Comparaciones reales en tecnología
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Explora cómo otras mujeres en tecnología están posicionando su salario.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
            {/* Role selector buttons */}
            <div className="flex flex-col gap-2.5">
              {COMPARISON_PROFILES.map((profile, i) => {
                const Icon = profile.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveProfile(i)}
                    className={`flex items-center gap-3.5 text-left px-5 py-4 rounded-xl font-semibold transition-all text-sm md:text-base ${
                      activeProfile === i
                        ? "bg-[#FF2E93]/15 border border-[#FF2E93]/40 text-white shadow-[0_0_20px_rgba(255,46,147,0.15)]"
                        : "bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white/80 border border-white/[0.06]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        activeProfile === i
                          ? "bg-[#FF2E93]/20 text-[#FF2E93]"
                          : "bg-white/[0.06] text-white/40"
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="flex-1">{profile.role}</span>
                    {activeProfile === i && (
                      <span className="w-2 h-2 rounded-full bg-[#FF2E93] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic insight card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProfile}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-5"
              >
                {/* AI badge */}
                <div className="flex">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-medium text-white/80">
                    <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                    Análisis de Mercado AI
                  </div>
                </div>

                {/* Salary & Gap cards */}
                <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-4">
                  {/* Salary card */}
                  <div className="bg-[#3A0CA3]/30 border border-[#3A0CA3]/40 rounded-xl p-5">
                    <p className="text-xs font-semibold text-white/50 mb-1.5">
                      Salario promedio analizado
                    </p>
                    <p className="text-2xl md:text-3xl font-black font-heading text-white">
                      {COMPARISON_PROFILES[activeProfile].salaryAvg}
                    </p>
                  </div>

                  {/* Gap card */}
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5">
                    <p className="text-xs font-semibold text-white/50 mb-1.5 flex items-center gap-1.5">
                      <CircleAlert className="w-3.5 h-3.5 text-white/40" />
                      Brecha salarial detectada
                    </p>
                    <p className="text-lg md:text-xl font-bold font-heading text-[#FF2E93] leading-tight">
                      {COMPARISON_PROFILES[activeProfile].gap}
                    </p>
                  </div>
                </div>

                {/* Region card */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4361EE]/20 border border-[#4361EE]/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#4361EE]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/50">
                      Región con mayor crecimiento
                    </p>
                    <p className="text-base font-bold text-white">
                      {COMPARISON_PROFILES[activeProfile].region}
                    </p>
                  </div>
                </div>

                {/* CTA button */}
                <button
                  onClick={handleAnalyzeClick}
                  disabled={isNavigating}
                  className="w-full h-13 flex items-center justify-center gap-2 rounded-full bg-white/[0.06] border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isNavigating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Cargando...
                    </>
                  ) : (
                    <>
                      Analizar mi perfil específico
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== 6. Product Expansion ===== */}
      <ProductExpansion />

      {/* ===== 7. CTA Bottom ===== */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-[#2A0845] to-secondary" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-heading mb-8">
            Toma el control de tu futuro hoy
          </h2>
          <Link
            href="/salary-input"
            className="inline-flex h-16 items-center justify-center gap-3 px-12 rounded-full bg-primary text-white font-extrabold text-xl shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:scale-105 transition-transform"
          >
            Comenzar mi análisis gratuito
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
