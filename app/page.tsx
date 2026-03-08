"use client";

import {
  ArrowRight,
  Bot,
  Calculator,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
          {/* Left: Text + CTA */}
          <div className="flex flex-col gap-8 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-primary font-bold text-sm w-fit shadow-[0_0_15px_rgba(255,46,147,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-white">
                Empoderamiento Financiero con IA
              </span>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/salary-input"
                className="inline-flex h-16 items-center justify-center gap-3 px-10 rounded-full bg-gradient-to-r from-primary to-[#FF5EAB] text-white font-extrabold text-lg shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:scale-105 transition-all"
              >
                Analizar mi salario
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              {[
                { icon: Shield, text: "100% confidencial" },
                { icon: Users, text: "Hecho para mujeres en tech" },
                { icon: Star, text: "Gratis y sin registro" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/60 text-sm font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form + CTA on mobile */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <HeroSalaryForm />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:hidden w-full max-w-md"
            >
              <Link
                href="/salary-input"
                className="text-xs md:text-lg inline-flex h-16 w-full items-center justify-center gap-3 px-10 rounded-full bg-gradient-to-r from-primary to-[#FF5EAB] text-white font-extrabold  shadow-[0_0_30px_rgba(255,46,147,0.5)] hover:scale-105 transition-all"
              >
                Analizar mi salario
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Showcase Section */}
      <section className="relative w-full py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#F8F5FF] to-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-4">
              Perfiles como el tuyo ya se están beneficiando
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestra IA analiza miles de datos del mercado para darte insights
              personalizados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {PROFILES.map((profile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onMouseEnter={() => setActiveProfile(i)}
                className={`group relative bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  activeProfile === i
                    ? "border-primary shadow-[0_8px_40px_rgba(255,46,147,0.15)] scale-[1.02]"
                    : "border-transparent shadow-md hover:shadow-lg hover:border-accent/30"
                }`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={profile.image}
                    alt={`${profile.role} en tech`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                      {profile.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* AI Insight */}
                  <div className="flex items-start gap-3 mb-5">
                    <div className="p-2 bg-accent/10 rounded-xl shrink-0">
                      <Bot className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.insight}
                    </p>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Salario objetivo
                      </p>
                      <p className="text-2xl font-black font-heading text-foreground">
                        {profile.salary}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">
                        {profile.increase}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {PROFILES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProfile(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeProfile
                    ? "w-6 bg-primary"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-white relative z-20">
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
                className={`flex flex-col p-10 rounded-[2rem] border shadow-sm transition-all group ${feature.color}`}
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
                <span className="inline-flex items-center gap-2 font-bold text-lg text-primary/40 cursor-default">
                  Próximamente <ArrowRight className="w-5 h-5" />
                </span>
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
