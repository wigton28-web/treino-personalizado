"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/custom/navbar";
import { 
  TrendingUp, Calendar, Award, Target, Flame,
  Dumbbell, Activity, ChevronRight, BarChart3
} from "lucide-react";

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month");

  const stats = [
    { 
      label: "Treinos Completos", 
      value: "48", 
      change: "+12%", 
      icon: Dumbbell,
      color: "from-[#10B981] to-[#059669]"
    },
    { 
      label: "Calorias Queimadas", 
      value: "18.5k", 
      change: "+8%", 
      icon: Flame,
      color: "from-[#6B7F5E] to-[#4A5F7A]"
    },
    { 
      label: "Sequência Atual", 
      value: "14 dias", 
      change: "Recorde!", 
      icon: Award,
      color: "from-[#4A5F7A] to-[#5A6B7D]"
    },
    { 
      label: "Meta Atingida", 
      value: "92%", 
      change: "+5%", 
      icon: Target,
      color: "from-[#5A6B7D] to-[#6B7F5E]"
    }
  ];

  const weeklyProgress = [
    { day: "Seg", completed: true, intensity: 85 },
    { day: "Ter", completed: true, intensity: 70 },
    { day: "Qua", completed: true, intensity: 90 },
    { day: "Qui", completed: false, intensity: 0 },
    { day: "Sex", completed: true, intensity: 75 },
    { day: "Sáb", completed: true, intensity: 80 },
    { day: "Dom", completed: false, intensity: 0 }
  ];

  const strengthGains = [
    { exercise: "Supino Reto", initial: 60, current: 80, improvement: 33 },
    { exercise: "Agachamento", initial: 80, current: 110, improvement: 37 },
    { exercise: "Levantamento Terra", initial: 100, current: 140, improvement: 40 },
    { exercise: "Desenvolvimento", initial: 40, current: 55, improvement: 37 }
  ];

  const bodyMetrics = [
    { metric: "Peso", initial: 85, current: 78, unit: "kg", change: -7 },
    { metric: "Gordura Corporal", initial: 22, current: 16, unit: "%", change: -6 },
    { metric: "Massa Muscular", initial: 35, current: 38, unit: "kg", change: +3 },
    { metric: "IMC", initial: 27.2, current: 24.9, unit: "", change: -2.3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A5F7A] via-[#5A6B7D] to-[#6B7F5E]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Seu Progresso
          </h1>
          <p className="text-white/70">
            Acompanhe sua evolução e conquistas
          </p>
        </motion.div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "week", label: "Semana" },
            { id: "month", label: "Mês" },
            { id: "year", label: "Ano" }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedPeriod === period.id
                  ? "bg-[#10B981] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm mb-2">{stat.label}</div>
              <div className="text-[#10B981] text-sm font-semibold">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Atividade Semanal</h2>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-white/60 text-sm mb-2">{day.day}</div>
                <div
                  className={`h-24 rounded-xl transition-all ${
                    day.completed
                      ? "bg-[#10B981]"
                      : "bg-white/10"
                  }`}
                  style={{
                    opacity: day.completed ? day.intensity / 100 : 0.3
                  }}
                />
                {day.completed && (
                  <div className="text-white/60 text-xs mt-2">{day.intensity}%</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strength Gains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Ganhos de Força</h2>
            <BarChart3 className="w-6 h-6 text-white/70" />
          </div>
          <div className="space-y-4">
            {strengthGains.map((gain, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">{gain.exercise}</div>
                  <div className="text-[#10B981] font-bold">+{gain.improvement}%</div>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-white/60 text-sm">
                    Inicial: <span className="text-white font-semibold">{gain.initial}kg</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                  <div className="text-white/60 text-sm">
                    Atual: <span className="text-white font-semibold">{gain.current}kg</span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#059669]"
                    style={{ width: `${gain.improvement}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Body Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Métricas Corporais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bodyMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl">
                <div className="text-white/70 text-sm mb-2">{metric.metric}</div>
                <div className="flex items-end gap-3 mb-2">
                  <div className="text-3xl font-bold text-white">
                    {metric.current}{metric.unit}
                  </div>
                  <div className={`text-sm font-semibold mb-1 ${
                    metric.change < 0 ? "text-[#10B981]" : "text-[#10B981]"
                  }`}>
                    {metric.change > 0 ? "+" : ""}{metric.change}{metric.unit}
                  </div>
                </div>
                <div className="text-white/60 text-xs">
                  Inicial: {metric.initial}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#10B981]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center flex-shrink-0">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Insights da IA</h3>
              <div className="space-y-2 text-white/90">
                <p>✨ Excelente consistência! Você treinou 6 dos últimos 7 dias.</p>
                <p>💪 Seus ganhos de força no agachamento estão acima da média (+37%).</p>
                <p>🎯 Continue assim e você atingirá sua meta de peso em 4 semanas.</p>
                <p>⚡ Sugestão: Aumente a carga do supino em 2.5kg na próxima sessão.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
