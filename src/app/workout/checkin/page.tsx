"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/custom/navbar";
import { 
  Play, Pause, Check, ChevronRight, Timer, 
  Dumbbell, TrendingUp, RotateCcw, Plus, Minus 
} from "lucide-react";

export default function WorkoutCheckinPage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [sets, setSets] = useState([
    { reps: 12, weight: 20, completed: false },
    { reps: 10, weight: 22.5, completed: false },
    { reps: 8, weight: 25, completed: false },
  ]);

  const workout = {
    name: "Treino de Peito e Tríceps",
    exercises: [
      { name: "Supino Reto", muscleGroup: "Peito", sets: 3, reps: "12-10-8", rest: 60 },
      { name: "Supino Inclinado", muscleGroup: "Peito", sets: 3, reps: "12-10-8", rest: 60 },
      { name: "Crucifixo", muscleGroup: "Peito", sets: 3, reps: "12", rest: 45 },
      { name: "Tríceps Testa", muscleGroup: "Tríceps", sets: 3, reps: "12-10-8", rest: 45 },
      { name: "Tríceps Corda", muscleGroup: "Tríceps", sets: 3, reps: "15", rest: 45 },
    ]
  };

  const currentEx = workout.exercises[currentExercise];

  const completeSet = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
  };

  const updateWeight = (index: number, delta: number) => {
    const newSets = [...sets];
    newSets[index].weight = Math.max(0, newSets[index].weight + delta);
    setSets(newSets);
  };

  const nextExercise = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSets([
        { reps: 12, weight: 20, completed: false },
        { reps: 10, weight: 22.5, completed: false },
        { reps: 8, weight: 25, completed: false },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A5F7A] via-[#5A6B7D] to-[#6B7F5E]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">{workout.name}</h1>
          <div className="flex items-center gap-4 text-white/70">
            <span>Exercício {currentExercise + 1} de {workout.exercises.length}</span>
            <span>•</span>
            <span>60 min estimado</span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentExercise + 1) / workout.exercises.length) * 100}%` }}
              className="h-full bg-[#10B981]"
            />
          </div>
        </div>

        {/* Current Exercise Card */}
        <motion.div
          key={currentExercise}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-6"
        >
          {/* Exercise Info */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{currentEx.name}</h2>
                <div className="flex items-center gap-2 text-white/70">
                  <Dumbbell className="w-5 h-5" />
                  <span>{currentEx.muscleGroup}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-sm mb-1">Descanso</div>
                <div className="text-2xl font-bold text-white">{currentEx.rest}s</div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm">
                {currentEx.sets} séries
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm">
                {currentEx.reps} reps
              </div>
            </div>
          </div>

          {/* Sets */}
          <div className="space-y-4 mb-8">
            {sets.map((set, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all ${
                  set.completed
                    ? "bg-[#10B981]/20 border-[#10B981]"
                    : "bg-white/5 border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-semibold">Série {index + 1}</div>
                  <button
                    onClick={() => completeSet(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      set.completed
                        ? "bg-[#10B981] text-white"
                        : "bg-white/10 text-white/50 hover:bg-white/20"
                    }`}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Reps */}
                  <div>
                    <div className="text-white/70 text-sm mb-2">Repetições</div>
                    <div className="text-2xl font-bold text-white">{set.reps}</div>
                  </div>

                  {/* Weight */}
                  <div>
                    <div className="text-white/70 text-sm mb-2">Carga (kg)</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateWeight(index, -2.5)}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="text-2xl font-bold text-white flex-1 text-center">
                        {set.weight}
                      </div>
                      <button
                        onClick={() => updateWeight(index, 2.5)}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest Timer */}
          {isResting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-6 bg-[#10B981]/20 border-2 border-[#10B981] rounded-xl text-center"
            >
              <Timer className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-4xl font-bold text-white mb-2">{restTime}s</div>
              <div className="text-white/80">Descansando...</div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsResting(!isResting)}
              className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isResting ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isResting ? "Pausar" : "Iniciar Descanso"}
            </button>
            <button
              onClick={nextExercise}
              disabled={currentExercise === workout.exercises.length - 1}
              className="flex-1 py-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Próximo Exercício
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Exercise List */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Exercícios do Treino</h3>
          <div className="space-y-2">
            {workout.exercises.map((ex, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all ${
                  index === currentExercise
                    ? "bg-[#10B981]/20 border-2 border-[#10B981]"
                    : index < currentExercise
                    ? "bg-white/5 opacity-50"
                    : "bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{ex.name}</div>
                    <div className="text-white/60 text-sm">
                      {ex.sets} séries • {ex.reps} reps
                    </div>
                  </div>
                  {index < currentExercise && (
                    <Check className="w-6 h-6 text-[#10B981]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
