import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getConfidenceColor(confidence: number) {
  if (confidence >= 0.9) return "text-green-600";
  if (confidence >= 0.8) return "text-yellow-600";
  return "text-red-600";
}

export function getSeverityColor(severity: string) {
  switch (severity) {
    case "s1": return "bg-red-100 text-red-800";
    case "s2": return "bg-orange-100 text-orange-800";
    case "s3": return "bg-yellow-100 text-yellow-800";
    case "s4": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
}