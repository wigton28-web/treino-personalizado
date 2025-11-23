// Constantes da aplicação MetaFlow

export const APP_NAME = "MetaFlow";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "Plataforma de treino fitness com IA personalizada";

// Cores do tema
export const COLORS = {
  primary: "#10B981",
  primaryDark: "#059669",
  secondary: "#6B7F5E",
  tertiary: "#4A5F7A",
  quaternary: "#5A6B7D",
  background: {
    from: "#4A5F7A",
    via: "#5A6B7D",
    to: "#6B7F5E"
  }
} as const;

// Níveis de fitness
export const FITNESS_LEVELS = [
  { value: "beginner", label: "Iniciante", description: "Pouca ou nenhuma experiência" },
  { value: "intermediate", label: "Intermediário", description: "Treina regularmente há alguns meses" },
  { value: "advanced", label: "Avançado", description: "Treina há anos com consistência" }
] as const;

// Objetivos disponíveis
export const GOALS = [
  { 
    value: "weight_loss", 
    label: "Emagrecimento", 
    description: "Perder gordura corporal",
    icon: "Flame"
  },
  { 
    value: "muscle_gain", 
    label: "Ganho de Massa", 
    description: "Hipertrofia muscular",
    icon: "Dumbbell"
  },
  { 
    value: "performance", 
    label: "Performance", 
    description: "Melhorar força e desempenho",
    icon: "TrendingUp"
  },
  { 
    value: "health", 
    label: "Saúde", 
    description: "Bem-estar geral",
    icon: "Heart"
  },
  { 
    value: "endurance", 
    label: "Resistência", 
    description: "Condicionamento cardiovascular",
    icon: "Activity"
  }
] as const;

// Locais de treino
export const TRAINING_LOCATIONS = [
  { value: "gym", label: "Academia", icon: "Dumbbell" },
  { value: "home", label: "Casa", icon: "Home" },
  { value: "outdoor", label: "Ar Livre", icon: "Sun" },
  { value: "mixed", label: "Misto", icon: "Shuffle" }
] as const;

// Equipamentos disponíveis
export const EQUIPMENT = [
  "Barra",
  "Halteres",
  "Banco",
  "Rack",
  "Esteira",
  "Bicicleta",
  "Elíptico",
  "Kettlebell",
  "Faixas Elásticas",
  "TRX",
  "Bola Suíça",
  "Corda Naval",
  "Medicine Ball",
  "Nenhum (Peso Corporal)"
] as const;

// Grupos musculares
export const MUSCLE_GROUPS = [
  "Peito",
  "Costas",
  "Ombros",
  "Bíceps",
  "Tríceps",
  "Antebraços",
  "Abdômen",
  "Quadríceps",
  "Posterior",
  "Glúteos",
  "Panturrilhas",
  "Core"
] as const;

// Tipos de exercício
export const EXERCISE_CATEGORIES = [
  { value: "strength", label: "Força", icon: "Dumbbell" },
  { value: "cardio", label: "Cardio", icon: "Activity" },
  { value: "flexibility", label: "Flexibilidade", icon: "Wind" },
  { value: "balance", label: "Equilíbrio", icon: "Target" }
] as const;

// Frequência de treino
export const TRAINING_FREQUENCY = [
  { value: 2, label: "2x por semana" },
  { value: 3, label: "3x por semana" },
  { value: 4, label: "4x por semana" },
  { value: 5, label: "5x por semana" },
  { value: 6, label: "6x por semana" }
] as const;

// Duração de sessão
export const SESSION_DURATION = [
  { value: 30, label: "30 minutos" },
  { value: 45, label: "45 minutos" },
  { value: 60, label: "60 minutos" },
  { value: 90, label: "90 minutos" }
] as const;

// Restrições comuns
export const COMMON_RESTRICTIONS = [
  "Lesão no joelho",
  "Lesão no ombro",
  "Lesão nas costas",
  "Problemas cardíacos",
  "Hipertensão",
  "Diabetes",
  "Asma",
  "Gravidez",
  "Pós-cirurgia"
] as const;

// Restrições alimentares
export const DIETARY_RESTRICTIONS = [
  "Vegetariano",
  "Vegano",
  "Sem Lactose",
  "Sem Glúten",
  "Low Carb",
  "Cetogênica",
  "Paleo",
  "Mediterrânea",
  "Diabetes",
  "Hipertensão"
] as const;

// Tipos de atividade externa
export const EXTERNAL_ACTIVITIES = [
  { value: "running", label: "Corrida", icon: "Route" },
  { value: "cycling", label: "Ciclismo", icon: "Bike" },
  { value: "swimming", label: "Natação", icon: "Waves" },
  { value: "hiking", label: "Caminhada", icon: "Mountain" },
  { value: "other", label: "Outro", icon: "Activity" }
] as const;

// Integrações disponíveis
export const INTEGRATIONS = [
  { 
    id: "garmin", 
    name: "Garmin Connect", 
    description: "Sincronize seus treinos e atividades",
    icon: "Watch"
  },
  { 
    id: "strava", 
    name: "Strava", 
    description: "Importe corridas e ciclismo",
    icon: "Route"
  },
  { 
    id: "samsung", 
    name: "Samsung Health", 
    description: "Conecte seu Galaxy Watch",
    icon: "Smartphone"
  },
  { 
    id: "apple", 
    name: "Apple Health", 
    description: "Sincronize com Apple Watch",
    icon: "Watch"
  }
] as const;

// Tipos de medicamento
export const MEDICATION_TYPES = [
  { 
    value: "glp1", 
    label: "GLP-1 (Ozempic, Wegovy, etc)", 
    description: "Agonistas do receptor GLP-1"
  },
  { 
    value: "other", 
    label: "Outro", 
    description: "Outros medicamentos"
  }
] as const;

// Configurações padrão
export const DEFAULT_SETTINGS = {
  notifications: {
    workoutReminders: true,
    mealReminders: true,
    progressReports: true,
    achievements: true
  },
  appearance: {
    darkMode: true,
    colorScheme: "green"
  },
  units: {
    weight: "kg",
    distance: "km",
    temperature: "celsius"
  },
  privacy: {
    shareProgress: false,
    publicProfile: false
  }
} as const;

// Metas de macronutrientes por objetivo
export const MACRO_TARGETS = {
  weight_loss: {
    protein: 0.35, // 35% das calorias
    carbs: 0.35,   // 35% das calorias
    fats: 0.30     // 30% das calorias
  },
  muscle_gain: {
    protein: 0.30,
    carbs: 0.50,
    fats: 0.20
  },
  performance: {
    protein: 0.25,
    carbs: 0.55,
    fats: 0.20
  },
  health: {
    protein: 0.25,
    carbs: 0.50,
    fats: 0.25
  },
  endurance: {
    protein: 0.20,
    carbs: 0.60,
    fats: 0.20
  }
} as const;

// Faixas de frequência cardíaca
export const HEART_RATE_ZONES = [
  { zone: 1, name: "Recuperação", min: 50, max: 60, color: "#6B7F5E" },
  { zone: 2, name: "Aeróbico Leve", min: 60, max: 70, color: "#10B981" },
  { zone: 3, name: "Aeróbico", min: 70, max: 80, color: "#059669" },
  { zone: 4, name: "Limiar", min: 80, max: 90, color: "#F59E0B" },
  { zone: 5, name: "Máximo", min: 90, max: 100, color: "#EF4444" }
] as const;

// Mensagens motivacionais
export const MOTIVATIONAL_MESSAGES = [
  "Você está arrasando! 💪",
  "Cada treino te deixa mais forte! 🔥",
  "Consistência é a chave do sucesso! ⭐",
  "Seu esforço está valendo a pena! 🎯",
  "Continue assim, campeão! 🏆",
  "Você é mais forte do que pensa! 💎",
  "Progresso, não perfeição! 📈",
  "Seu futuro eu agradece! 🙌"
] as const;

// Limites e validações
export const VALIDATION = {
  age: { min: 13, max: 120 },
  weight: { min: 30, max: 300 },
  height: { min: 100, max: 250 },
  workoutDuration: { min: 10, max: 240 },
  restTime: { min: 15, max: 300 },
  sets: { min: 1, max: 10 },
  reps: { min: 1, max: 100 }
} as const;
