"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TrendingUp, AlertCircle, Sparkles, Briefcase, ChevronRight, DollarSign, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSalaryData } from "../providers/SalaryDataProvider";

export default function SalaryImpactPage() {
  const { currentSalary, averageSalary } = useSalaryData();

  const current10Years = currentSalary * 12 * 10;
  const average10Years = averageSalary * 12 * 10;
  const difference = average10Years - current10Years;

  const data = [
    { id: "current", name: "Si tu salario actual se mantiene", value: current10Years, fill: "#9333EA" },
    { id: "average", name: "Salario promedio del mercado", value: average10Years, fill: "#3B82F6" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
          <p className="font-semibold text-gray-600 text-sm mb-1">{payload[0].payload.name}</p>
          <p className="font-black text-2xl" style={{ color: payload[0].payload.fill }}>
            S/{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 w-full bg-gradient-to-r from-secondary to-[#200560] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#EC4899] rounded-full blur-[80px] opacity-40 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#3B82F6] rounded-full blur-[80px] opacity-40 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white font-bold text-sm mb-6 border border-white/20 relative z-10">
          <Clock className="w-4 h-4 text-white/80" />
          Proyección a 10 años
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 relative z-10">
          Tu historia salarial en el tiempo
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto font-medium relative z-10 leading-relaxed">
          La brecha salarial no solo afecta el presente. Impacta tu capacidad de ahorro, inversión y libertad financiera futura.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 w-full mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-border p-8 rounded-[2rem] shadow-lg flex flex-col relative overflow-hidden group hover:border-[#9333EA] transition-colors"
        >
          <div className="w-2 h-full bg-[#9333EA] absolute top-0 left-0" />
          <div className="flex items-center gap-4 mb-6 text-muted-foreground pl-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground">Si tu salario actual se mantiene</span>
          </div>
          <div className="space-y-2 mt-auto pl-4">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Ingresos estimados (10 años)</p>
            <p className="text-4xl md:text-5xl font-black font-heading text-foreground">S/{current10Years.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground pt-4 font-medium">
              Basado en tu salario actual de S/{currentSalary.toLocaleString()}/mes
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 p-8 rounded-[2rem] shadow-lg flex flex-col relative overflow-hidden group hover:border-blue-400 transition-colors"
        >
          <div className="w-2 h-full bg-accent absolute top-0 left-0" />
          <div className="flex items-center gap-4 mb-6 pl-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <TrendingUp className="w-7 h-7 text-accent" />
            </div>
            <span className="font-bold text-lg text-accent">Si recibieras el salario del mercado</span>
          </div>
          <div className="space-y-2 mt-auto pl-4">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Ingresos estimados (10 años)</p>
            <p className="text-4xl md:text-5xl font-black font-heading text-accent">S/{average10Years.toLocaleString()}</p>
            <p className="text-sm text-accent/80 pt-4 font-medium">
              Basado en un mercado de S/{averageSalary.toLocaleString()}/mes
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <DollarSign className="w-64 h-64" />
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barSize={70}>
                <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, "auto"]} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:w-[400px] w-full bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-100 p-8 md:p-10 rounded-[2rem] text-center shadow-inner">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <AlertCircle className="w-10 h-10 text-rose-500" />
            </div>
            <p className="text-rose-800 font-bold uppercase tracking-wider text-sm mb-3">Diferencia acumulada en 10 años</p>
            <p className="text-5xl font-black font-heading text-rose-900">S/{difference.toLocaleString()}</p>
            <p className="mt-4 text-rose-600 font-medium">Este es el costo real de no negociar.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center w-full max-w-2xl text-center bg-gradient-to-r from-primary to-[#FF5EAB] p-10 rounded-[2rem] text-white shadow-[0_0_20px_rgba(255,46,147,0.4)]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl md:text-3xl font-bold font-heading">Tú tienes el poder de cambiar esto.</p>
        </div>

        <Link
          href="/simulator"
          className="w-full h-16 rounded-full bg-white text-primary font-extrabold text-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,46,147,0.4)] hover:scale-105 transition-transform"
        >
          Practicar negociación con IA
          <ChevronRight className="w-6 h-6" />
        </Link>
      </motion.div>
    </div>
  );
}
