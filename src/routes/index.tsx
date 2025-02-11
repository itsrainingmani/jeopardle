import { Clue } from "@/components/Clue";
import { Results } from "@/components/Results";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchData } from "@/lib/utils";
import { createFileRoute, Link, Await } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeInfo } from "lucide-react";

const ONTHISDAY_URL = `${import.meta.env.VITE_API_URL}/onthisday`;

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    const clueData = fetchData(ONTHISDAY_URL);

    return {
      deferredClueData: clueData,
    };
  },
  staleTime: Infinity,
});

function LoadingClue() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center sm:max-w-xl max-w-md w-full">
      <Skeleton className="h-48 md:h-64 sm:max-w-xl max-w-md w-full rounded-xl mx-auto" />
      <div className="flex flex-col justify-center items-center space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[175px]" />
      </div>
    </div>
  );
}

function Index() {
  const { deferredClueData } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-2 md:mt-10 sm:mt-4 mx-auto px-4 py-8 max-w-3xl items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="font-semibold text-3xl sm:text-4xl">Game Modes</h2>
        <motion.div className="flex flex-col items-center sm:flex-row sm:gap-4 gap-2 justify-center">
          <Link to="/infinite">
            <Button
              type="button"
              className="p-6 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-semibold text-xl"
            >
              Infinite Jeopardy!
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  className="p-6 m-2 text-zinc-50 rounded-4xl bg-[var(--jeopardy-accent)]/50 hover:bg-[var(--jeopardy-accent)]/50 hover:border-[var(--jeopardy-accent)]/25 hover:cursor-not-allowed font-semibold text-xl focus:outline-none"
                >
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
              type="button"
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
          type="button"
          variant="outline"
          className="p-6 m-2 rounded-4xl text-[var(--jeopardy-main)] border-[var(--jeopardy-main)] hover:bg-zinc-100 text-lg"
        >
          About
          <BadgeInfo />
        </Button>
      </Link>
      <hr />
      <h3 className="font-semibold text-2xl sm:text-3xl m-2 text-center">
        On This Day
      </h3>
      <Await promise={deferredClueData} fallback={<LoadingClue />}>
        {(data) => {
          return (
            <AnimatePresence mode="sync">
              <motion.div
                key="loaded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                exit={{ opacity: 0 }}
                className="sm:max-w-xl max-w-md w-full"
              >
                <Clue clue={data} />
                <Results skipped correctAnswer={data.question} similarity={0} />
              </motion.div>
            </AnimatePresence>
          );
        }}
      </Await>
    </div>
  );
}
