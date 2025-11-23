import { useState, useEffect } from "react";
import type { WorkoutSession, WorkoutPlan } from "@/lib/types";

export function useWorkout() {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutPlan | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const loadWorkoutData = () => {
    try {
      const storedWorkout = localStorage.getItem("metaflow_current_workout");
      const storedHistory = localStorage.getItem("metaflow_workout_history");

      if (storedWorkout) {
        setCurrentWorkout(JSON.parse(storedWorkout));
      }

      if (storedHistory) {
        setWorkoutHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Error loading workout data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveWorkoutSession = (session: WorkoutSession) => {
    const updated = [session, ...workoutHistory];
    setWorkoutHistory(updated);
    localStorage.setItem("metaflow_workout_history", JSON.stringify(updated));
  };

  const updateCurrentWorkout = (workout: WorkoutPlan) => {
    setCurrentWorkout(workout);
    localStorage.setItem("metaflow_current_workout", JSON.stringify(workout));
  };

  return {
    currentWorkout,
    workoutHistory,
    isLoading,
    saveWorkoutSession,
    updateCurrentWorkout,
  };
}
