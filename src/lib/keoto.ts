/**
 * Keoto API Client
 * Serviço para integração com a API de pagamentos Keoto
 */

import { env } from "./env";

const KEOTO_API_URL = "https://api.keoto.com.br/v1";
const KEOTO_TOKEN = env.KEOTO_API_TOKEN;

export interface KeootoCheckoutParams {
  planId: "pro" | "premium";
  billingCycle: "monthly" | "annual";
  customerEmail?: string;
  customerName?: string;
}

export interface KeootoCheckoutResponse {
  checkoutUrl: string;
  subscriptionId: string;
  status: string;
}

/**
 * Cria uma sessão de checkout na Keoto
 */
export async function createKeootoCheckout(
  params: KeootoCheckoutParams
): Promise<KeootoCheckoutResponse> {
  try {
    // Mapear planos para valores
    const planPrices = {
      pro: {
        monthly: 14.90,
        annual: 178.80,
      },
      premium: {
        monthly: 19.90,
        annual: 238.80,
      },
    };

    const price = planPrices[params.planId][params.billingCycle];
    
    // Preparar dados do produto
    const productData = {
      name: `Plano ${params.planId.toUpperCase()} - ${params.billingCycle === "monthly" ? "Mensal" : "Anual"}`,
      price: price,
      currency: "BRL",
      billingCycle: params.billingCycle === "monthly" ? "monthly" : "yearly",
      trialDays: params.billingCycle === "monthly" ? (params.planId === "pro" ? 5 : 7) : 0,
    };

    const response = await fetch(`${KEOTO_API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${KEOTO_TOKEN}`,
      },
      body: JSON.stringify({
        product: productData,
        customer: {
          email: params.customerEmail,
          name: params.customerName,
        },
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API Keoto: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar checkout Keoto:", error);
    throw error;
  }
}

/**
 * Verifica o status de uma assinatura
 */
export async function getSubscriptionStatus(subscriptionId: string) {
  try {
    const response = await fetch(`${KEOTO_API_URL}/subscriptions/${subscriptionId}`, {
      headers: {
        "Authorization": `Bearer ${KEOTO_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar assinatura: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao verificar status da assinatura:", error);
    throw error;
  }
}

/**
 * Cancela uma assinatura
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const response = await fetch(`${KEOTO_API_URL}/subscriptions/${subscriptionId}/cancel`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KEOTO_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao cancelar assinatura: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cancelar assinatura:", error);
    throw error;
  }
}
