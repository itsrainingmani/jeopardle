export interface Clue {
  id: number;
  round: 1 | 2 | 3;
  clue_value: number;
  daily_double_value: number;
  category: string;
  comments: string | null;
  answer: string;
  question: string;
  air_date: Date;
  notes: string | null;
  season: number;
  embedding: number[];
}

export interface GameState {
  currentClue: Clue | null;
  userAnswer: string;
  isAnswered: boolean;
  similarity: number;
}
