"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/custom/navbar";
import { 
  Dumbbell, Plus, Search, Filter, Clock,
  Target, TrendingUp, Play, Calendar
} from "lucide-react";
import Link from "next/link";

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "strength" | "cardio" | "flexibility">("all");

  const workoutPlans = [
    {
      id: 1,
      name: "Hipertrofia - Push Pull Legs",
      description: "Treino focado em ganho de massa muscular",
      duration: "12 semanas",
      frequency: "6x por semana",
      difficulty: "Intermediário",
      exercises: 24,
      type: "strength",
      color: "from-[#10B981] to-[#059669]"
    },
    {
      id: 2,
      name: "Emagrecimento Acelerado",
      description: "Combinação de treino e cardio para perda de peso",
      duration: "8 semanas",
      frequency: "5x por semana",
      difficulty: "Iniciante",
      exercises: 18,
      type: "cardio",
      color: "from-[#6B7F5E] to-[#4A5F7A]"
    },
    {
      id: 3,
      name: "Força e Performance",
      description: "Treino para ganho de força máxima",
      duration: "16 semanas",
      frequency: "4x por semana",
      difficulty: "Avançado",
      exercises: 20,
      type: "strength",
      color: "from-[#4A5F7A] to-[#5A6B7D]"
    },
    {
      id: 4,
      name: "Mobilidade e Flexibilidade",
      description: "Melhore sua amplitude de movimento",
      duration: "6 semanas",
      frequency: "3x por semana",
      difficulty: "Todos os níveis",
      exercises: 15,
      type: "flexibility",
      color: "from-[#5A6B7D] to-[#6B7F5E]"
    }
  ];

  const recentWorkouts = [
    { name: "Peito e Tríceps", date: "Hoje, 18:30", duration: "65 min", completed: true },
    { name: "Costas e Bíceps", date: "Ontem, 18:00", duration: "70 min", completed: true },
    { name: "Pernas", date: "2 dias atrás", duration: "80 min", completed: true }
  ];

  const filteredPlans = workoutPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || plan.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
            Meus Treinos
          </h1>
          <p className="text-white/70">
            Gerencie e acompanhe seus planos de treino
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Buscar treinos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />
          </div>

          <div className="flex gap-2">
            {[
              { id: "all", label: "Todos" },
              { id: "strength", label: "Força" },
              { id: "cardio", label: "Cardio" }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id as any)}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  filterType === filter.id
                    ? "bg-[#10B981] text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/15"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Create New Workout CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <button className="w-full p-6 bg-[#10B981] hover:bg-[#059669] rounded-2xl transition-all group shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-bold text-white mb-1">Criar Novo Treino</div>
                <div className="text-white/90">Use a IA para gerar um plano personalizado</div>
              </div>
              <Plus className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* Recent Workouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Treinos Recentes</h2>
          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981] flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{workout.name}</div>
                      <div className="text-white/60 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {workout.date} • {workout.duration}
                      </div>
                    </div>
                  </div>
                  {workout.completed && (
                    <div className="px-3 py-1 bg-[#10B981]/20 border border-[#10B981] rounded-lg text-[#10B981] text-sm font-semibold">
                      Completo
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Workout Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Dumbbell className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/70 text-sm mb-4">{plan.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white/60 text-xs mb-1">Duração</div>
                  <div className="text-white font-semibold text-sm">{plan.duration}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white/60 text-xs mb-1">Frequência</div>
                  <div className="text-white font-semibold text-sm">{plan.frequency}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-white/60 text-sm">{plan.exercises} exercícios</div>
                <div className="px-3 py-1 bg-white/10 rounded-lg text-white text-xs font-semibold">
                  {plan.difficulty}
                </div>
              </div>

              <Link href="/workout/checkin">
                <button className="w-full py-3 bg-[#10B981] hover:bg-[#059669] rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Iniciar Treino
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">Nenhum treino encontrado</p>
            <p className="text-white/40 text-sm mt-2">Tente ajustar os filtros ou criar um novo treino</p>
          </div>
        )}
      </main>
    </div>
  );
}
