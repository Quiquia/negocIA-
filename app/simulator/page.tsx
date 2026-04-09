"use client";

import type { Locale } from "@/app/providers/LanguageProvider";
import { useState, useRef, useEffect, useMemo } from "react";
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
  Mic,
  Volume2,
} from "lucide-react";
import {
  analyzeResponse,
  getManagerResponse,
  generateSuggestions,
  type CoachAnalysis,
  type ProfileContext,
} from "./actions";
import { useSalaryData } from "../providers/SalaryDataProvider";
import { useTranslation } from "@/app/lib/i18n/use-translation";

function formatLocaleInteger(n: number, locale: Locale): string {
  return n.toLocaleString(locale === "en" ? "en-US" : "es-ES", {
    maximumFractionDigits: 0,
  });
}

type Message = {
  id: string;
  role: "ai" | "user" | "coach";
  text?: string;
  scores?: { clarity: number; confidence: number; data: number };
  improvementText?: string;
  improvedResponse?: string;
};

export default function AiNegotiationSimulatorPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { profileData, currentSalary, averageSalary, setSimulationChat } =
    useSalaryData();

  // Datos del perfil para personalizar
  const currency = profileData?.currency || "PEN";
  const currencySymbol =
    currency === "USD" ? "$" : currency === "COP" ? "COL$" : "S/";
  const role = profileData?.role || "Frontend Developer";
  const seniority = profileData?.seniority || "Mid";
  const techStack =
    profileData?.techStack?.join(", ") || "React, TypeScript";

  const initialAiMessage = useMemo(
    () => t("sim.initialAi", { role, seniority }),
    [t, role, seniority],
  );

  const fmtSalary = (n: number) =>
    `${currencySymbol}${formatLocaleInteger(n, locale)}`;
  const targetLow = fmtSalary(averageSalary);
  const targetHigh = fmtSalary(Math.round(averageSalary * 1.1));

  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "1", role: "ai", text: initialAiMessage },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestionsPanelRef = useRef<HTMLDivElement>(null);

  const profileCtx: ProfileContext | undefined = profileData
    ? {
        role,
        seniority,
        techStack,
        country: profileData.country || t("sim.defaultRegion"),
        currentSalary: fmtSalary(currentSalary),
        marketSalary: fmtSalary(averageSalary),
      }
    : undefined;

  const coachStatDefs = useMemo(
    () =>
      [
        {
          stat: "clarity" as const,
          label: t("sim.stat.clarity"),
          color: "text-secondary",
          bg: "bg-secondary/10",
          bar: "bg-secondary",
        },
        {
          stat: "confidence" as const,
          label: t("sim.stat.confidence"),
          color: "text-primary",
          bg: "bg-primary/10",
          bar: "bg-primary",
        },
        {
          stat: "data" as const,
          label: t("sim.stat.data"),
          color: "text-accent",
          bg: "bg-accent/10",
          bar: "bg-accent",
        },
      ] as const,
    [t],
  );

  // Recording timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setInputText(
      t("sim.recordingFill", { low: targetLow, high: targetHigh }),
    );
  };

  const handlePlayAudio = (id: string) => {
    setActivePopover(null);
    setPlayingMessageId(id);
    setTimeout(() => {
      setPlayingMessageId(null);
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
        t("sim.fallbackSug0"),
        t("sim.fallbackSug1"),
        t("sim.fallbackSug2"),
        t("sim.fallbackSug3"),
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
        // Defer: never call other setStates inside a setState updater (breaks React / App Router).
        queueMicrotask(() => {
          void refreshSuggestions(updated);
        });
        return updated;
      });
    } catch {
      const errorMsg: Message = {
        id: Date.now().toString() + "-error",
        role: "ai",
        text: t("sim.errConnection"),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const useImprovedResponse = (text: string) => {
    setInputText(text);
    setShowSuggestions(false);
  };

  const handleNewSimulation = () => {
    setMessages([{ id: "1", role: "ai", text: initialAiMessage }]);
    setInputText("");
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (!showSuggestions) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = suggestionsPanelRef.current;
      if (!el?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [showSuggestions]);

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
          {t("sim.newSimulation")}
        </button>

        <div className="flex items-center gap-2 mb-4 px-2 text-muted-foreground">
          <History className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {t("sim.history")}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button className="text-left px-5 py-4 rounded-2xl bg-primary/5 border border-primary/20 text-primary transition-colors relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
            <div className="font-bold mb-1 truncate">
              {t("sim.currentSimulation")}
            </div>
            <div className="text-xs font-medium text-muted-foreground truncate">
              {t("sim.messageCount", {
                count: messages.filter((m) => m.role === "user").length,
              })}
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
                <h1 className="text-sm sm:text-lg md:text-xl font-extrabold font-heading text-foreground leading-tight flex items-center gap-3">
                  <span className="truncate">{t("sim.title")}</span>
                  <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border">
                    {t("sim.round", {
                      round: Math.ceil(
                        messages.filter((m) => m.role !== "coach").length / 2,
                      ),
                    })}
                  </span>
                </h1>
                <div className="flex items-center gap-3">
                  <p className="text-[10px] sm:text-xs font-medium text-secondary flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isTyping ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}
                    />
                    {isTyping
                      ? t("sim.typing")
                      : t("sim.managerConnected")}
                  </p>
                  <span className="md:hidden items-center px-2 py-0.5 rounded-full bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border">
                    {t("sim.round", {
                      round: Math.ceil(
                        messages.filter((m) => m.role !== "coach").length / 2,
                      ),
                    })}
                  </span>
                </div>
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
            <span className="hidden sm:inline">{t("sim.finish")}</span>
            <span className="sm:hidden">{t("sim.finishShort")}</span>
          </button>
        </div>

        {/* Session Context */}
        <div className="bg-slate-50/80 border-b border-border px-6 py-2.5 flex flex-wrap gap-4 items-center text-xs font-medium text-slate-600 z-10 relative">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">
              {t("sim.objectiveLabel")}
            </span>
            <span>{t("sim.objectiveValue")}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">
              {t("sim.targetLabel")}
            </span>
            <span className="text-primary font-bold">
              {targetLow} – {targetHigh}
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">
              {t("sim.stageLabel")}
            </span>
            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm">
              {t("sim.stageValue")}
            </span>
          </div>
        </div>

        {/* Chat Conversation */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-10 z-10 scroll-smooth">
          <div className="max-w-3xl mx-auto w-full space-y-10 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-3 md:gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} ${msg.role === "coach" ? "w-full justify-center" : ""}`}
                >
                  {msg.role !== "coach" && (
                    <div className="flex flex-col items-center gap-1.5 mt-1 shrink-0">
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
                      {msg.role === "ai" && (
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-white px-2 py-0.5 rounded-full shadow-sm border border-border mt-1 whitespace-nowrap hidden md:block">
                          {t("sim.hiringManager")}
                        </span>
                      )}
                    </div>
                  )}

                  {msg.role === "coach" ? (
                    <div className="w-full flex justify-center my-10 relative">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-border -z-10" />
                      <div className="bg-gradient-to-br from-white to-slate-50 border border-border p-6 md:p-8 rounded-[2rem] max-w-2xl w-full shadow-2xl shadow-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                          <div className="p-2 bg-primary/10 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-extrabold text-xl text-foreground">
                            {t("sim.coachTitle")}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 relative z-10">
                          {coachStatDefs.map((stat, i) => (
                            <div
                              key={stat.stat}
                              className="flex flex-col p-4 bg-white rounded-2xl border border-border shadow-sm"
                            >
                              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">
                                {stat.label}
                              </span>
                              <div className="flex items-end gap-1 mb-3">
                                <motion.span
                                  initial={false}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: 0.2 + i * 0.1,
                                    type: "spring",
                                    stiffness: 200,
                                  }}
                                  className={`text-3xl font-black leading-none ${stat.color}`}
                                >
                                  {msg.scores?.[stat.stat]}
                                </motion.span>
                                <span className="text-sm text-muted-foreground/50 font-bold mb-1">
                                  /10
                                </span>
                              </div>
                              <div className="w-full h-2 bg-muted/20 rounded-full overflow-hidden relative">
                                <motion.div
                                  initial={false}
                                  animate={{
                                    width: `${(msg.scores?.[stat.stat] || 0) * 10}%`,
                                  }}
                                  transition={{
                                    duration: 1,
                                    delay: 0.3 + i * 0.1,
                                    ease: "easeOut",
                                  }}
                                  className={`h-full rounded-full ${stat.bar} relative`}
                                >
                                  <motion.div
                                    initial={false}
                                    animate={{
                                      opacity: [0, 1, 0],
                                      x: "100%",
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      delay: 1 + i * 0.1,
                                      ease: "easeInOut",
                                      repeat: 1,
                                    }}
                                    className="absolute inset-0 w-full h-full bg-white/40 skew-x-12"
                                  />
                                </motion.div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 relative z-10">
                          <div className="flex-1 bg-white border border-border p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                              <Lightbulb className="w-5 h-5 text-amber-500" />
                              {t("sim.aiRecommendation")}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                              {msg.improvementText}
                            </p>
                          </div>

                          <div className="flex-1 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 p-5 rounded-2xl shadow-sm text-foreground">
                            <div className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-primary" />
                              {t("sim.improvedVersion")}
                            </div>
                            <p className="text-[15px] font-medium leading-relaxed mb-5 text-slate-700">
                              &ldquo;{msg.improvedResponse}&rdquo;
                            </p>
                            <button
                              onClick={() =>
                                useImprovedResponse(msg.improvedResponse || "")
                              }
                              className="w-full text-sm font-bold bg-primary text-white px-4 py-2.5 rounded-xl shadow-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                              {t("sim.useThisResponse")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%] md:max-w-[75%]`}
                    >
                      {msg.role === "ai" && (
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider md:hidden px-1">
                          {t("sim.hiringManager")}
                        </span>
                      )}
                      <div
                        className={`rounded-3xl px-4 py-3 sm:px-6 sm:py-4 md:py-5 shadow-sm text-sm sm:text-[16px] leading-relaxed font-medium relative group z-0 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-primary to-accent text-white rounded-tr-none shadow-[0_4px_15px_rgba(255,46,147,0.2)]"
                            : "bg-white border border-border text-foreground rounded-tl-none shadow-sm"
                        }`}
                      >
                        {playingMessageId === msg.id && (
                          <div className="absolute inset-0 z-0 rounded-3xl rounded-tl-none overflow-hidden">
                            <motion.div
                              initial={false}
                              animate={{ width: "100%" }}
                              transition={{ duration: 4, ease: "linear" }}
                              className="absolute top-0 left-0 bottom-0 bg-primary/10"
                            />
                          </div>
                        )}
                        <div className="relative z-10">{msg.text}</div>
                        {msg.role === "ai" && (
                          <div className="mt-3 flex justify-end relative z-20">
                            <button
                              onClick={() =>
                                setActivePopover(
                                  activePopover === msg.id ? null : msg.id
                                )
                              }
                              className="text-muted-foreground/60 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/5"
                              title={t("sim.listenTitle")}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                              {activePopover === msg.id && (
                                <motion.div
                                  initial={false}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                  className="absolute bottom-full right-0 mb-2 w-44 bg-white rounded-xl shadow-lg border border-border p-2 z-50 origin-bottom-right"
                                >
                                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 pt-1">
                                    {t("sim.listenTitle")}
                                  </div>
                                  <button
                                    onClick={() => handlePlayAudio(msg.id)}
                                    className="w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                                  >
                                    {t("sim.voiceFemale")}
                                  </button>
                                  <button
                                    onClick={() => handlePlayAudio(msg.id)}
                                    className="w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                                  >
                                    {t("sim.voiceMale")}
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  key="typing"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 md:gap-4"
                >
                  <div className="flex flex-col items-center gap-1.5 mt-1 shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-primary/20 text-primary flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-white px-2 py-0.5 rounded-full shadow-sm border border-border mt-1 whitespace-nowrap hidden md:block">
                      {t("sim.hiringManager")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider md:hidden px-1">
                      {t("sim.hiringManager")}
                    </span>
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
            <div ref={suggestionsPanelRef} className="pt-3 pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="text-[11px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 min-w-0">
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary shrink-0" />
                  <span className="truncate">{t("sim.ideasToReply")}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="text-[11px] md:text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2.5 py-1 rounded-full shrink-0"
                >
                  {showSuggestions ? t("sim.hide") : t("sim.show")}
                </button>
              </div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={false}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none rounded-r-xl" />
                      <div
                        className="flex overflow-x-auto pb-2 pt-0.5 gap-2 snap-x snap-mandatory pr-6 max-h-[88px] md:max-h-[96px]"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}
                      >
                        {loadingSuggestions
                          ? Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] h-[64px] md:h-[72px] bg-muted/30 border border-border rounded-xl animate-pulse"
                              />
                            ))
                          : suggestions.map((suggestion, i) => (
                              <button
                                key={`${i}-${suggestion.slice(0, 20)}`}
                                type="button"
                                onClick={() => handleSend(suggestion)}
                                disabled={isTyping}
                                className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px] max-h-[72px] md:max-h-[80px] text-left px-3 py-2 bg-white hover:bg-primary/5 text-foreground hover:text-primary font-medium text-xs rounded-xl border border-border hover:border-primary/30 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed leading-snug line-clamp-3 overflow-hidden"
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
              {isRecording ? (
                <div className="relative flex items-center justify-between gap-3 bg-red-50 border border-red-100 rounded-[2rem] p-4 shadow-inner transition-all w-full min-h-[60px]">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-3 h-3 rounded-full bg-red-500"
                    />
                    <span className="font-bold text-red-600 text-sm">
                      {t("sim.recording")}
                    </span>
                    <span className="text-red-500 font-medium text-sm font-mono ml-2">
                      {formatTime(recordingTime)}
                    </span>
                  </div>
                  <button
                    onClick={handleStopRecording}
                    className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl hover:scale-105 transition-all shadow-sm flex items-center gap-2"
                  >
                    <StopCircle className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold">{t("sim.stop")}</span>
                  </button>
                </div>
              ) : (
                <div className="relative flex items-end gap-2 sm:gap-3 bg-muted/20 border border-border rounded-2xl sm:rounded-[2rem] p-1.5 sm:p-2 shadow-inner focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/30 transition-all">
                  <button
                    onClick={handleStartRecording}
                    disabled={isTyping}
                    className="p-3 sm:p-4 mb-0.5 ml-0.5 sm:mb-1 sm:ml-1 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors disabled:opacity-50 shrink-0"
                    title={t("sim.voiceRecordTitle")}
                  >
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(inputText);
                      }
                    }}
                    placeholder={t("sim.placeholder")}
                    className="flex-1 max-h-32 min-h-[48px] sm:min-h-[60px] bg-transparent outline-none resize-none py-3 sm:py-4 text-sm sm:text-[16px] text-foreground font-medium placeholder:text-muted-foreground"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
