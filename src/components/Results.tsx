import { Progress } from "@/components/ui/progress";

interface ResultsProps {
  skipped: boolean;
  correctAnswer: string;
  similarity: number;
}

export function Results({ skipped, correctAnswer, similarity }: ResultsProps) {
  return (
    <div className="mt-4 space-y-4 w-full">
      <div className="text-center">
        <p className="xl:text-lg text-md font-semibold">Correct Answer:</p>
        <p className="xl:text-2xl text-xl font-[Lexend]">{correctAnswer}</p>
      </div>
      {!skipped && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Similarity to your answer: {similarity.toFixed(0)}%
          </p>
          <Progress
            value={similarity}
            className="w-full [&>div]:bg-gradient-to-r [&>div]:from-[var(--jeopardy-accent)] [&>div]:to-[var(--jeopardy-main)] [&>div]:rounded-l-full"
          />
        </div>
      )}
    </div>
  );
}
