"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Bot,
  Calculator,
} from "lucide-react";
import { HeroSalaryForm } from "./components/HeroSalaryForm";

export default function Home() {
  const [activeProfile, setActiveProfile] = useState(0);

  const PROFILES = [
    {
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      insight:
        "Tu stack de React y Node.js aumenta tu valor en un +18% en tu región.",
      salary: "$145,000",
      increase: "+25% vs Actual",
    },
    {
      role: "Data Analyst",
      image:
        "https://images.unsplash.com/photo-1752982527498-214487bd9540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      insight:
        "Tu experiencia con Python y SQL tiene alta demanda este trimestre.",
      salary: "$118,000",
      increase: "+18% vs Actual",
    },
    {
      role: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1573164574001-518958d9baa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      insight:
        "Tu especialización en UI/UX y accesibilidad te posiciona en el top 10%.",
      salary: "$132,000",
      increase: "+22% vs Actual",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProfile((prev) => (prev + 1) % PROFILES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-br from-secondary via-accent/80 to-secondary text-white min-h-[90vh] flex items-center">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          <div className="flex flex-col gap-8 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-primary font-bold text-sm w-fit shadow-[0_0_15px_rgba(255,46,147,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-white">Empoderamiento Financiero con IA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading leading-[1.1] tracking-tight drop-shadow-lg"
            >
              Descubre si tu salario refleja realmente tu valor.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-lg"
            >
              NegocIA+ analiza tu perfil profesional, identifica brechas
              salariales y te ayuda a negociar con confianza.
            </motion.p>

            <HeroSalaryForm />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <Link
                href="/salary-input"
                className="inline-flex h-16 items-center justify-center gap-3 px-10 rounded-full bg-gradient-to-r from-primary to-[#FF5EAB] text-white font-extrabold text-lg shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:scale-105 transition-all w-full sm:w-auto"
              >
                Analizar mi salario
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="w-full relative h-[500px] lg:h-[600px] hidden md:flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/40 blur-[100px] rounded-full z-0"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/50 blur-[80px] rounded-full z-0"
            />

            {/* Main Character Image container */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="relative z-10 w-[320px] h-[420px] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(67,97,238,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0A40]/90 via-transparent to-transparent z-10" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProfile}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  src={PROFILES[activeProfile].image}
                  alt={`Confident ${PROFILES[activeProfile].role} in tech`}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>

              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {PROFILES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveProfile(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeProfile
                        ? "w-6 bg-primary"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Element 1: Market Trend Graph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
              className="absolute top-12 -left-12 z-20 w-48"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_0_30px_rgba(67,97,238,0.3)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-accent/30 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    Market Value
                  </span>
                </div>
                <div className="h-16 flex items-end gap-1.5">
                  {[40, 55, 45, 70, 85, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        delay: 1.2 + i * 0.1,
                        duration: 0.6,
                        type: "spring",
                      }}
                      className="flex-1 bg-gradient-to-t from-primary to-accent rounded-sm"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Element 2: Negotiation Insight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: 1.0,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
              className="absolute top-1/2 -right-16 z-20 w-56 transform -translate-y-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_0_30px_rgba(255,46,147,0.3)] relative overflow-hidden"
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div className="p-2 bg-primary/20 rounded-xl shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      AI Insight
                    </h4>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeProfile}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-white/70 leading-relaxed"
                      >
                        {PROFILES[activeProfile].insight}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Element 3: Salary Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
              className="absolute bottom-16 -left-4 z-20"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-[0_0_30px_rgba(58,12,163,0.4)] relative overflow-hidden"
              >
                <p className="text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider relative z-10">
                  Salario Objetivo
                </p>

                <AnimatePresence mode="wait">
                  <div key={activeProfile} className="relative z-10">
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-2xl font-black font-heading text-white"
                    >
                      {PROFILES[activeProfile].salary}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-1 mt-2 text-green-400 text-xs font-bold"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>{PROFILES[activeProfile].increase}</span>
                    </motion.div>
                  </div>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Floating Element 4 */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
              className="absolute top-1/4 right-8 z-0"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full blur-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
              className="absolute bottom-10 right-4 z-20 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeProfile}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-xs font-medium text-white/80 whitespace-nowrap"
                >
                  Perfil: {PROFILES[activeProfile].role}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-white relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
              Datos claros para tu crecimiento profesional
            </h2>
            <p className="text-muted-foreground text-xl">
              Nuestra IA te acompaña en cada paso para cerrar la brecha
              salarial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: "Reality Check",
                desc: "Descubre exactamente dónde se ubica tu salario frente al mercado actual.",
                color: "bg-background border-border",
                iconColor: "text-secondary bg-secondary/10",
                link: "/salary-input",
              },
              {
                icon: TrendingUp,
                title: "Impacto a futuro",
                desc: "Visualiza cuánto dinero dejas sobre la mesa si no negocias hoy mismo.",
                color: "bg-background border-border",
                iconColor: "text-accent bg-accent/10",
                link: "/salary-input",
              },
              {
                icon: Bot,
                title: "Simulador IA",
                desc: "Ensaya tu conversación con tu mánager en un entorno seguro antes de la reunión real.",
                color: "bg-background border-border",
                iconColor: "text-primary bg-primary/10",
                link: "/simulator",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`flex flex-col p-10 rounded-[2rem] border shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group ${feature.color}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm ${feature.iconColor} group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,46,147,0.3)] transition-all`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-1">
                  {feature.desc}
                </p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center gap-2 font-bold text-lg text-primary hover:opacity-70 transition-opacity"
                >
                  Explorar <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action Bottom */}
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
