import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, AlertCircle, ArrowRight, ShieldCheck, BarChart3, ChevronRight, Zap, Lightbulb, MapPin, Briefcase, Bot, X, Sparkles, Target, Calculator, MessageSquare, Award, CheckCircle2 } from "lucide-react";

export function RealityCheck() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;
  const [showExitPrompt, setShowExitPrompt] = useState(false);

  // Mock calculation logic based on input
  const currentSalary = state?.profileData?.monthlySalary ? Number(state.profileData.monthlySalary) : 5500;
  const currency = state?.profileData?.currency || "PEN";
  const currencySymbol = currency === "USD" ? "$" : currency === "COP" ? "COL$" : "S/";
  const wantsAiPractice = state?.profileData?.wantsAiPractice || "Sí";
  const role = state?.profileData?.role || "Frontend Developer";
  const seniority = state?.profileData?.seniority || "Mid";
  const city = state?.profileData?.city || "Lima";
  const country = state?.profileData?.country || "Perú";
  const techStack = state?.profileData?.techStack?.join(" / ") || "React / TypeScript";
  
  // Assume a fixed gap for the demo if real numbers aren't passed
  const averageSalary = Math.round(currentSalary * 1.418); // ~23% difference from the top
  const upperSalary = Math.round(averageSalary * 1.15);
  const lowerSalary = Math.round(averageSalary * 0.85);
  const gapPercentage = Math.round(((averageSalary - currentSalary) / averageSalary) * 100);

  const isBelowMarket = currentSalary < lowerSalary;
  const isWithinRange = currentSalary >= lowerSalary && currentSalary <= upperSalary;

  const isJunior = seniority === "Junior" || seniority === "Trainee";
  const isMid = seniority === "Mid";
  const needsNegotiationHelp = state?.profileData?.lastIncrease === "Más de 2 años" || state?.profileData?.lastIncrease === "Nunca he recibido un aumento";

  // Calculate position percentage for the progress bar (0 to 100%)
  const rangeSpan = upperSalary - lowerSalary;
  const positionInRange = currentSalary - lowerSalary;
  // Ensure it stays within visual bounds, but allow showing slightly below or above
  const rawPercentage = (positionInRange / rangeSpan) * 100;
  const clampedPercentage = Math.max(-10, Math.min(110, rawPercentage));
  const markerPosition = `${clampedPercentage}%`;

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      {/* SCREEN HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 w-full"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white mb-6 shadow-lg rotate-3">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4 text-foreground">
          Verificación de la realidad salarial
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium mb-8">
          Analizamos tu perfil y lo comparamos con el mercado tecnológico.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2">
            <Briefcase className="w-4 h-4"/> {role}
          </span>
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2">
            <Award className="w-4 h-4"/> Nivel: {seniority}
          </span>
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2">
            <MapPin className="w-4 h-4"/> Ubicación: {city}, {country}
          </span>
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2">
            <Target className="w-4 h-4"/> Stack principal: {techStack.split(' / ')[0] || "React"}
          </span>
        </div>
      </motion.div>

      {/* SECTION 1 — TU SALARIO VS EL MERCADO */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-white border border-border p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-primary/5 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-primary via-accent to-secondary" />
        
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-12 text-center">
          Tu salario comparado con el mercado
        </h2>

        {/* Salary Bar Visualization */}
        <div className="relative pt-12 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
          
          {/* Labels above the bar */}
          <div className="absolute top-0 left-0 w-full flex justify-between text-sm font-bold text-muted-foreground uppercase tracking-wider px-4 md:px-8">
            <span>Rango menor</span>
            <span>Promedio</span>
            <span>Rango mayor</span>
          </div>

          {/* The Bar */}
          <div className="relative h-6 bg-muted/20 rounded-full w-full overflow-visible shadow-inner">
            {/* Gradient fill representing the "normal" range */}
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20" />
            <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
            
            {/* Average Market Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-10 bg-secondary rounded-full z-10" />
            
            {/* User Salary Marker */}
            <motion.div 
              initial={{ left: "0%" }}
              animate={{ left: markerPosition }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.2, delay: 0.5 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-20"
            >
              <div className="w-8 h-8 rounded-full bg-foreground border-4 border-white shadow-lg flex items-center justify-center relative">
                <div className="absolute -inset-2 bg-foreground/20 rounded-full animate-ping" />
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              
              <div className="absolute top-full mt-4 bg-foreground text-white px-5 py-3 rounded-2xl shadow-xl whitespace-nowrap">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-foreground" />
                <p className="text-xs text-white/70 font-bold uppercase tracking-wider mb-1 text-center">Tu salario actual</p>
                <p className="text-2xl font-black font-heading">{currencySymbol}{currentSalary.toLocaleString()}</p>
              </div>
            </motion.div>
          </div>

          {/* Value labels below the bar */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-lg font-black text-foreground px-4 md:px-8 mt-4">
            <span className="text-muted-foreground">{currencySymbol}{lowerSalary.toLocaleString()}</span>
            <span className="text-secondary">{currencySymbol}{averageSalary.toLocaleString()}</span>
            <span className="text-muted-foreground">{currencySymbol}{upperSalary.toLocaleString()}</span>
          </div>
        </div>

        {/* Dynamic Conclusion Message */}
        <div className="mt-12 text-center">
          {isBelowMarket ? (
            <div className="inline-flex items-center gap-3 bg-rose-50 text-rose-700 px-6 py-4 rounded-2xl border border-rose-200">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="text-lg font-semibold">
                Tu salario está aproximadamente <strong className="font-black">{gapPercentage}% por debajo</strong> del promedio del mercado.
              </p>
            </div>
          ) : isWithinRange ? (
            <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <p className="text-lg font-semibold">
                Tu salario se encuentra <strong className="font-black">dentro del rango esperado</strong> del mercado.
              </p>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 bg-purple-50 text-purple-700 px-6 py-4 rounded-2xl border border-purple-200">
              <Sparkles className="w-6 h-6 shrink-0" />
              <p className="text-lg font-semibold">
                ¡Excelente! Tu salario está <strong className="font-black">por encima del promedio</strong> del mercado.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* SECTION 2 — ¿DE DÓNDE PROVIENEN ESTOS DATOS? */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-muted/20 border border-border p-6 md:p-8 rounded-3xl mb-8"
      >
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" /> ¿De dónde proviene esta estimación?
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-semibold">{country}</span>
          <span className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-semibold">{city}</span>
          <span className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-semibold">{role} {seniority}</span>
          <span className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-semibold">{techStack}</span>
          <span className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-semibold">{state?.profileData?.companyType || "Empresa de tecnología"}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
          Este análisis se basa en datos agregados del mercado tecnológico en {country} y Colombia, considerando perfiles similares al tuyo.
        </p>
      </motion.div>

      {/* SECTION 3 — INSIGHT DE IA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full mb-8"
      >
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6 flex items-center gap-3">
          <Bot className="w-6 h-6 text-primary" /> Lo que detectamos sobre tu perfil
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Lightbulb className="w-6 h-6 text-yellow-500 mb-4" />
            <p className="text-sm font-medium text-foreground leading-relaxed">
              Profesionales con tu nivel de experiencia suelen aumentar su salario significativamente al cambiar de empresa o negociar responsabilidades técnicas más complejas.
            </p>
          </div>
          <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Zap className="w-6 h-6 text-secondary mb-4" />
            <p className="text-sm font-medium text-foreground leading-relaxed">
              El stack {techStack} tiene alta demanda en empresas de producto digital internacionales.
            </p>
          </div>
          <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <TrendingUp className="w-6 h-6 text-emerald-500 mb-4" />
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {isJunior 
                ? "Estás en una excelente posición para comenzar a tomar tickets de mayor impacto y pedir ser promovida a Mid."
                : "Tu nivel actual te posiciona muy cerca de roles Lead o de Arquitectura en ciertos mercados emergentes."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* SECTION 4 — CRECIMIENTO PROFESIONAL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-8 rounded-[2rem] mb-8"
      >
        <h3 className="text-xl font-bold font-heading text-foreground mb-6">
          Cómo podrías aumentar tu valor en el mercado
        </h3>
        <p className="text-muted-foreground font-medium mb-6">
          Para avanzar hacia un rol {seniority === "Junior" ? "Mid" : seniority === "Mid" ? "Senior" : "Lead / Staff"} podrías fortalecer:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Arquitectura Frontend", "Testing automatizado", "Liderazgo técnico", "Performance optimization"].map((skill, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm border border-border/50">
              <span className="font-bold text-sm text-primary">{skill}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SECTION 5 — ALERTA DE NEGOCIACIÓN */}
      {needsNegotiationHelp && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-rose-50 border border-rose-200 p-8 rounded-[2rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-bold text-rose-900">Puede ser un buen momento para renegociar tu salario.</h3>
            </div>
            <p className="text-rose-700 font-medium text-lg">
              Muchas profesionales permanecen años sin renegociar su salario. Esto no significa que tu trabajo valga menos.
            </p>
          </div>
          <button
            onClick={() => navigate("/simulator")}
            className="shrink-0 h-12 px-6 rounded-full bg-primary text-white font-bold hover:opacity-90 transition-colors shadow-lg shadow-primary/30"
          >
            Practicar negociación con IA
          </button>
        </motion.div>
      )}

      {/* SECTION 6 — OPCIONES DE ACCIÓN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full"
      >
        <h3 className="text-2xl font-bold font-heading text-foreground mb-6 text-center md:text-left">
          ¿Qué te gustaría hacer ahora?
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-border rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold font-heading mb-3">Preparar una negociación salarial</h4>
            <p className="text-muted-foreground mb-8 flex-1">
              Practica una conversación con IA para negociar tu salario con más confianza.
            </p>
            <button
              onClick={() => navigate("/simulator")}
              className="w-full h-12 rounded-full bg-primary text-white font-bold hover:-translate-y-0.5 transition-transform"
            >
              Practicar negociación
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-border rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold font-heading mb-3">Explorar oportunidades mejor pagadas</h4>
            <p className="text-muted-foreground mb-8 flex-1">
              Descubre qué rangos salariales ofrecen otras empresas para perfiles como el tuyo.
            </p>
            <Link
              to="/salary-impact"
              state={{ currentSalary, averageSalary }}
              className="w-full h-12 rounded-full bg-muted/20 text-foreground font-bold hover:bg-muted/30 transition-colors flex items-center justify-center"
            >
              Explorar mercado
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-border rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calculator className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold font-heading mb-3">Calcular tarifas como freelance</h4>
            <p className="text-muted-foreground mb-8 flex-1">
              Descubre cuánto podrías cobrar por tus servicios de desarrollo frontend de forma independiente.
            </p>
            <button
              onClick={() => alert("Próximamente")}
              className="w-full h-12 rounded-full bg-muted/20 text-foreground font-bold hover:bg-muted/30 transition-colors flex items-center justify-center"
            >
              Calcular tarifa freelance
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}