import { useState, useEffect } from "react";
import type { Clue as ClueType, GameState } from "@/types/game";
import { Clue } from "./Clue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Results } from "./Results";
import { LoadingClue } from "./LoadingClue";
import { calculateSimilarity } from "@/utils/similarity";

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentClue: null,
    userAnswer: "",
    isAnswered: false,
    similarity: 0,
  });
  const [progression, setProgression] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [money, setMoney] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/random");
      const clue_data: ClueType = await response.json();
      // const clue_data: ClueType = {
      //   id: 1,
      //   round: 1,
      //   clue_value: 100,
      //   daily_double_value: 0,
      //   category: "LAKES & RIVERS",
      //   comments: null,
      //   answer: "River mentioned most often in the Bible",
      //   question: "the Jordan",
      //   air_date: new Date("1984-09-10"),
      //   notes: null,
      //   season: 1,
      // };

      setGameState((prevState) => ({
        ...prevState,
        currentClue: {
          ...clue_data,
          air_date: new Date(clue_data.air_date),
        },
      }));
    } catch (error) {
      console.error("Failed to fetch clue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnswer = () => {
    if (!gameState.currentClue || !answer.trim()) return;

    const similarity = calculateSimilarity(
      answer,
      gameState.currentClue.question
    );

    setGameState((prev) => ({
      ...prev,
      userAnswer: answer,
      isAnswered: true,
      similarity,
    }));

    setTimeout(() => {
      if (similarity > 75) {
        setMoney(money + gameState.currentClue.clue_value);
      } else if (similarity < 33) {
        setMoney(money - gameState.currentClue.clue_value);
      }
    }, 200);
  };

  const handleNextClue = () => {
    setIsLoading(true);
    setAnswer("");
    setGameState((prev) => ({ ...prev, isAnswered: false }));
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-[var(--jeopardy-main)]">
        jeopardle
      </h1>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingClue />
        ) : (
          <motion.div
            key="clue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <Winnings money={money} />
            <Clue clue={gameState.currentClue!} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          className="bg-white p-4"
          type="text"
          placeholder="What is..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={gameState.isAnswered || isLoading}
          onKeyDown={(e) =>
            e.key === "Enter" && !gameState.isAnswered && handleAnswer()
          }
        />

        <div className="flex flex-row gap-1">
          <Button
            className="w-full bg-[var(--jeopardy-accent)] hover:bg-[var(--jeopardy-main)]"
            disabled={gameState.isAnswered || isLoading}
            onClick={handleAnswer}
          >
            Submit Answer
          </Button>
          <Button
            className="w-full bg-zinc-600"
            disabled={gameState.isAnswered || isLoading}
            onClick={() =>
              setGameState((prev) => ({ ...prev, isAnswered: true }))
            }
          >
            Skip
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {gameState.isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Results
              correctAnswer={gameState.currentClue!.question}
              similarity={gameState.similarity}
            />
            <Button onClick={handleNextClue} className="w-full mt-4">
              Next Clue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function moneyColor(money: number) {
  switch (true) {
    case money < 0:
      return "text-red-600";
      break;
    case money === 0:
      return "text-black";
    case money > 0:
      return "text-green-600";
    default:
      return "text-black";
  }
}

function formatMoney(money: number) {
  if (money >= 0) {
    return `$${money}`;
  } else {
    return `-$${money * -1}`;
  }
}

function Winnings({ money }) {
  return (
    <div className="p-2">
      <label className="text-muted-foreground">Winnings: </label>
      <span className={moneyColor(money)}>{formatMoney(money)}</span>
    </div>
  );
}
