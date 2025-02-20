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

interface PaginatedResponse {
  data: ClueType[];
  total: number;
  page: number;
  page_size: number;
}

const capitalizeFirstLetter = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CLUES_TABLE_URL = `${import.meta.env.VITE_API_URL}/clues`;

export const fetchPaginatedData = async (
  page: number = 1,
  page_size: number = 20
): Promise<ClueType[]> => {
  const response = await fetch(
    `${CLUES_TABLE_URL}?page=${page}&page_size=${page_size}`
  );
  if (!response.ok) throw new Error("Failed to fetch clue");
  const clue_data: PaginatedResponse = await response.json();

  const clues: ClueType[] = clue_data.data.map((c) => {
    return {
      ...c,
      category: capitalizeFirstLetter(c.category),
      question: capitalizeFirstLetter(c.question),
      air_date: new Date(c.air_date),
    };
  });

  return clues;
};
