import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDelayed(plannedDay: string): boolean{

  const [day, month] = plannedDay.split(".").map(Number);
  const year = new Date().getFullYear();
  const planned = new Date(year, month - 1, day);
  const today = new Date();

  planned.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  return today > planned;
}


export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
  errorMessage ="An error occurred while fetching data"
):Promise<T | null>{

  try {
    const res = await fetch(url,{
      headers: {"Content-Type": "application/json"},
      ...options
    })
    const data = await res.json();

    if(!res.ok){
      throw new Error(data?.error || errorMessage);
    }

    return data
  } catch (error: unknown) {
    console.error(error)
    toast.error(errorMessage);
    return null;
  }
}