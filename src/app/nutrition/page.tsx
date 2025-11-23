"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/custom/navbar";
import { useNutrition } from "@/hooks/useNutrition";
import { 
  Apple, Plus, TrendingUp, Flame, Target,
  Search, Camera, Utensils, Clock
} from "lucide-react";

export default function NutritionPage() {
  const { nutritionPlan, dailyLog, logMeal, getTodayTotals } = useNutrition();
  const [searchQuery, setSearchQuery] = useState("");
  const todayTotals = getTodayTotals();

  const targetMacros = nutritionPlan || {
    dailyCalories: 2200,
    macros: { protein: 180, carbs: 220, fats: 60 }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const macroCards = [
    {
      label: "Calorias",
      current: todayTotals.calories,
      target: targetMacros.dailyCalories,
      unit: "kcal",
      icon: Flame,
      color: "from-[#10B981] to-[#059669]"
    },
    {
      label: "Proteína",
      current: todayTotals.protein,
      target: targetMacros.macros.protein,
      unit: "g",
      icon: Target,
      color: "from-[#6B7F5E] to-[#4A5F7A]"
    },
    {
      label: "Carboidratos",
      current: todayTotals.carbs,
      target: targetMacros.macros.carbs,
      unit: "g",
      icon: Apple,
      color: "from-[#4A5F7A] to-[#5A6B7D]"
    },
    {
      label: "Gorduras",
      current: todayTotals.fats,
      target: targetMacros.macros.fats,
      unit: "g",
      icon: TrendingUp,
      color: "from-[#5A6B7D] to-[#6B7F5E]"
    }
  ];

  const quickAddFoods = [
    { name: "Peito de Frango (100g)", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
    { name: "Arroz Integral (100g)", calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
    { name: "Batata Doce (100g)", calories: 86, protein: 1.6, carbs: 20, fats: 0.1 },
    { name: "Ovo (unidade)", calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3 },
    { name: "Banana (unidade)", calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
    { name: "Whey Protein (30g)", calories: 120, protein: 24, carbs: 3, fats: 1.5 }
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
            Nutrição
          </h1>
          <p className="text-white/70">
            Acompanhe sua alimentação e atinja suas metas
          </p>
        </motion.div>

        {/* Macro Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {macroCards.map((macro, index) => {
            const progress = calculateProgress(macro.current, macro.target);
            return (
              <motion.div
                key={macro.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${macro.color} flex items-center justify-center mb-3`}>
                  <macro.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white/70 text-sm mb-2">{macro.label}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {Math.round(macro.current)}/{macro.target}
                </div>
                <div className="text-white/60 text-xs mb-3">{macro.unit}</div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${macro.color} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Buscar alimentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />
          </div>
        </motion.div>

        {/* Quick Add Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <button className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-left group">
            <Camera className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-white font-semibold mb-1">Escanear Alimento</div>
            <div className="text-white/60 text-sm">Tire foto do rótulo nutricional</div>
          </button>

          <button className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-left group">
            <Utensils className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-white font-semibold mb-1">Adicionar Refeição</div>
            <div className="text-white/60 text-sm">Registre sua refeição completa</div>
          </button>

          <button className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-left group">
            <Clock className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-white font-semibold mb-1">Refeições Salvas</div>
            <div className="text-white/60 text-sm">Acesse suas refeições favoritas</div>
          </button>
        </div>

        {/* Quick Add Foods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Adicionar Rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickAddFoods.map((food, index) => (
              <button
                key={index}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-white font-medium text-sm">{food.name}</div>
                  <Plus className="w-5 h-5 text-[#10B981] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-white/60 text-xs space-y-1">
                  <div>{food.calories} kcal</div>
                  <div className="flex gap-2">
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>G: {food.fats}g</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Today's Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Registro de Hoje</h2>
          
          {dailyLog.length === 0 ? (
            <div className="text-center py-12">
              <Apple className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">Nenhuma refeição registrada hoje</p>
              <p className="text-white/40 text-sm mt-2">Comece adicionando sua primeira refeição</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyLog.map((meal, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white font-semibold">{meal.name}</div>
                      <div className="text-white/60 text-sm">{meal.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{meal.totalCalories} kcal</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-white/60 text-sm">
                    <span>P: {meal.macros.protein}g</span>
                    <span>C: {meal.macros.carbs}g</span>
                    <span>G: {meal.macros.fats}g</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
