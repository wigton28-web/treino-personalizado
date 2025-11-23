"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/custom/navbar";
import { 
  User, Bell, Shield, Palette, Globe, 
  Smartphone, Database, LogOut, ChevronRight,
  Moon, Sun, Vibrate
} from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);

  const settingsSections = [
    {
      title: "Conta",
      icon: User,
      items: [
        { label: "Perfil", description: "Nome, foto e informações pessoais", action: () => {} },
        { label: "Objetivos", description: "Atualize suas metas de treino", action: () => {} },
        { label: "Medidas", description: "Peso, altura e composição corporal", action: () => {} }
      ]
    },
    {
      title: "Notificações",
      icon: Bell,
      items: [
        { 
          label: "Lembretes de Treino", 
          description: "Receba alertas para não perder treinos",
          toggle: true,
          value: notifications,
          onChange: setNotifications
        },
        { 
          label: "Vibração", 
          description: "Feedback tátil durante treinos",
          toggle: true,
          value: vibration,
          onChange: setVibration
        },
        { label: "Horários", description: "Configure quando receber notificações", action: () => {} }
      ]
    },
    {
      title: "Aparência",
      icon: Palette,
      items: [
        { 
          label: "Modo Escuro", 
          description: "Interface com tema escuro",
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        },
        { label: "Tema de Cores", description: "Personalize as cores do app", action: () => {} }
      ]
    },
    {
      title: "Integrações",
      icon: Smartphone,
      items: [
        { label: "Garmin Connect", description: "Não conectado", action: () => {} },
        { label: "Strava", description: "Não conectado", action: () => {} },
        { label: "Samsung Health", description: "Não conectado", action: () => {} },
        { label: "Apple Health", description: "Não conectado", action: () => {} }
      ]
    },
    {
      title: "Dados e Privacidade",
      icon: Shield,
      items: [
        { label: "Exportar Dados", description: "Baixe todos os seus dados", action: () => {} },
        { label: "Limpar Cache", description: "Libere espaço de armazenamento", action: () => {} },
        { label: "Política de Privacidade", description: "Leia nossa política", action: () => {} }
      ]
    }
  ];

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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Configurações
          </h1>
          <p className="text-white/70">
            Personalize sua experiência no MetaFlow
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>

              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-white font-semibold mb-1">{item.label}</div>
                        <div className="text-white/60 text-sm">{item.description}</div>
                      </div>
                      
                      {item.toggle ? (
                        <button
                          onClick={() => item.onChange && item.onChange(!item.value)}
                          className={`w-12 h-6 rounded-full transition-all ${
                            item.value ? "bg-[#10B981]" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-all ${
                              item.value ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-white/40" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <button className="w-full p-4 bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500 rounded-2xl text-red-500 font-semibold transition-all flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </motion.div>

        {/* App Info */}
        <div className="mt-8 text-center text-white/40 text-sm">
          <p>MetaFlow v1.0.0</p>
          <p className="mt-1">© 2024 MetaFlow. Todos os direitos reservados.</p>
        </div>
      </main>
    </div>
  );
}
