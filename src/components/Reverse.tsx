import { useState, useEffect } from "react";
import type { GameState } from "@/types/game";
import { Clue } from "./Clue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Results } from "@/components/Results";
import { Winnings } from "@/components/Winnings";
import { LoadingClue } from "@/components/LoadingClue";
import { calculateBinaryCosine } from "@/utils/similarity";
import { Loader2, SkipForwardIcon } from "lucide-react";
import { fetchData } from "@/lib/utils";
const RANDOM_API_URL = `${import.meta.env.VITE_API_URL}/random`;

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentClue: null,
    userAnswer: "",
    isAnswered: false,
    similarity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answer, setAnswer] = useState("");
  const [money, setMoney] = useState(0);

  useEffect(() => {
    fetchData(RANDOM_API_URL)
      .then((clue_data) => {
        setGameState((prevState) => ({
          ...prevState,
          isAnswered: false,
          similarity: 0,
          currentClue: {
            ...clue_data,
            air_date: new Date(clue_data.air_date),
          },
        }));
      })
      .catch((error) => {
        console.error("Failed to fetch clue:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAnswer = async () => {
    setIsAnswered(true);
    if (!gameState.currentClue || !answer.trim()) return;

    try {
      const response = await fetch("/api/mixedbread/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MXBAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mixedbread-ai/mxbai-embed-large-v1",
          input: [answer],
          normalized: true,
          dimensions: 512,
          encoding_format: "ubinary",
        }),
      });

      const data = await response.json();
      const answerEmbedding = data.data[0].embedding;
      console.log(gameState.currentClue?.embedding);
      console.log(answerEmbedding);

      const similarity = calculateBinaryCosine(
        gameState.currentClue?.embedding,
        answerEmbedding
      );
      console.log(similarity);
      setGameState((prev) => ({
        ...prev,
        userAnswer: answer,
        isAnswered: true,
        similarity,
      }));

      if (gameState.currentClue.round !== 3) {
        if (similarity > 70) {
          setMoney(money + gameState.currentClue.clue_value);
        } else if (similarity >= 50 && similarity <= 70) {
          setMoney(money + gameState.currentClue.clue_value / 2);
        } else if (similarity < 33) {
          setMoney(money - gameState.currentClue.clue_value);
        }
      }
    } catch (error) {
      console.error("Error getting embeddings:", error);
    } finally {
      setIsAnswered(false);
    }
  };

  const handleNextClue = () => {
    setIsLoading(true);
    setAnswer("");
    setGameState((prev) => ({ ...prev, isAnswered: false, similarity: 0 }));
    fetchData(RANDOM_API_URL)
      .then((clue_data) => {
        setGameState((prevState) => ({
          ...prevState,
          isAnswered: false,
          similarity: 0,
          currentClue: {
            ...clue_data,
            air_date: new Date(clue_data.air_date),
          },
        }));
      })
      .catch((error) => {
        console.error("Failed to fetch clue:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto px-4 sm:py-8 py-2 max-w-2xl justify-center items-center">
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
            <Clue
              category={gameState.currentClue!.category}
              comments={gameState.currentClue!.comments}
              answer={gameState.currentClue!.question}
              airDate={gameState.currentClue!.air_date}
              round={gameState.currentClue!.round}
              clueValue={gameState.currentClue!.clue_value}
            />
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
          placeholder="Guess the clue..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={gameState.isAnswered || isLoading}
          onKeyDown={(e) =>
            e.key === "Enter" && !gameState.isAnswered && handleAnswer()
          }
        />

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            className="p-6 sm:m-2 mx-2 rounded-3xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] sm:text-lg text-md"
            disabled={gameState.isAnswered || isLoading}
            onClick={handleAnswer}
          >
            Answer
            {isAnswered && <Loader2 className="animate-spin" />}
          </Button>
          <Button
            className="p-6 sm:m-2 mx-2 rounded-3xl bg-zinc-500 sm:text-lg text-md text-muted"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center"
          >
            <Results
              skipped={answer.length === 0}
              correctAnswer={gameState.currentClue!.answer}
              similarity={gameState.similarity}
            />
            <Button
              onClick={handleNextClue}
              className="p-6 mt-4 justify-center rounded-3xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] sm:text-lg text-md"
            >
              Next Clue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
