"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Menu, X, Home, Dumbbell, Apple, 
  Route, BarChart3, Settings, User 
} from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Treinos", href: "/workouts", icon: Dumbbell },
    { label: "Nutrição", href: "/nutrition", icon: Apple },
    { label: "Externos", href: "/external", icon: Route },
    { label: "Progresso", href: "/progress", icon: BarChart3 },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Activity className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-white font-geist-mono tracking-tight">MetaFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 transition-colors ${
                  isActive(item.href)
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="w-px h-6 bg-white/20" />
            
            <Link
              href="/settings"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <Link
              href="/profile"
              className="text-white/70 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-2 overflow-hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="h-px bg-white/20 my-2" />
              
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
