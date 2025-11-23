"use client";

import { motion } from "framer-motion";
import { Activity, Brain, TrendingUp, Zap, Dumbbell, Apple, Route } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Treinos adaptados ao seu perfil e objetivos em tempo real",
      color: "from-[#6B7F5E] to-[#4A5F7A]"
    },
    {
      icon: Dumbbell,
      title: "Controle Total",
      description: "Registre séries, cargas e acompanhe sua evolução detalhada",
      color: "from-[#4A5F7A] to-[#5A6B7D]"
    },
    {
      icon: Apple,
      title: "Nutrição Integrada",
      description: "Monitore calorias e macros alinhados aos seus objetivos",
      color: "from-[#5A6B7D] to-[#6B7F5E]"
    },
    {
      icon: Route,
      title: "Treinos Externos",
      description: "Sincronize corridas, ciclismo e natação com dispositivos",
      color: "from-[#6B7F5E] to-[#4A5F7A]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A5F7A] via-[#5A6B7D] to-[#6B7F5E]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center gap-3"
            >
              <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={2.5} />
              <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">
                MetaFlow
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto font-light"
            >
              Seu treino personalizado com inteligência artificial.
              <br />
              <span className="text-white/70">Evolua com dados, foco e consistência.</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-12 text-white/80"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">100%</div>
                <div className="text-sm sm:text-base">Personalizado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">24/7</div>
                <div className="text-sm sm:text-base">Disponível</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">∞</div>
                <div className="text-sm sm:text-base">Possibilidades</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-16"
          >
            Tudo que você precisa em um só lugar
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white text-center mb-16"
          >
            Como funciona
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { step: "1", title: "Responda o Quiz", desc: "Conte-nos sobre você, seus objetivos e preferências" },
              { step: "2", title: "IA Cria Seu Plano", desc: "Algoritmo inteligente gera treino e nutrição personalizados" },
              { step: "3", title: "Treine e Evolua", desc: "Acompanhe progresso, ajuste em tempo real e alcance resultados" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="flex items-start gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center text-white text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Pronto para transformar seu treino?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto px-4">
            Junte-se a milhares de pessoas que já estão alcançando seus objetivos
          </p>
          <Link href="/onboarding">
            <button className="group px-12 py-5 bg-[#10B981] hover:bg-[#059669] text-white text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-3">
                Iniciar Jornada
                <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
