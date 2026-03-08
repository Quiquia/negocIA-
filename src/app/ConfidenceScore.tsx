import { Link } from "react-router";
import { motion } from "motion/react";
import { Download, RotateCcw, Trophy, Target, MessageSquare, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";

export function ConfidenceScore() {
  const scores = [
    { label: "Confianza al negociar", score: 85, icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
    { label: "Claridad al comunicar valor", score: 78, icon: MessageSquare, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Posicionamiento salarial", score: 88, icon: Target, color: "text-accent", bg: "bg-accent/10" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto w-full min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full bg-white border border-border rounded-[3rem] p-8 md:p-14 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
        
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-[#FF5EAB] rounded-3xl mb-8 shadow-[0_0_20px_rgba(255,46,147,0.3)] rotate-3">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 mb-4 tracking-tight">
            Tu nivel de preparación para negociar
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto font-medium">
            Basado en tu simulación y análisis, este es tu progreso actual para conseguir el salario que mereces.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center justify-center mb-12 relative z-10">
          {/* Main Score */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col items-center justify-center w-56 h-56 rounded-full bg-white shadow-xl border border-slate-100"
          >
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <motion.circle 
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: "230 1000" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round" 
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF2E93" />
                  <stop offset="100%" stopColor="#4361EE" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-6xl font-black font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">82%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 text-center leading-tight">Preparada</span>
          </motion.div>

          {/* Sub Scores */}
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {scores.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-bold text-slate-700">{item.label}</span>
                </div>
                <span className="font-black text-2xl font-heading text-slate-900">{item.score}%</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-primary/5 rounded-[2rem] p-8 mb-12 flex items-start gap-4 max-w-2xl mx-auto border border-primary/10 shadow-inner"
        >
          <div className="bg-white p-2 rounded-full shrink-0 shadow-sm">
             <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-secondary font-bold text-lg leading-relaxed">
            Con datos claros y práctica, estás mucho más preparada para negociar el salario que mereces. Recuerda que tu valor es real y tienes el poder de demostrarlo.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
        >
          <button className="w-full sm:w-auto h-16 px-8 rounded-full bg-gradient-to-r from-primary to-accent text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,46,147,0.4)] hover:scale-105 transition-transform">
            <Download className="w-6 h-6" />
            Descargar mi plan de negociación
          </button>
          <Link 
            to="/simulator"
            className="w-full sm:w-auto h-16 px-8 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-extrabold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
            Volver a practicar
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}