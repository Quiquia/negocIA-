"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { TrendingUp, RefreshCw, AlertCircle, Database, LineChart as ChartIcon, Code2, Globe2, Briefcase, Sparkles } from 'lucide-react';

const salaryData = [
  { level: 'Junior', Peru: 1200, Colombia: 1300 },
  { level: 'Mid', Peru: 2100, Colombia: 2300 },
  { level: 'Senior', Peru: 3400, Colombia: 3600 },
];

const trendData = [
  { year: '2024', salary: 2800 },
  { year: '2025', salary: 3200 },
  { year: '2026', salary: 3800 },
];

const techRanking = [
  { name: 'React', growth: '+18%', icon: Code2 },
  { name: 'Next.js', growth: '+24%', icon: Globe2 },
  { name: 'TypeScript', growth: '+20%', icon: Database },
  { name: 'Vue', growth: '+12%', icon: Code2 },
  { name: 'Angular', growth: '+8%', icon: Globe2 },
];

function AnimatedCounter({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count}</>;
}

export function MarketIntelligence() {
  const [activeTab, setActiveTab] = useState('latam');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[#080B1A] relative z-20 overflow-hidden text-white font-sans">
      <div className="absolute top-40 left-0 w-96 h-96 bg-[#FF2E93]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-[#4361EE]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#F1E9FF]"
          >
            <span className={`w-2 h-2 rounded-full bg-[#FF2E93] ${isLive ? 'animate-pulse' : ''}`} />
            Datos actualizados recientemente
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
            La brecha salarial en tecnología aún existe
          </h2>

          <div className="relative p-10 md:p-16 w-full max-w-4xl mx-auto bg-gradient-to-br from-[#3A0CA3]/20 to-[#FF2E93]/10 border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <AlertCircle className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left flex-1">
                <p className="text-lg md:text-xl text-[#F1E9FF]/80 font-medium mb-2">Brecha salarial estimada para mujeres en tecnología en LATAM</p>
                <p className="text-[#F1E9FF]/60 text-sm">Basado en datos de mercado actuales</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-7xl md:text-8xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#4361EE] drop-shadow-lg">
                  <AnimatedCounter end={17} />%
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xl md:text-2xl font-medium text-white text-center">
                <span className="text-[#FF2E93] font-bold">&quot;En tecnología, las mujeres pueden ganar hasta 17% menos</span> <br className="hidden md:block" />
                que sus colegas hombres en roles similares.&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
              Inteligencia salarial del mercado tecnológico
            </h2>
            <p className="text-xl text-[#F1E9FF]/70">
              Datos reales para tomar mejores decisiones profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                    <ChartIcon className="w-6 h-6 text-[#4361EE]" />
                    Frontend Developer Salary Analysis
                  </h3>
                  <p className="text-[#F1E9FF]/60 mt-1">Comparativa por nivel de experiencia (USD)</p>
                </div>
                <div className="flex items-center gap-2 bg-[#3A0CA3]/30 p-1.5 rounded-lg border border-[#4361EE]/30">
                  <button className="px-4 py-1.5 text-sm font-medium bg-[#4361EE] text-white rounded-md shadow-lg">LATAM</button>
                  <button className="px-4 py-1.5 text-sm font-medium text-[#F1E9FF]/60 hover:text-white transition-colors">Global</button>
                </div>
              </div>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart id="market-salary-bar" data={salaryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} accessibilityLayer={false}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis key="xaxis" dataKey="level" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.7)'}} axisLine={false} tickLine={false} />
                    <YAxis key="yaxis" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.7)'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      key="tooltip"
                      cursor={{fill: 'rgba(255,255,255,0.02)'}}
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Bar key="bar-peru" dataKey="Peru" name="Perú" fill="#4361EE" radius={[4, 4, 0, 0]} animationDuration={2000} />
                    <Bar key="bar-colombia" dataKey="Colombia" name="Colombia" fill="#FF2E93" radius={[4, 4, 0, 0]} animationDuration={2000} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#FF2E93]" />
                  Crecimiento salarial
                </h3>
                <p className="text-[#F1E9FF]/60 text-sm mt-1">Tendencia últimos 3 años</p>
              </div>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart id="market-trend-area" data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} accessibilityLayer={false}>
                    <defs key="defs">
                      <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4361EE" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#4361EE" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis key="xaxis" dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.7)', fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip
                      key="tooltip"
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      formatter={(value: number) => [`$${value}`, 'Salario Promedio']}
                    />
                    <Area key="area" type="monotone" dataKey="salary" stroke="#4361EE" strokeWidth={3} fillOpacity={1} fill="url(#colorSalary)" animationDuration={2000} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-[#4361EE]/10 border border-[#4361EE]/20 rounded-xl">
                <p className="text-sm text-white/90">
                  <span className="font-bold text-[#4361EE]">El salario promedio ha crecido 21%</span> en los últimos 3 años en roles tech.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-[#3A0CA3]" />
                  Modalidad de trabajo
                </h3>
                <p className="text-[#F1E9FF]/60 text-sm mt-1">Salario promedio por modalidad</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#FF2E93]/50 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2E93]/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <p className="text-sm text-white/60 mb-1 relative z-10">Full-time (Planilla)</p>
                  <p className="text-2xl font-bold text-white relative z-10">$3,200 <span className="text-sm font-normal text-white/50">USD/mes</span></p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-[#4361EE]/40 relative overflow-hidden group hover:border-[#4361EE]/80 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#4361EE]/20 rounded-full blur-2xl -mr-10 -mt-10" />
                  <p className="text-sm text-[#4361EE] font-medium mb-1 relative z-10">Freelance</p>
                  <p className="text-2xl font-bold text-white relative z-10">$4,100 <span className="text-sm font-normal text-white/50">USD/mes</span></p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-[#FF2E93]/20 rounded-md shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-[#FF2E93]" />
                </div>
                <p className="text-sm text-[#F1E9FF]/80">
                  Freelance Frontend Developers pueden ganar hasta <span className="font-bold text-white">28% más</span> por proyecto.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#3A0CA3]/20 to-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-[#FF2E93]" />
                    Tecnologías mejor pagadas en Frontend
                  </h3>
                  <p className="text-[#F1E9FF]/60 mt-1">Ranking basado en demanda y compensación actual</p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4361EE]/20 border border-[#4361EE]/30 text-[#4361EE] text-sm font-medium">
                  <RefreshCw className={`w-3 h-3 ${isLive ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                  Demanda +18% últimos 12 meses
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {techRanking.map((tech, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl -mr-8 -mt-8 transition-opacity ${i === 0 || i === 1 ? 'bg-[#FF2E93]/30 opacity-100' : 'bg-[#4361EE]/20 opacity-0 group-hover:opacity-100'}`} />
                    <div className="w-12 h-12 rounded-full bg-black/30 border border-white/10 flex items-center justify-center relative z-10 shadow-inner">
                      <span className="font-bold text-white/50 absolute -top-2 -left-2 text-xs">#{i+1}</span>
                      <tech.icon className={`w-5 h-5 ${i === 0 ? 'text-[#FF2E93]' : i === 1 ? 'text-[#4361EE]' : 'text-white/70'}`} />
                    </div>
                    <div className="relative z-10">
                      <p className="font-bold text-white mb-1">{tech.name}</p>
                      <p className="text-xs font-medium text-green-400">{tech.growth} demanda</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center text-center mt-4 space-y-2">
            <p className="text-xs text-[#F1E9FF]/50">* Análisis salarial personalizado basado en múltiples factores clave:</p>
            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-[#F1E9FF]/40">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#FF2E93]"></span>Datos del mercado tecnológico</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#4361EE]"></span>Nivel de experiencia</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#FF2E93]"></span>Stack tecnológico</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#4361EE]"></span>Ubicación geográfica</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left text-sm text-[#F1E9FF]/40 border-t border-white/5">
            <span className="font-semibold uppercase tracking-wider text-white/50">Fuentes de datos:</span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
              <span className="hover:text-white/70 transition-colors cursor-default">Stack Overflow Developer Survey</span>
              <span className="hidden md:inline">•</span>
              <span className="hover:text-white/70 transition-colors cursor-default">Glassdoor Market Reports</span>
              <span className="hidden md:inline">•</span>
              <span className="hover:text-white/70 transition-colors cursor-default">GitHub Developer Trends</span>
              <span className="hidden md:inline">•</span>
              <span className="hover:text-white/70 transition-colors cursor-default">LATAM Tech Salary Studies</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1 text-[#FF2E93]/80 font-medium">
                <Sparkles className="w-3 h-3" />
                Aggregated NegocIA+ Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
