import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Clue as ClueType } from "@/types/game";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string): Promise<ClueType> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch clue");
  const clue_data: ClueType = await response.json();
  return {
    ...clue_data,
    air_date: new Date(clue_data.air_date),
  };
};
