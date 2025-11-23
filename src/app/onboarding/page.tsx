"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  User, Heart, Target, Dumbbell, Home, 
  ChevronRight, ChevronLeft, Check, Activity 
} from "lucide-react";
import type { OnboardingData, Goal, TrainingPreference } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData["data"]>({});

  const totalSteps = 4;

  const updateData = (section: keyof OnboardingData["data"], values: any) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], ...values } }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save data and redirect to dashboard
      localStorage.setItem("metaflow_onboarding", JSON.stringify(data));
      router.push("/dashboard");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A5F7A] via-[#5A6B7D] to-[#6B7F5E] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">MetaFlow</h1>
          </div>
          <p className="text-white/80 text-lg">Vamos personalizar sua experiência</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-1/4 h-2 rounded-full mx-1 transition-all duration-300 ${
                  step <= currentStep ? "bg-[#10B981]" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <p className="text-white/60 text-sm text-center">
            Etapa {currentStep} de {totalSteps}
          </p>
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1 key="step1" data={data} updateData={updateData} />
            )}
            {currentStep === 2 && (
              <Step2 key="step2" data={data} updateData={updateData} />
            )}
            {currentStep === 3 && (
              <Step3 key="step3" data={data} updateData={updateData} />
            )}
            {currentStep === 4 && (
              <Step4 key="step4" data={data} updateData={updateData} />
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition-all hover:scale-105 shadow-lg"
            >
              {currentStep === totalSteps ? (
                <>
                  Finalizar
                  <Check className="w-5 h-5" />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Step 1: Personal Info
function Step1({ data, updateData }: any) {
  const [formData, setFormData] = useState(data.personalInfo || {
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: ""
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData("personalInfo", newData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Informações Pessoais</h2>
          <p className="text-white/70">Conte-nos um pouco sobre você</p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nome completo"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Idade"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="">Gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Peso (kg)"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
          <input
            type="number"
            placeholder="Altura (cm)"
            value={formData.height}
            onChange={(e) => handleChange("height", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Step 2: Health Info
function Step2({ data, updateData }: any) {
  const [formData, setFormData] = useState(data.healthInfo || {
    fitnessLevel: "",
    injuries: "",
    medications: "",
    restrictions: ""
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData("healthInfo", newData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Saúde e Condicionamento</h2>
          <p className="text-white/70">Informações importantes para sua segurança</p>
        </div>
      </div>

      <div className="space-y-4">
        <select
          value={formData.fitnessLevel}
          onChange={(e) => handleChange("fitnessLevel", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        >
          <option value="">Nível de condicionamento</option>
          <option value="beginner">Iniciante</option>
          <option value="intermediate">Intermediário</option>
          <option value="advanced">Avançado</option>
        </select>

        <textarea
          placeholder="Lesões ou limitações físicas (opcional)"
          value={formData.injuries}
          onChange={(e) => handleChange("injuries", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none"
        />

        <textarea
          placeholder="Medicamentos em uso (opcional)"
          value={formData.medications}
          onChange={(e) => handleChange("medications", e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none"
        />

        <textarea
          placeholder="Restrições alimentares (opcional)"
          value={formData.restrictions}
          onChange={(e) => handleChange("restrictions", e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none"
        />
      </div>
    </motion.div>
  );
}

// Step 3: Goals
function Step3({ data, updateData }: any) {
  const [selected, setSelected] = useState<string[]>(data.goals?.secondary || []);
  const [primary, setPrimary] = useState(data.goals?.primary || "");

  const goals = [
    { id: "weight_loss", label: "Emagrecimento", icon: Target },
    { id: "muscle_gain", label: "Ganho de Massa", icon: Dumbbell },
    { id: "performance", label: "Performance", icon: Activity },
    { id: "health", label: "Saúde Geral", icon: Heart },
    { id: "endurance", label: "Resistência", icon: Activity }
  ];

  const toggleGoal = (goalId: string) => {
    const newSelected = selected.includes(goalId)
      ? selected.filter(g => g !== goalId)
      : [...selected, goalId];
    setSelected(newSelected);
    updateData("goals", { primary, secondary: newSelected });
  };

  const setPrimaryGoal = (goalId: string) => {
    setPrimary(goalId);
    updateData("goals", { primary: goalId, secondary: selected });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Seus Objetivos</h2>
          <p className="text-white/70">O que você quer alcançar?</p>
        </div>
      </div>

      <div>
        <p className="text-white font-semibold mb-3">Objetivo Principal:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setPrimaryGoal(goal.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                primary === goal.id
                  ? "bg-[#10B981] border-[#10B981] text-white"
                  : "bg-white/5 border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <goal.icon className="w-6 h-6 mb-2" />
              <span className="font-medium">{goal.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-white font-semibold mb-3">Objetivos Secundários (opcional):</p>
        <div className="flex flex-wrap gap-2">
          {goals.filter(g => g.id !== primary).map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selected.includes(goal.id)
                  ? "bg-white/20 text-white border border-white/40"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Step 4: Preferences
function Step4({ data, updateData }: any) {
  const [formData, setFormData] = useState(data.preferences || {
    location: "",
    frequency: "",
    duration: "",
    equipment: []
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData("preferences", newData);
  };

  const equipmentOptions = [
    "Halteres", "Barras", "Máquinas", "Elásticos", 
    "Kettlebell", "TRX", "Bicicleta", "Esteira"
  ];

  const toggleEquipment = (item: string) => {
    const current = formData.equipment || [];
    const newEquipment = current.includes(item)
      ? current.filter((e: string) => e !== item)
      : [...current, item];
    handleChange("equipment", newEquipment);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center">
          <Home className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Preferências de Treino</h2>
          <p className="text-white/70">Como você prefere treinar?</p>
        </div>
      </div>

      <div className="space-y-4">
        <select
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        >
          <option value="">Onde você treina?</option>
          <option value="gym">Academia</option>
          <option value="home">Casa</option>
          <option value="outdoor">Ar livre</option>
          <option value="mixed">Misto</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.frequency}
            onChange={(e) => handleChange("frequency", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="">Frequência/semana</option>
            <option value="2">2x por semana</option>
            <option value="3">3x por semana</option>
            <option value="4">4x por semana</option>
            <option value="5">5x por semana</option>
            <option value="6">6x por semana</option>
          </select>

          <select
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="">Duração/treino</option>
            <option value="30">30 minutos</option>
            <option value="45">45 minutos</option>
            <option value="60">60 minutos</option>
            <option value="90">90 minutos</option>
          </select>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Equipamentos disponíveis:</p>
          <div className="flex flex-wrap gap-2">
            {equipmentOptions.map((item) => (
              <button
                key={item}
                onClick={() => toggleEquipment(item)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  formData.equipment?.includes(item)
                    ? "bg-white/20 text-white border border-white/40"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
