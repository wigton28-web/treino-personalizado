"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, Dumbbell, Apple, Route, TrendingUp, 
  Clock, Flame, Target, Plus, Play, BarChart3,
  Calendar, Settings, User, Menu, X
} from "lucide-react";
import Link from "next/link";
import type { OnboardingData } from "@/lib/types";

export default function DashboardPage() {
  const [userData, setUserData] = useState<OnboardingData["data"] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("metaflow_onboarding");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const stats = [
    { label: "Treinos", value: "12", icon: Dumbbell, color: "from-[#6B7F5E] to-[#4A5F7A]" },
    { label: "Calorias", value: "2.4k", icon: Flame, color: "from-[#10B981] to-[#059669]" },
    { label: "Sequência", value: "7 dias", icon: Target, color: "from-[#4A5F7A] to-[#5A6B7D]" },
    { label: "Progresso", value: "85%", icon: TrendingUp, color: "from-[#5A6B7D] to-[#6B7F5E]" }
  ];

  const quickActions = [
    { label: "Iniciar Treino", icon: Play, href: "/workout", color: "bg-[#10B981]" },
    { label: "Registrar Refeição", icon: Apple, href: "/nutrition", color: "bg-[#6B7F5E]" },
    { label: "Atividade Externa", icon: Route, href: "/external", color: "bg-[#4A5F7A]" },
    { label: "Ver Relatórios", icon: BarChart3, href: "/reports", color: "bg-[#5A6B7D]" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A5F7A] via-[#5A6B7D] to-[#6B7F5E]">
      {/* Header/Navbar */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">MetaFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-white hover:text-white/80 transition-colors">
                Dashboard
              </Link>
              <Link href="/workouts" className="text-white/70 hover:text-white transition-colors">
                Treinos
              </Link>
              <Link href="/nutrition" className="text-white/70 hover:text-white transition-colors">
                Nutrição
              </Link>
              <Link href="/progress" className="text-white/70 hover:text-white transition-colors">
                Progresso
              </Link>
              <Link href="/settings" className="text-white/70 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
              <Link href="/profile" className="text-white/70 hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 space-y-3"
            >
              <Link href="/dashboard" className="block text-white py-2">Dashboard</Link>
              <Link href="/workouts" className="block text-white/70 py-2">Treinos</Link>
              <Link href="/nutrition" className="block text-white/70 py-2">Nutrição</Link>
              <Link href="/progress" className="block text-white/70 py-2">Progresso</Link>
              <Link href="/settings" className="block text-white/70 py-2">Configurações</Link>
              <Link href="/profile" className="block text-white/70 py-2">Perfil</Link>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Olá, {userData?.personalInfo?.name || "Atleta"}! 👋
          </h1>
          <p className="text-white/70 text-lg">
            Pronto para mais um dia de evolução?
          </p>
        </motion.div>

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
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Choose Plan CTA (Main Action) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Link href="/pricing">
            <button className="w-full group relative overflow-hidden bg-[#10B981] hover:bg-[#059669] text-white rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-2xl font-bold mb-2">Escolha seu plano</div>
                  <div className="text-white/90">Desbloqueie todo o potencial do MetaFlow</div>
                </div>
                <Play className="w-12 h-12 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={action.href}>
                  <button className={`w-full ${action.color} hover:opacity-90 text-white rounded-xl p-6 transition-all hover:scale-105 shadow-lg`}>
                    <action.icon className="w-8 h-8 mx-auto mb-3" />
                    <div className="text-sm font-semibold">{action.label}</div>
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Today's Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Plano de Hoje</h2>
            <Calendar className="w-6 h-6 text-white/70" />
          </div>

          <div className="space-y-4">
            {/* Workout */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#10B981] flex items-center justify-center flex-shrink-0">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold mb-1">Treino de Peito e Tríceps</div>
                <div className="text-white/70 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  60 minutos • 8 exercícios
                </div>
              </div>
            </div>

            {/* Meals */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#6B7F5E] flex items-center justify-center flex-shrink-0">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold mb-1">Meta Nutricional</div>
                <div className="text-white/70 text-sm">
                  2.200 kcal • 180g proteína • 220g carbo • 60g gordura
                </div>
              </div>
            </div>

            {/* Hydration */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#4A5F7A] flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold mb-1">Hidratação</div>
                <div className="text-white/70 text-sm">Meta: 3 litros de água</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Atividade Recente</h2>
          
          <div className="space-y-3">
            {[
              { type: "Treino", name: "Costas e Bíceps", time: "Ontem, 18:30", icon: Dumbbell },
              { type: "Corrida", name: "5km em 28min", time: "2 dias atrás", icon: Route },
              { type: "Nutrição", name: "Meta atingida", time: "Ontem", icon: Apple }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{activity.name}</div>
                  <div className="text-white/60 text-sm">{activity.type} • {activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
