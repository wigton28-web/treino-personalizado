import type { 
  OnboardingData, 
  WorkoutPlan, 
  Exercise, 
  NutritionPlan,
  Goal 
} from "./types";

// Simula geração de treino por IA baseado nos dados do onboarding
export function generateWorkoutPlan(onboardingData: OnboardingData): WorkoutPlan {
  const { personalInfo, healthInfo, goals, preferences } = onboardingData.data;

  // Determina intensidade baseada no nível de fitness
  const intensity = healthInfo?.fitnessLevel === "beginner" ? 0.6 :
                   healthInfo?.fitnessLevel === "intermediate" ? 0.75 : 0.9;

  // Gera exercícios baseados nas preferências
  const exercises = generateExercises(
    preferences?.location || "gym",
    goals?.primary || "muscle_gain",
    intensity
  );

  return {
    id: `plan_${Date.now()}`,
    userId: "user_1",
    name: getWorkoutPlanName(goals?.primary || "muscle_gain"),
    description: getWorkoutDescription(goals?.primary || "muscle_gain"),
    duration: 12, // weeks
    exercises,
    schedule: generateSchedule(preferences?.frequency || 4),
    createdBy: "ai",
    createdAt: new Date()
  };
}

function getWorkoutPlanName(goal: Goal): string {
  const names: Record<Goal, string> = {
    weight_loss: "Plano de Emagrecimento Inteligente",
    muscle_gain: "Hipertrofia Progressiva",
    performance: "Performance e Força",
    health: "Saúde e Bem-Estar",
    endurance: "Resistência e Condicionamento"
  };
  return names[goal];
}

function getWorkoutDescription(goal: Goal): string {
  const descriptions: Record<Goal, string> = {
    weight_loss: "Treino focado em queima calórica e definição muscular",
    muscle_gain: "Programa de hipertrofia com progressão de carga",
    performance: "Desenvolvimento de força máxima e explosiva",
    health: "Treino equilibrado para saúde geral",
    endurance: "Melhora de resistência cardiovascular e muscular"
  };
  return descriptions[goal];
}

function generateExercises(
  location: string,
  goal: Goal,
  intensity: number
): Exercise[] {
  const baseExercises: Exercise[] = [
    {
      id: "ex_1",
      name: "Supino Reto",
      category: "strength",
      muscleGroups: ["Peito", "Tríceps", "Ombros"],
      equipment: ["Barra", "Banco"],
      sets: 3,
      reps: Math.round(12 * intensity),
      rest: 60,
      instructions: "Deite no banco, pegue a barra com pegada média, desça até o peito e empurre.",
      difficulty: "intermediate"
    },
    {
      id: "ex_2",
      name: "Agachamento Livre",
      category: "strength",
      muscleGroups: ["Quadríceps", "Glúteos", "Posterior"],
      equipment: ["Barra", "Rack"],
      sets: 4,
      reps: Math.round(10 * intensity),
      rest: 90,
      instructions: "Com a barra nas costas, desça mantendo as costas retas até 90 graus.",
      difficulty: "advanced"
    },
    {
      id: "ex_3",
      name: "Levantamento Terra",
      category: "strength",
      muscleGroups: ["Costas", "Posterior", "Core"],
      equipment: ["Barra"],
      sets: 3,
      reps: Math.round(8 * intensity),
      rest: 120,
      instructions: "Pegue a barra do chão mantendo as costas retas e levante até a posição ereta.",
      difficulty: "advanced"
    },
    {
      id: "ex_4",
      name: "Desenvolvimento com Halteres",
      category: "strength",
      muscleGroups: ["Ombros", "Tríceps"],
      equipment: ["Halteres", "Banco"],
      sets: 3,
      reps: Math.round(12 * intensity),
      rest: 60,
      instructions: "Sentado, empurre os halteres acima da cabeça até extensão completa.",
      difficulty: "intermediate"
    },
    {
      id: "ex_5",
      name: "Remada Curvada",
      category: "strength",
      muscleGroups: ["Costas", "Bíceps"],
      equipment: ["Barra"],
      sets: 3,
      reps: Math.round(10 * intensity),
      rest: 60,
      instructions: "Curvado, puxe a barra em direção ao abdômen mantendo as costas retas.",
      difficulty: "intermediate"
    }
  ];

  // Adiciona exercícios de cardio se o objetivo for perda de peso
  if (goal === "weight_loss") {
    baseExercises.push({
      id: "ex_cardio_1",
      name: "Corrida Intervalada",
      category: "cardio",
      muscleGroups: ["Pernas", "Cardiovascular"],
      equipment: ["Esteira"],
      duration: 1200, // 20 minutos
      instructions: "Alterne entre 1 min de corrida intensa e 2 min de caminhada.",
      difficulty: "intermediate"
    });
  }

  return baseExercises;
}

function generateSchedule(frequency: number) {
  const schedules = [
    { dayOfWeek: 1, exercises: ["ex_1", "ex_4"], estimatedDuration: 60 },
    { dayOfWeek: 3, exercises: ["ex_2", "ex_5"], estimatedDuration: 70 },
    { dayOfWeek: 5, exercises: ["ex_3", "ex_1"], estimatedDuration: 65 }
  ];

  return schedules.slice(0, frequency);
}

// Gera plano nutricional baseado nos dados
export function generateNutritionPlan(onboardingData: OnboardingData): NutritionPlan {
  const { personalInfo, goals } = onboardingData.data;
  
  const weight = personalInfo?.weight || 70;
  const goal = goals?.primary || "muscle_gain";

  // Calcula calorias baseado no objetivo
  const bmr = calculateBMR(
    weight,
    personalInfo?.height || 170,
    personalInfo?.age || 30,
    personalInfo?.gender || "male"
  );

  const tdee = bmr * 1.5; // Fator de atividade moderada
  
  let dailyCalories = tdee;
  if (goal === "weight_loss") dailyCalories = tdee - 500;
  if (goal === "muscle_gain") dailyCalories = tdee + 300;

  // Calcula macros
  const proteinGrams = weight * 2; // 2g por kg
  const fatsGrams = (dailyCalories * 0.25) / 9; // 25% das calorias
  const carbsGrams = (dailyCalories - (proteinGrams * 4 + fatsGrams * 9)) / 4;

  return {
    id: `nutrition_${Date.now()}`,
    userId: "user_1",
    name: `Plano Nutricional - ${goal === "weight_loss" ? "Emagrecimento" : "Hipertrofia"}`,
    dailyCalories: Math.round(dailyCalories),
    macros: {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fats: Math.round(fatsGrams)
    },
    meals: [],
    restrictions: [],
    createdAt: new Date()
  };
}

function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: string
): number {
  // Fórmula de Harris-Benedict
  if (gender === "male") {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

// Gera insights e recomendações baseado no progresso
export function generateAIInsights(
  workoutHistory: any[],
  nutritionLog: any[]
): string[] {
  const insights: string[] = [];

  // Análise de consistência
  const recentWorkouts = workoutHistory.slice(0, 7);
  const consistency = (recentWorkouts.length / 7) * 100;

  if (consistency >= 80) {
    insights.push("✨ Excelente consistência! Você está no caminho certo.");
  } else if (consistency >= 50) {
    insights.push("💪 Boa frequência de treinos. Tente manter a consistência.");
  } else {
    insights.push("⚠️ Sua frequência de treinos está baixa. Que tal retomar o ritmo?");
  }

  // Análise de progressão
  insights.push("📈 Seus ganhos de força estão acima da média para seu nível.");

  // Recomendações
  insights.push("🎯 Continue assim e você atingirá sua meta em breve.");
  insights.push("⚡ Sugestão: Aumente a carga em 2.5kg nos exercícios principais.");

  return insights;
}

// Ajusta treino baseado em medicamentos (GLP-1, etc)
export function adjustWorkoutForMedication(
  workout: WorkoutPlan,
  medicationType: string
): WorkoutPlan {
  if (medicationType === "glp1") {
    // Reduz volume mas mantém intensidade para preservar massa muscular
    return {
      ...workout,
      description: workout.description + " (Ajustado para uso de GLP-1)",
      exercises: workout.exercises.map(ex => ({
        ...ex,
        sets: ex.sets ? Math.max(2, ex.sets - 1) : ex.sets,
        rest: ex.rest ? ex.rest + 15 : ex.rest // Mais descanso
      }))
    };
  }

  return workout;
}
