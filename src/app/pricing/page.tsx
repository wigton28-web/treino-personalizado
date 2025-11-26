"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Shield, ArrowLeft, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createKeootoCheckout } from "@/lib/keoto";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "premium" | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    {
      id: "pro" as const,
      name: "PRÓ",
      description: "Funcionalidades básicas do web/app",
      monthlyPrice: "14,90",
      annualPrice: "178,80",
      monthlyTrial: "5 dias grátis",
      annualTrial: null,
      features: [
        "Treinos personalizados com IA",
        "Plano nutricional básico",
        "Acompanhamento de progresso",
        "Registro de atividades",
        "Suporte por email",
        "Acesso ao app mobile"
      ],
      color: "from-[#6B7F5E] to-[#4A5F7A]",
      popular: false
    },
    {
      id: "premium" as const,
      name: "PREMIUM",
      description: "Funcionalidades totais oferecidas pelo produto",
      monthlyPrice: "19,90",
      annualPrice: "238,80",
      monthlyTrial: "7 dias grátis",
      annualTrial: null,
      annualDiscount: "20%",
      features: [
        "Tudo do plano PRÓ",
        "Análises avançadas de performance",
        "Consultoria nutricional completa",
        "Suporte prioritário 24/7",
        "Acesso antecipado a novos recursos",
        "Relatórios personalizados detalhados",
        "Integração com wearables",
        "Planos de treino ilimitados"
      ],
      color: "from-[#10B981] to-[#059669]",
      popular: true,
      badge: "Mais Popular"
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  const handleCheckout = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);
    setError(null);

    try {
      const checkoutData = await createKeootoCheckout({
        planId: selectedPlan,
        billingCycle: billingCycle,
      });

      // Redirecionar para a URL de checkout da Keoto
      window.location.href = checkoutData.checkoutUrl;
    } catch (err) {
      console.error("Erro ao processar checkout:", err);
      setError("Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A5F7A] via-[#5A6B7D] to-[#6B7F5E]">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 sm:py-20">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Selecione o plano ideal para sua jornada de transformação
          </p>
        </motion.div>

        {/* Plan Selection - Step 1 */}
        {!selectedPlan && (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 transition-all hover:scale-[1.02] cursor-pointer ${
                  plan.popular
                    ? "border-[#10B981] shadow-2xl shadow-[#10B981]/20"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-[#10B981] text-white px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                    {plan.popular ? (
                      <Crown className="w-8 h-8 text-white" />
                    ) : (
                      <Zap className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 text-sm">{plan.description}</p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/90 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg ${
                    plan.popular
                      ? "bg-[#10B981] hover:bg-[#059669] text-white"
                      : "bg-white hover:bg-white/90 text-[#4A5F7A]"
                  }`}
                >
                  Selecionar {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Billing Selection - Step 2 */}
        {selectedPlan && selectedPlanData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar aos planos
            </button>

            {/* Selected Plan Header */}
            <div className="text-center mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedPlanData.color} flex items-center justify-center mx-auto mb-4`}>
                {selectedPlanData.popular ? (
                  <Crown className="w-10 h-10 text-white" />
                ) : (
                  <Zap className="w-10 h-10 text-white" />
                )}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Plano {selectedPlanData.name}
              </h2>
              <p className="text-white/70">Escolha a forma de pagamento</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-white rounded-xl p-4 mb-6"
              >
                {error}
              </motion.div>
            )}

            {/* Billing Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Monthly Option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "border-[#10B981] shadow-xl shadow-[#10B981]/20"
                    : "border-white/20 hover:border-white/40"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Mensal</h3>
                    <p className="text-white/70 text-sm">Pagamento mensal</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    billingCycle === "monthly" ? "border-[#10B981] bg-[#10B981]" : "border-white/40"
                  }`}>
                    {billingCycle === "monthly" && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">R$ {selectedPlanData.monthlyPrice}</span>
                    <span className="text-white/70">/mês</span>
                  </div>
                  {selectedPlanData.monthlyTrial && (
                    <div className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] px-3 py-1 rounded-full text-sm font-semibold">
                      <Star className="w-4 h-4" />
                      {selectedPlanData.monthlyTrial}
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Cobrança mensal
                  </li>
                  <li className="flex items-center gap-2 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Cancele quando quiser
                  </li>
                  {selectedPlanData.monthlyTrial && (
                    <li className="flex items-center gap-2 text-white/80 text-sm">
                      <Check className="w-4 h-4 text-[#10B981]" />
                      {selectedPlanData.monthlyTrial} após efetivação
                    </li>
                  )}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    billingCycle === "monthly"
                      ? "bg-[#10B981] hover:bg-[#059669] text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {billingCycle === "monthly" ? "Continuar" : "Selecionar"}
                </button>
              </motion.div>

              {/* Annual Option */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 transition-all cursor-pointer relative ${
                  billingCycle === "annual"
                    ? "border-[#10B981] shadow-xl shadow-[#10B981]/20"
                    : "border-white/20 hover:border-white/40"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                {selectedPlanData.annualDiscount && (
                  <div className="absolute -top-3 -right-3 bg-[#10B981] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    -{selectedPlanData.annualDiscount} OFF
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Anual</h3>
                    <p className="text-white/70 text-sm">Pagamento único</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    billingCycle === "annual" ? "border-[#10B981] bg-[#10B981]" : "border-white/40"
                  }`}>
                    {billingCycle === "annual" && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">R$ {selectedPlanData.annualPrice}</span>
                    <span className="text-white/70">/ano</span>
                  </div>
                  <div className="text-[#10B981] text-sm font-semibold">
                    Equivalente a R$ {(parseFloat(selectedPlanData.annualPrice.replace(',', '.')) / 12).toFixed(2).replace('.', ',')} por mês
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Cobrança anual
                  </li>
                  <li className="flex items-center gap-2 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Melhor custo-benefício
                  </li>
                  {selectedPlanData.annualDiscount && (
                    <li className="flex items-center gap-2 text-white/80 text-sm">
                      <Check className="w-4 h-4 text-[#10B981]" />
                      Economia de {selectedPlanData.annualDiscount}
                    </li>
                  )}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    billingCycle === "annual"
                      ? "bg-[#10B981] hover:bg-[#059669] text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {billingCycle === "annual" ? "Continuar" : "Selecionar"}
                </button>
              </motion.div>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Plano {selectedPlanData.name}</span>
                  <span className="font-semibold">
                    R$ {billingCycle === "monthly" ? selectedPlanData.monthlyPrice : selectedPlanData.annualPrice}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Período</span>
                  <span className="font-semibold">{billingCycle === "monthly" ? "Mensal" : "Anual"}</span>
                </div>
                {billingCycle === "monthly" && selectedPlanData.monthlyTrial && (
                  <div className="flex justify-between text-[#10B981]">
                    <span>Período de teste</span>
                    <span className="font-semibold">{selectedPlanData.monthlyTrial}</span>
                  </div>
                )}
                {billingCycle === "annual" && selectedPlanData.annualDiscount && (
                  <div className="flex justify-between text-[#10B981]">
                    <span>Desconto</span>
                    <span className="font-semibold">{selectedPlanData.annualDiscount}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span>R$ {billingCycle === "monthly" ? selectedPlanData.monthlyPrice : selectedPlanData.annualPrice}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Finalizar Assinatura"
                )}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Trust Badges */}
        {!selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <Shield className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Pagamento Seguro</h4>
                  <p className="text-white/70 text-sm">Criptografia de ponta a ponta</p>
                </div>
                <div>
                  <Zap className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Cancele Quando Quiser</h4>
                  <p className="text-white/70 text-sm">Sem taxas ou multas</p>
                </div>
                <div>
                  <Star className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-2">Período de Teste</h4>
                  <p className="text-white/70 text-sm">Experimente sem compromisso</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* FAQ Section */}
        {!selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto mt-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Como funciona o período de teste grátis?",
                  a: "No plano PRÓ mensal você tem 5 dias grátis, e no PREMIUM mensal são 7 dias grátis após a efetivação da compra. Você pode experimentar todos os recursos sem compromisso."
                },
                {
                  q: "Posso cancelar a qualquer momento?",
                  a: "Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Seu acesso continuará até o final do período pago."
                },
                {
                  q: "Qual a diferença entre PRÓ e PREMIUM?",
                  a: "O plano PRÓ oferece funcionalidades básicas ideais para começar. O PREMIUM inclui todas as funcionalidades do produto, com análises avançadas, consultoria completa e suporte prioritário 24/7."
                },
                {
                  q: "Qual o desconto do plano anual?",
                  a: "O plano PREMIUM anual oferece 20% de desconto sobre o valor total, sendo a melhor opção para quem busca resultados duradouros."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-white/70">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
