import { useState, useEffect } from "react";
import type { NutritionPlan, Meal } from "@/lib/types";

export function useNutrition() {
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [dailyLog, setDailyLog] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNutritionData();
  }, []);

  const loadNutritionData = () => {
    try {
      const storedPlan = localStorage.getItem("metaflow_nutrition_plan");
      const storedLog = localStorage.getItem("metaflow_daily_nutrition");

      if (storedPlan) {
        setNutritionPlan(JSON.parse(storedPlan));
      }

      if (storedLog) {
        setDailyLog(JSON.parse(storedLog));
      }
    } catch (error) {
      console.error("Error loading nutrition data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logMeal = (meal: Meal) => {
    const updated = [...dailyLog, meal];
    setDailyLog(updated);
    localStorage.setItem("metaflow_daily_nutrition", JSON.stringify(updated));
  };

  const updateNutritionPlan = (plan: NutritionPlan) => {
    setNutritionPlan(plan);
    localStorage.setItem("metaflow_nutrition_plan", JSON.stringify(plan));
  };

  const getTodayTotals = () => {
    return dailyLog.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.totalCalories,
        protein: acc.protein + meal.macros.protein,
        carbs: acc.carbs + meal.macros.carbs,
        fats: acc.fats + meal.macros.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  return {
    nutritionPlan,
    dailyLog,
    isLoading,
    logMeal,
    updateNutritionPlan,
    getTodayTotals,
  };
}
