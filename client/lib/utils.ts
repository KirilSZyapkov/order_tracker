import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";


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


export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
  errorMessage ="An error occurred while fetching data"
):Promise<T | null>{

  console.log("apiFetch 27 - ", options);
  console.log("apiFetch 28 - ", url);
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