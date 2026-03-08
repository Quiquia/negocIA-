import { Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, ShieldAlert, ArrowRight, Play, Sparkles } from "lucide-react";

export function NegotiationStrategy() {
  const strategies = [
    {
      icon: CheckCircle2,
      title: "Preparar tu propuesta de valor",
      description: "Identifica tus logros clave, impacto en resultados y habilidades únicas antes de iniciar la conversación.",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      icon: TrendingUp,
      title: "Definir tu rango salarial objetivo",
      description: "Usa datos del mercado para establecer un rango salarial claro y realista, siempre anclando al alza.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: ShieldAlert,
      title: "Responder con seguridad a objeciones",
      description: "Prepárate para responder con confianza si el empleador intenta negociar a la baja, enfocándote en tu valor.",
      color: "text-[#1E2A38]",
      bg: "bg-[#1E2A38]/10"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4 max-w-5xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-primary font-medium text-sm mb-6 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>Tu plan de acción</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary tracking-tight mb-4">
          Tu estrategia de negociación personalizada
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Tener datos no es suficiente. Estas tres tácticas te ayudarán a llevar la conversación hacia tus objetivos.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 w-full mb-16">
        {strategies.map((strategy, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="bg-card border border-border/60 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group flex flex-col"
          >
            <div className={`w-16 h-16 rounded-2xl ${strategy.bg} flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform`}>
              <strategy.icon className={`w-8 h-8 ${strategy.color}`} />
            </div>
            
            <h3 className="text-xl font-bold font-heading text-primary mb-4 leading-tight">
              {i + 1}. {strategy.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed flex-1">
              {strategy.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-xl mx-auto flex flex-col items-center"
      >
        <Link
          to="/simulator"
          className="w-full h-16 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all"
        >
          <Play className="w-6 h-6 fill-secondary text-secondary" />
          Practicar negociación con IA
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
        <p className="text-sm font-medium text-muted-foreground mt-4 text-center">
          Practicar en un entorno seguro aumenta tus posibilidades de éxito en un 40%.
        </p>
      </motion.div>
    </div>
  );
}