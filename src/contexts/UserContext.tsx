"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { UserProfile, OnboardingData } from "@/lib/types";

interface UserContextType {
  user: UserProfile | null;
  onboardingData: OnboardingData | null;
  setUser: (user: UserProfile | null) => void;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load user data from localStorage
    const loadUserData = () => {
      try {
        if (typeof window !== "undefined") {
          const storedOnboarding = localStorage.getItem("metaflow_onboarding");
          const storedUser = localStorage.getItem("metaflow_user");

          if (storedOnboarding) {
            setOnboardingData(JSON.parse(storedOnboarding));
          }

          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [mounted]);

  const updateOnboarding = (data: Partial<OnboardingData>) => {
    const updated = { ...onboardingData, ...data } as OnboardingData;
    setOnboardingData(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("metaflow_onboarding", JSON.stringify(updated));
    }
  };

  const updateUser = (userData: UserProfile | null) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      if (userData) {
        localStorage.setItem("metaflow_user", JSON.stringify(userData));
      } else {
        localStorage.removeItem("metaflow_user");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        onboardingData,
        setUser: updateUser,
        updateOnboarding,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
