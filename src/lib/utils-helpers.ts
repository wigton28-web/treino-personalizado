// Formatação de tempo
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
  return `${secs}s`;
}

// Formatação de data
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Hoje";
  if (days === 1) return "Ontem";
  if (days < 7) return `${days} dias atrás`;
  
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short"
  });
}

// Formatação de distância
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${meters} m`;
}

// Formatação de pace (min/km)
export function formatPace(secondsPerKm: number): string {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.floor(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")} min/km`;
}

// Calcula pace a partir de tempo e distância
export function calculatePace(durationSeconds: number, distanceKm: number): number {
  return durationSeconds / distanceKm;
}

// Calcula calorias queimadas (estimativa simples)
export function calculateCalories(
  durationMinutes: number,
  weight: number,
  activityType: "strength" | "cardio" | "flexibility"
): number {
  const met: Record<typeof activityType, number> = {
    strength: 6,
    cardio: 8,
    flexibility: 3
  };

  // Fórmula: MET * peso(kg) * tempo(h)
  return Math.round(met[activityType] * weight * (durationMinutes / 60));
}

// Valida email
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Valida senha (mínimo 8 caracteres, 1 letra, 1 número)
export function isValidPassword(password: string): boolean {
  return password.length >= 8 && 
         /[a-zA-Z]/.test(password) && 
         /[0-9]/.test(password);
}

// Calcula IMC
export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

// Interpreta IMC
export function interpretBMI(bmi: number): string {
  if (bmi < 18.5) return "Abaixo do peso";
  if (bmi < 25) return "Peso normal";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidade";
}

// Calcula percentual de progresso
export function calculateProgress(current: number, target: number): number {
  return Math.min(Math.round((current / target) * 100), 100);
}

// Formata número com separador de milhares
export function formatNumber(num: number): string {
  return num.toLocaleString("pt-BR");
}

// Gera ID único
export function generateId(prefix: string = ""): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}${prefix ? "_" : ""}${timestamp}${random}`;
}

// Debounce para inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Agrupa array por propriedade
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Ordena array por data
export function sortByDate<T extends { date: Date | string }>(
  array: T[],
  order: "asc" | "desc" = "desc"
): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

// Trunca texto
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

// Gera cor baseada em string (para avatars)
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    "#10B981", "#6B7F5E", "#4A5F7A", "#5A6B7D",
    "#059669", "#8B9F7E", "#6A7F9A", "#7A8B9D"
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

// Valida arquivo de importação (GPX, TCX, FIT)
export function isValidActivityFile(filename: string): boolean {
  const validExtensions = [".gpx", ".tcx", ".fit"];
  return validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

// Converte segundos para formato HH:MM:SS
export function secondsToHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Calcula média de array
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Encontra valor máximo em array de objetos
export function maxBy<T>(array: T[], key: keyof T): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((max, item) => 
    (item[key] as any) > (max[key] as any) ? item : max
  );
}

// Encontra valor mínimo em array de objetos
export function minBy<T>(array: T[], key: keyof T): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((min, item) => 
    (item[key] as any) < (min[key] as any) ? item : min
  );
}
