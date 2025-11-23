"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/custom/navbar";
import { 
  Route, Play, MapPin, TrendingUp, Clock,
  Heart, Zap, Mountain, Upload, Download
} from "lucide-react";

export default function ExternalPage() {
  const [activeTab, setActiveTab] = useState<"running" | "cycling" | "swimming">("running");

  const activities = [
    {
      type: "running",
      name: "Corrida Matinal",
      date: "Hoje, 06:30",
      distance: 5.2,
      duration: "28:45",
      pace: "5:32",
      calories: 420,
      avgHR: 145,
      elevation: 45
    },
    {
      type: "cycling",
      name: "Pedal no Parque",
      date: "Ontem, 17:00",
      distance: 15.8,
      duration: "45:20",
      pace: "20.9",
      calories: 580,
      avgHR: 138,
      elevation: 120
    },
    {
      type: "running",
      name: "Treino Intervalado",
      date: "2 dias atrás",
      distance: 8.0,
      duration: "42:15",
      pace: "5:17",
      calories: 650,
      avgHR: 162,
      elevation: 80
    }
  ];

  const stats = [
    { label: "Distância Total", value: "124 km", icon: Route, color: "from-[#10B981] to-[#059669]" },
    { label: "Tempo Ativo", value: "12h 45m", icon: Clock, color: "from-[#6B7F5E] to-[#4A5F7A]" },
    { label: "Calorias", value: "8.5k", icon: Zap, color: "from-[#4A5F7A] to-[#5A6B7D]" },
    { label: "Elevação", value: "1.2k m", icon: Mountain, color: "from-[#5A6B7D] to-[#6B7F5E]" }
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
            Atividades Externas
          </h1>
          <p className="text-white/70">
            Corrida, ciclismo e natação sincronizados
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
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <button className="p-6 bg-[#10B981] hover:bg-[#059669] rounded-2xl transition-all text-left group shadow-lg">
            <Play className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-white font-semibold mb-1">Iniciar Atividade</div>
            <div className="text-white/90 text-sm">Comece a rastrear agora</div>
          </button>

          <button className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-left group">
            <Upload className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-white font-semibold mb-1">Importar Treino</div>
            <div className="text-white/60 text-sm">GPX, TCX ou FIT</div>
          </button>

          <button className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-left group">
            <Download className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-white font-semibold mb-1">Sincronizar</div>
            <div className="text-white/60 text-sm">Garmin, Strava, Samsung</div>
          </button>
        </div>

        {/* Activity Type Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "running", label: "Corrida" },
            { id: "cycling", label: "Ciclismo" },
            { id: "swimming", label: "Natação" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#10B981] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{activity.name}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.date}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-[#10B981]/20 border border-[#10B981] rounded-lg">
                  <div className="text-[#10B981] font-semibold text-sm">
                    {activity.type === "running" ? "Corrida" : activity.type === "cycling" ? "Ciclismo" : "Natação"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">Distância</div>
                  <div className="text-2xl font-bold text-white">{activity.distance} km</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Tempo</div>
                  <div className="text-2xl font-bold text-white">{activity.duration}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">
                    {activity.type === "cycling" ? "Vel. Média" : "Pace"}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {activity.pace} {activity.type === "cycling" ? "km/h" : "min/km"}
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-1">Calorias</div>
                  <div className="text-2xl font-bold text-white">{activity.calories}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>FC Média: {activity.avgHR} bpm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4" />
                  <span>Elevação: {activity.elevation}m</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Integration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Integrações Disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Garmin Connect", "Strava", "Samsung Health"].map((integration, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-xl border border-white/10 text-center"
              >
                <div className="text-white font-semibold mb-2">{integration}</div>
                <button className="text-[#10B981] text-sm hover:underline">
                  Conectar
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
