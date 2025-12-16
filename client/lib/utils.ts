import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDelayed(plannedDay: string): boolean{
  const planned = new Date(plannedDay);
  const today = new Date();

  planned.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  return today > planned;
}