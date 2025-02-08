import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



// cn("text-red-500", isActive && "font-bold") 
// If `isActive` is true → "text-red-500 font-bold"
// If `isActive` is false → "text-red-500"
