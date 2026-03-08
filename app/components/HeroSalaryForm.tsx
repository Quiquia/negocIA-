"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Lock,
  MapPin,
  Briefcase,
  DollarSign,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { getQuickSalaryEstimate, type QuickEstimate } from "./hero-actions";

export function HeroSalaryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<QuickEstimate | null>(null);
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    salary: "",
    experience: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.salary || !formData.experience || !formData.location) return;

    setLocation(formData.location);
    startTransition(async () => {
      const estimate = await getQuickSalaryEstimate({
        role: "Frontend Developer",
        experience: formData.experience,
        location: formData.location,
        currentSalary: Number(formData.salary),
      });
      setResult(estimate);
    });
  };

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full max-w-md bg-[#F1E9FF]/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-[0_10px_40px_rgba(58,12,163,0.3)] relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF2E93]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4361EE]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold font-heading text-[#3A0CA3] mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FF2E93]" />
          Prueba rápida: ¿tu salario está alineado con el mercado?
        </h3>

        <AnimatePresence mode="wait">
          {!result && !isPending ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#4361EE]" />
                  Perfil
                </label>
                <div className="w-full px-4 py-2.5 bg-white/60 border border-[#D1C4E9] rounded-xl text-sm font-medium text-[#0F172A]/70 flex items-center justify-between cursor-not-allowed">
                  Frontend Developer
                  <span className="text-xs bg-[#4361EE]/10 text-[#4361EE] px-2 py-0.5 rounded-full font-bold">
                    Fijado
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#3A0CA3]" />
                    Experiencia
                  </label>
                  <select
                    required
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/50 focus:border-[#FF2E93] transition-all"
                  >
                    <option value="" disabled>
                      Selecciona...
                    </option>
                    <option value="0-1">0-1 años</option>
                    <option value="2-3">2-3 años</option>
                    <option value="4-5">4-5 años</option>
                    <option value="6-8">6-8 años</option>
                    <option value="9+">9+ años</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3A0CA3]" />
                    Ubicación
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/50 focus:border-[#FF2E93] transition-all"
                  >
                    <option value="" disabled>
                      Selecciona...
                    </option>
                    <option value="LatAm">LatAm</option>
                    <option value="Europa">Europa</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="Remoto global">Remoto global</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#0F172A] flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#3A0CA3]" />
                  Salario Mensual Actual (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="Ej: 2200"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className="w-full pl-8 pr-4 py-2.5 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FF2E93]/50 focus:border-[#FF2E93] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#3A0CA3] hover:bg-[#2A0880] text-white rounded-xl font-bold text-sm transition-all shadow-[0_4px_15px_rgba(58,12,163,0.3)] hover:shadow-[0_6px_20px_rgba(58,12,163,0.4)] flex items-center justify-center gap-2"
              >
                Ver estimación rápida
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : isPending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 gap-4"
            >
              <Loader2 className="w-10 h-10 text-[#3A0CA3] animate-spin" />
              <p className="text-sm font-bold text-[#3A0CA3]">
                Analizando tu perfil con IA...
              </p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 bg-white rounded-2xl p-5 border border-[#D1C4E9] shadow-sm"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Tu salario estimado de mercado:
                </p>
                <div className="text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] to-[#3A0CA3]">
                  {fmt(result.min_salary)} – {fmt(result.max_salary)}
                </div>
                <p className="text-xs text-[#4361EE] font-semibold mt-2 bg-[#4361EE]/10 inline-block px-3 py-1 rounded-full">
                  Basado en datos de {location}
                </p>
              </div>

              {/* AI Insight */}
              <div className="flex items-start gap-2 bg-[#F8F5FF] rounded-xl p-3 border border-[#D1C4E9]">
                <TrendingUp className="w-4 h-4 text-[#3A0CA3] mt-0.5 shrink-0" />
                <p className="text-xs text-[#3A0CA3] font-medium leading-relaxed">
                  {result.insight}
                </p>
              </div>

              <button
                onClick={() => router.push("/salary-input")}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#FF2E93] to-[#3A0CA3] hover:scale-[1.02] text-white rounded-xl font-bold text-sm transition-all shadow-[0_4px_15px_rgba(255,46,147,0.3)] flex items-center justify-center gap-2"
              >
                Análisis completo (Gratis)
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
