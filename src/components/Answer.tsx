import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AnswerProps {
  onSubmit: (answer: string) => void;
  isAnswered: boolean;
}

export function Answer({ onSubmit, isAnswered }: AnswerProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Input
        type="text"
        placeholder="What is..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isAnswered}
      />
      <Button type="submit" className="w-full" disabled={isAnswered}>
        Submit Answer
      </Button>
    </motion.form>
  );
}
