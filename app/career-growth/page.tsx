"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Star, Code, Briefcase, TrendingUp, Building2, Laptop } from "lucide-react";

export default function CareerGrowthPage() {
  const recommendations = [
    {
      icon: <Code className="w-6 h-6 text-primary" />,
      title: "Mejorar habilidades técnicas",
      description: "Aprender herramientas avanzadas en tu área puede aumentar significativamente tu valor en el mercado.",
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Desarrollar liderazgo",
      description: "Profesionales en cargos senior suelen demostrar habilidades de liderazgo y toma de decisiones.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Expandir experiencia profesional",
      description: "Participar en proyectos más complejos o liderar iniciativas puede acelerar tu crecimiento salarial.",
    },
  ];

  const paths = [
    {
      icon: <Building2 className="w-7 h-7 text-accent" />,
      title: "Crecimiento dentro de una empresa",
      description: "Para avanzar hacia un puesto senior en tu área podrías desarrollar habilidades en gestión de proyectos y liderazgo.",
    },
    {
      icon: <Laptop className="w-7 h-7 text-accent" />,
      title: "Trabajo freelance",
      description: "Si deseas trabajar como freelance, podrías fortalecer tu portafolio y habilidades de negociación con clientes.",
    },
  ];

  return (
    <div className="flex flex-col py-12 px-4 max-w-5xl mx-auto w-full">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center p-3 bg-secondary/30 rounded-2xl mb-6 text-primary">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary tracking-tight mb-4">
          Cómo aumentar tu potencial salarial
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Basado en tu perfil, estas acciones podrían ayudarte a aumentar tus ingresos de manera estratégica.
        </p>
      </motion.div>

      <div className="space-y-12">
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 hover:shadow-lg hover:border-secondary transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center mb-6">
                {rec.icon}
              </div>
              <h3 className="text-xl font-bold text-primary font-heading mb-3">{rec.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{rec.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <TrendingUp className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary font-heading">Tus caminos de crecimiento</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {paths.map((path, i) => (
              <div key={i} className="bg-secondary text-white rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    {path.icon}
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-4 text-secondary">{path.title}</h3>
                  <p className="text-white/80 leading-relaxed">{path.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="/negotiation-strategy"
            className="w-full max-w-md h-16 rounded-full bg-accent text-accent-foreground font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 transition-all"
          >
            Crear mi estrategia de negociación
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
