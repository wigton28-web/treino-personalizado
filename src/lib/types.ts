// Types for MetaFlow Platform

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: 'male' | 'female' | 'other';
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  goals?: Goal[];
  restrictions?: string[];
  preferences?: TrainingPreference;
  createdAt: Date;
  updatedAt: Date;
}

export type Goal = 
  | 'weight_loss'
  | 'muscle_gain'
  | 'performance'
  | 'health'
  | 'endurance';

export interface TrainingPreference {
  location: 'gym' | 'home' | 'outdoor' | 'mixed';
  frequency: number; // days per week
  duration: number; // minutes per session
  equipment: string[];
  focusAreas: string[];
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // weeks
  exercises: Exercise[];
  schedule: WorkoutSchedule[];
  createdBy: 'ai' | 'trainer' | 'user';
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance';
  muscleGroups: string[];
  equipment: string[];
  sets?: number;
  reps?: number;
  duration?: number; // seconds
  rest?: number; // seconds
  instructions: string;
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkoutSchedule {
  dayOfWeek: number; // 0-6
  exercises: string[]; // exercise IDs
  estimatedDuration: number; // minutes
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutPlanId: string;
  date: Date;
  exercises: CompletedExercise[];
  totalDuration: number; // minutes
  caloriesBurned?: number;
  notes?: string;
  rating?: number; // 1-5
}

export interface CompletedExercise {
  exerciseId: string;
  sets: {
    reps: number;
    weight?: number;
    duration?: number;
    completed: boolean;
  }[];
  restTime: number; // actual rest taken
  notes?: string;
}

export interface NutritionPlan {
  id: string;
  userId: string;
  name: string;
  dailyCalories: number;
  macros: {
    protein: number; // grams
    carbs: number;
    fats: number;
  };
  meals: Meal[];
  restrictions: string[];
  createdAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  time: string; // HH:mm
  foods: FoodItem[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface ExternalActivity {
  id: string;
  userId: string;
  type: 'running' | 'cycling' | 'swimming' | 'other';
  date: Date;
  duration: number; // minutes
  distance?: number; // km
  elevation?: number; // meters
  avgHeartRate?: number;
  maxHeartRate?: number;
  calories?: number;
  route?: RouteData;
  source: 'manual' | 'garmin' | 'strava' | 'samsung_health';
}

export interface RouteData {
  coordinates: { lat: number; lng: number; elevation?: number }[];
  totalDistance: number;
  totalElevation: number;
  splits: Split[];
}

export interface Split {
  distance: number; // km
  time: number; // seconds
  pace: number; // min/km
  elevation: number;
}

export interface ProgressReport {
  id: string;
  userId: string;
  period: 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  metrics: {
    workoutsCompleted: number;
    totalDuration: number; // minutes
    caloriesBurned: number;
    weightChange?: number;
    strengthGains?: { exercise: string; improvement: number }[];
    consistency: number; // percentage
  };
  insights: string[];
  recommendations: string[];
  generatedAt: Date;
}

export interface MedicationSupport {
  id: string;
  userId: string;
  medicationType: 'glp1' | 'other';
  startDate: Date;
  dosage: string;
  sideEffects: string[];
  adjustments: {
    nutrition: string[];
    training: string[];
  };
}

export interface OnboardingData {
  step: number;
  completed: boolean;
  data: {
    personalInfo?: {
      name: string;
      age: number;
      gender: string;
      weight: number;
      height: number;
    };
    healthInfo?: {
      fitnessLevel: string;
      injuries: string[];
      medications: string[];
      restrictions: string[];
    };
    goals?: {
      primary: Goal;
      secondary: Goal[];
      targetWeight?: number;
      targetDate?: Date;
    };
    preferences?: TrainingPreference;
  };
}
