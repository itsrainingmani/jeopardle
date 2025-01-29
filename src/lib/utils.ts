import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Clue as ClueType } from "@/types/game";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const clue_data: ClueType = await response.json();
  return clue_data;
};
