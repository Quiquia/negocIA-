"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Send,
  StopCircle,
  Bot,
  Sparkles,
  ChevronLeft,
  Plus,
  History,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  analyzeResponse,
  getManagerResponse,
  generateSuggestions,
  type CoachAnalysis,
  type ProfileContext,
} from "./actions";
import { useSalaryData } from "../providers/SalaryDataProvider";

type Message = {
  id: string;
  role: "ai" | "user" | "coach";
  text?: string;
  scores?: { clarity: number; confidence: number; data: number };
  improvementText?: string;
  improvedResponse?: string;
};

export default function AiNegotiationSimulatorPage() {
  const router = useRouter();
  const { profileData, currentSalary, averageSalary, gapPercentage, setSimulationChat } =
    useSalaryData();

  // Datos del perfil para personalizar
  const currency = profileData?.currency || "PEN";
  const currencySymbol =
    currency === "USD" ? "$" : currency === "COP" ? "COL$" : "S/";
  const role = profileData?.role || "Frontend Developer";
  const seniority = profileData?.seniority || "Mid";
  const techStack =
    profileData?.techStack?.join(", ") || "React, TypeScript";
  const yearsExp = profileData?.yearsExperience || "2-3 años";

  // Formatear salarios para las sugerencias
  const fmtSalary = (n: number) => `${currencySymbol}${n.toLocaleString()}`;
  const targetLow = fmtSalary(averageSalary);
  const targetHigh = fmtSalary(Math.round(averageSalary * 1.1));

  const INITIAL_AI_MESSAGE = `Hola, gracias por reunirte conmigo hoy. Hemos revisado tu perfil como ${role} ${seniority} y estamos muy interesados en que te unas al equipo. Sin embargo, entiendo tu expectativa salarial, pero nuestro presupuesto actual para este rol es más limitado. ¿Podrías considerar un rango menor?`;

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", text: INITIAL_AI_MESSAGE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const profileCtx: ProfileContext | undefined = profileData
    ? {
        role,
        seniority,
        techStack,
        country: profileData.country || "Latinoamérica",
        currentSalary: fmtSalary(currentSalary),
        marketSalary: fmtSalary(averageSalary),
      }
    : undefined;

  // Genera sugerencias con IA basadas en la conversación actual
  const refreshSuggestions = async (msgs: Message[]) => {
    setLoadingSuggestions(true);
    try {
      const history = msgs
        .filter((m) => m.role === "ai" || m.role === "user")
        .map((m) => ({ role: m.role as "ai" | "user", text: m.text! }));
      const newSuggestions = await generateSuggestions(history, profileCtx);
      setSuggestions(newSuggestions);
    } catch {
      setSuggestions([
        "Me gustaría que revisáramos el rango salarial considerando mi experiencia.",
        "Según datos del mercado, mi perfil justifica una compensación más competitiva.",
        "Estoy abierta a explorar beneficios adicionales junto con un ajuste salarial.",
        "Valoro la oportunidad, y me gustaría encontrar un punto medio justo.",
      ]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Cargar sugerencias iniciales al montar
  useEffect(() => {
    refreshSuggestions(messages);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Build OpenAI-compatible history from messages (only ai + user)
  function buildChatHistory() {
    return messages
      .filter((m) => m.role === "ai" || m.role === "user")
      .map((m) => ({
        role: (m.role === "ai" ? "assistant" : "user") as
          | "assistant"
          | "user",
        content: m.text!,
      }));
  }

  // Build simple history for coach context
  function buildSimpleHistory() {
    return messages
      .filter((m) => m.role === "ai" || m.role === "user")
      .map((m) => ({ role: m.role as "ai" | "user", text: m.text! }));
  }

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      // 1. Coach analyzes user's response
      const history = buildSimpleHistory();
      const coach: CoachAnalysis = await analyzeResponse(history, text);

      const coachMsg: Message = {
        id: Date.now().toString() + "-coach",
        role: "coach",
        scores: {
          clarity: coach.clarity,
          confidence: coach.confidence,
          data: coach.data,
        },
        improvementText: coach.recommendation,
        improvedResponse: coach.improved_response,
      };
      setMessages((prev) => [...prev, coachMsg]);

      // 2. Manager responds to user with profile context
      const chatHistory = [
        ...buildChatHistory(),
        { role: "user" as const, content: text },
      ];
      const managerText = await getManagerResponse(chatHistory, profileCtx);

      const aiMsg: Message = {
        id: Date.now().toString() + "-ai",
        role: "ai",
        text: managerText,
      };
      setMessages((prev) => {
        const updated = [...prev, aiMsg];
        // Refresh suggestions based on new conversation state
        refreshSuggestions(updated);
        return updated;
      });
    } catch {
      const errorMsg: Message = {
        id: Date.now().toString() + "-error",
        role: "ai",
        text: "Lo siento, hubo un problema de conexión. ¿Podrías repetir tu último punto?",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setShowSuggestions(true);
    }
  };

  const useImprovedResponse = (text: string) => {
    setInputText(text);
  };

  const handleNewSimulation = () => {
    setMessages([{ id: "1", role: "ai", text: INITIAL_AI_MESSAGE }]);
    setInputText("");
    setShowSuggestions(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showSuggestions]);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-background">
      {/* Sidebar - History */}
      <div className="hidden lg:flex flex-col w-80 bg-white border-r border-border p-5 shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <button
          onClick={handleNewSimulation}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold hover:shadow-[0_0_15px_rgba(255,46,147,0.4)] hover:-translate-y-0.5 transition-all mb-8"
        >
          <Plus className="w-5 h-5" />
          Nueva simulación
        </button>

        <div className="flex items-center gap-2 mb-4 px-2 text-muted-foreground">
          <History className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Historial
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button className="text-left px-5 py-4 rounded-2xl bg-primary/5 border border-primary/20 text-primary transition-colors relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
            <div className="font-bold mb-1 truncate">Simulación actual</div>
            <div className="text-xs font-medium text-muted-foreground truncate">
              {messages.filter((m) => m.role === "user").length} mensajes
            </div>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-background relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-border px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 shadow-sm z-10 sticky top-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => router.back()}
              className="lg:hidden p-2 -ml-1 text-muted-foreground hover:text-primary transition-colors bg-muted/50 rounded-full shrink-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md shrink-0">
                <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg md:text-xl font-extrabold font-heading text-foreground leading-tight truncate">
                  Simulador de Negociación AI
                </h1>
                <p className="text-[10px] sm:text-xs font-medium text-secondary flex items-center gap-1">
                  <span
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isTyping ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}
                  />
                  {isTyping ? "Escribiendo..." : "Gerente Virtual conectado"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const chatHistory = messages
                .filter((m) => m.role === "ai" || m.role === "user")
                .map((m) => ({ role: m.role as "ai" | "user", text: m.text! }));
              setSimulationChat(chatHistory);
              router.push("/confidence-score");
            }}
            className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-foreground text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:bg-foreground/90 transition-colors shadow-md whitespace-nowrap shrink-0"
          >
            <StopCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Finalizar simulación</span>
            <span className="sm:hidden">Finalizar</span>
          </button>
        </div>

        {/* Chat Conversation */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 z-10 scroll-smooth">
          <div className="max-w-3xl mx-auto w-full space-y-8 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-3 md:gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} ${msg.role === "coach" ? "w-full justify-center" : ""}`}
                >
                  {msg.role !== "coach" && (
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex flex-shrink-0 items-center justify-center shadow-md ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-primary to-accent text-white"
                          : "bg-white text-primary border border-primary/20"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <Bot className="w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </div>
                  )}

                  {msg.role === "coach" ? (
                    <div className="w-full flex justify-center my-6">
                      <div className="bg-gradient-to-br from-white to-slate-50 border border-border p-6 md:p-8 rounded-[2rem] max-w-2xl w-full shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                          <div className="p-2 bg-primary/10 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-extrabold text-xl text-foreground">
                            Análisis de tu respuesta
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 relative z-10">
                          {[
                            {
                              label: "Claridad",
                              score: msg.scores?.clarity,
                              color: "text-secondary",
                              bar: "bg-secondary",
                            },
                            {
                              label: "Confianza",
                              score: msg.scores?.confidence,
                              color: "text-primary",
                              bar: "bg-primary",
                            },
                            {
                              label: "Uso de datos",
                              score: msg.scores?.data,
                              color: "text-accent",
                              bar: "bg-accent",
                            },
                          ].map((stat, i) => (
                            <div
                              key={i}
                              className="flex flex-col p-4 bg-white rounded-2xl border border-border shadow-sm"
                            >
                              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">
                                {stat.label}
                              </span>
                              <div className="flex items-end gap-1 mb-3">
                                <span
                                  className={`text-3xl font-black leading-none ${stat.color}`}
                                >
                                  {stat.score}
                                </span>
                                <span className="text-sm text-muted-foreground/50 font-bold mb-1">
                                  /10
                                </span>
                              </div>
                              <div className="w-full h-2 bg-muted/20 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(stat.score || 0) * 10}%`,
                                  }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className={`h-full rounded-full ${stat.bar}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 relative z-10">
                          <div className="flex-1 bg-white border border-border p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                              <Lightbulb className="w-5 h-5 text-amber-500" />
                              Recomendación de IA
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                              {msg.improvementText}
                            </p>
                          </div>

                          <div className="flex-1 bg-gradient-to-br from-primary to-accent p-5 rounded-2xl shadow-md text-white">
                            <div className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-white/60" />
                              Versión mejorada
                            </div>
                            <p className="text-[15px] font-medium leading-relaxed mb-5">
                              &ldquo;{msg.improvedResponse}&rdquo;
                            </p>
                            <button
                              onClick={() =>
                                useImprovedResponse(msg.improvedResponse || "")
                              }
                              className="w-full text-sm font-bold bg-white text-primary px-4 py-2.5 rounded-xl shadow-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                              Usar esta respuesta
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-4 py-3 sm:px-6 sm:py-4 md:py-5 shadow-sm text-sm sm:text-[16px] leading-relaxed font-medium ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-primary to-accent text-white rounded-tr-none shadow-[0_4px_15px_rgba(255,46,147,0.2)]"
                          : "bg-white border border-border text-foreground rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 md:gap-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-primary/20 text-primary flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="bg-white border border-border rounded-3xl rounded-tl-none px-6 py-5 shadow-sm flex items-center gap-2 w-fit">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.4,
                        delay: 0,
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.4,
                        delay: 0.2,
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.4,
                        delay: 0.4,
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                    />
                  </div>
                </motion.div>
              )}
              <div key="scroll-anchor" ref={messagesEndRef} className="h-2" />
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="bg-white/90 backdrop-blur-xl border-t border-border shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-20 rounded-t-[2rem]">
          <div className="max-w-4xl mx-auto w-full">
            <div className="pt-4 pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Ideas para responder
                </span>
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1 rounded-full"
                >
                  {showSuggestions ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      {/* Fade hint derecha para indicar scroll */}
                      <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none rounded-r-2xl" />
                      <div
                        className="flex overflow-x-auto pb-3 pt-1 gap-3 snap-x snap-mandatory pr-8"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}
                      >
                        {loadingSuggestions
                          ? Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="snap-start shrink-0 w-[260px] md:w-[300px] h-[76px] bg-muted/30 border border-border rounded-2xl animate-pulse"
                              />
                            ))
                          : suggestions.map((suggestion, i) => (
                              <button
                                key={`${i}-${suggestion.slice(0, 20)}`}
                                onClick={() => handleSend(suggestion)}
                                disabled={isTyping}
                                className="snap-start shrink-0 w-[260px] md:w-[300px] text-left px-5 py-3.5 bg-white hover:bg-primary/5 text-foreground hover:text-primary font-medium text-sm rounded-2xl border border-border hover:border-primary/30 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-normal leading-relaxed"
                              >
                                &ldquo;{suggestion}&rdquo;
                              </button>
                            ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 pt-1">
              <div className="relative flex items-end gap-2 sm:gap-3 bg-muted/20 border border-border rounded-2xl sm:rounded-[2rem] p-1.5 sm:p-2 shadow-inner focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/30 transition-all">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputText);
                    }
                  }}
                  placeholder="Escribe tu mensaje o usa una sugerencia arriba..."
                  className="flex-1 max-h-32 min-h-[48px] sm:min-h-[60px] bg-transparent outline-none resize-none px-3 py-3 sm:px-5 sm:py-4 text-sm sm:text-[16px] text-foreground font-medium placeholder:text-muted-foreground"
                  disabled={isTyping}
                  rows={1}
                />
                <button
                  onClick={() => handleSend(inputText)}
                  disabled={isTyping || !inputText.trim()}
                  className="p-3 sm:p-4 mb-0.5 mr-0.5 sm:mb-1 sm:mr-1 bg-gradient-to-r from-primary to-accent text-white rounded-xl sm:rounded-2xl hover:shadow-[0_4px_15px_rgba(255,46,147,0.3)] hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none shadow-md shrink-0"
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
