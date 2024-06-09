import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  const cleanName = name.replace(/[-_]/g, ' ');
  const words = cleanName.split(' ');
  const initials = words[0][0] + words[words.length - 1][0];
  return initials.toUpperCase();
}
