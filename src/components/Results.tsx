import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ResultsProps {
  correctAnswer: string;
  similarity: number;
}

export function Results({ correctAnswer, similarity }: ResultsProps) {
  return (
    <motion.div
      className="mt-4 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <p className="text-lg font-semibold">Correct Answer:</p>
        <p className="text-2xl font-[Lexend]">{correctAnswer}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Similarity to your answer: {similarity}%
        </p>
        <Progress
          value={similarity}
          className="w-full [&>div]:bg-gradient-to-r [&>div]:from-[var(--jeopardy-accent)] [&>div]:to-[var(--jeopardy-main)] [&>div]:rounded-l-full"
        />
      </div>
    </motion.div>
  );
}
