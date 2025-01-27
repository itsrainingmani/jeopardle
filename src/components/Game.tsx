import { useState, useEffect } from "react";
import type { Clue as ClueType, GameState } from "@/types/game";
import { Clue } from "./Clue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Results } from "@/components/Results";
import { Winnings } from "@/components/Winnings";
import { LoadingClue } from "@/components/LoadingClue";
import { calculateSimilarity } from "@/utils/similarity";

import { createLazyFileRoute } from "@tanstack/react-router";
import { SkipForwardIcon } from "lucide-react";

const RANDOM_API_URL = `${import.meta.env.VITE_API_URL}/random`;

export const Route = createLazyFileRoute("/")({
  component: Game,
});

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentClue: null,
    userAnswer: "",
    isAnswered: false,
    similarity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [money, setMoney] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(RANDOM_API_URL);
      const clue_data: ClueType = await response.json();

      setGameState((prevState) => ({
        ...prevState,
        isAnswered: false,
        similarity: 0,
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

  // const fetchMock = async () => {
  //   try {
  //     const clue_data: ClueType = {
  //       id: 1,
  //       round: 1,
  //       clue_value: 100,
  //       daily_double_value: 0,
  //       category: "LAKES & RIVERS",
  //       comments: "there is a comment here",
  //       answer: "River mentioned most often in the Bible",
  //       question: "the Jordan",
  //       air_date: new Date("1984-09-10"),
  //       notes: null,
  //       season: 1,
  //     };
  //     setGameState((prevState) => ({
  //       ...prevState,
  //       currentClue: {
  //         ...clue_data,
  //         air_date: new Date(clue_data.air_date),
  //       },
  //     }));
  //   } catch (error) {
  //     console.error("Failed to fetch clue:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    // using setTimeout here to see how the loading state looks
    // setTimeout(() => {
    //   fetchMock();
    // }, 1500);
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

    if (gameState.currentClue.round !== 3) {
      if (similarity > 75) {
        setMoney(money + gameState.currentClue.clue_value);
      } else if (similarity < 33) {
        setMoney(money - gameState.currentClue.clue_value);
      }
    }
  };

  const handleNextClue = () => {
    setIsLoading(true);
    setAnswer("");
    setGameState((prev) => ({ ...prev, isAnswered: false, similarity: 0 }));
    fetchData();
    // fetchMock();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl justify-center items-center">
      <Winnings money={money} />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div>
            <LoadingClue />
          </div>
        ) : (
          <motion.div
            key="clue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <Clue clue={gameState.currentClue!} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
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

        <div className="flex flex-row gap-1 justify-center">
          <Button
            className="p-6 m-2 rounded-3xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] text-lg"
            disabled={gameState.isAnswered || isLoading}
            onClick={handleAnswer}
          >
            Answer
          </Button>
          <Button
            className="p-6 m-2 rounded-3xl bg-zinc-500 text-lg text-muted"
            disabled={gameState.isAnswered || isLoading}
            onClick={() =>
              setGameState((prev) => ({ ...prev, isAnswered: true }))
            }
          >
            Skip
            <SkipForwardIcon />
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
            className="flex flex-col justify-center items-center"
          >
            <Results
              skipped={answer.length === 0}
              correctAnswer={gameState.currentClue!.question}
              similarity={gameState.similarity}
            />
            <Button
              onClick={handleNextClue}
              className="p-6 mt-4 justify-center rounded-3xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] text-lg"
            >
              Next Clue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
