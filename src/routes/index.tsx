import { Clue } from "@/components/Clue";
import { LoadingClue } from "@/components/LoadingClue";
import { Results } from "@/components/Results";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchData } from "@/lib/utils";
import type { Clue as ClueType } from "@/types/game";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeInfo } from "lucide-react";
import { useEffect, useState } from "react";

const ONTHISDAY_URL = `${import.meta.env.VITE_API_URL}/onthisday`;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [onthisday, setOnthisday] = useState<ClueType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(ONTHISDAY_URL)
      .then((clue_data) => {
        setOnthisday({
          ...clue_data,
          air_date: new Date(clue_data.air_date),
        });
      })
      .catch((error) => {
        console.error("Failed to fetch clue:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 md:mt-10 sm:mt-4 mx-auto px-4 py-8 max-w-3xl items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="font-semibold text-3xl sm:text-4xl">Game Modes</h2>
        <motion.div className="flex flex-col items-center sm:flex-row sm:gap-4 gap-2 justify-center">
          <Link to="/game">
            <Button className="p-6 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-semibold text-xl">
              Infinite Jeopardy!
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="p-6 m-2 text-zinc-50 rounded-4xl bg-[var(--jeopardy-accent)]/50 hover:bg-[var(--jeopardy-accent)]/50 hover:border-[var(--jeopardy-accent)]/25 hover:cursor-not-allowed font-semibold text-xl focus:outline-none">
                  Reverse Jeopardy!
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-6 m-2 rounded-4xl bg-transparent/75 text-[var(--jeopardy-main)]/25 hover:text-[var(--jeopardy-main)]/25 border-[var(--jeopardy-main)]/25 hover:border-[var(--jeopardy-main)]/25 text-lg hover:cursor-not-allowed focus:outline-none"
            >
              Browse Clues
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Link to="/about">
        <Button
          variant="outline"
          className="p-6 m-2 rounded-4xl text-[var(--jeopardy-main)] border-[var(--jeopardy-main)] hover:bg-zinc-100 text-lg"
        >
          About
          <BadgeInfo />
        </Button>
      </Link>
      <hr />
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
            transition={{ delay: 0.5 }}
            exit={{ opacity: 0 }}
            className="sm:max-w-xl md:max-w-2xl max-w-lg"
          >
            <h3 className="font-semibold text-2xl sm:text-3xl m-2 text-center">
              On This Day
            </h3>
            <Clue clue={onthisday!} />
            <Results
              skipped
              correctAnswer={onthisday!.question}
              similarity={0}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
