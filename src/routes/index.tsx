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
import {
  createFileRoute,
  Link,
  Await,
  CatchBoundary,
} from "@tanstack/react-router";
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
    <div className="flex flex-col gap-2 md:mt-6 sm:mt-4 mx-auto px-4 md:py-2 py-1 max-w-3xl items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="font-semibold text-3xl sm:text-4xl">Game Modes</h2>
        <motion.div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
          <div className="flex flex-1 flex-col gap-4 border rounded-3xl p-4 items-center justify-between h-full">
            <p className="font-[Lexend] whitespace-break-spaces sm:text-lg">
              Play an{" "}
              <span className="bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text">
                Infinite
              </span>{" "}
              version of Jeopardy and try to acculumate as many points as
              possible. There are{" "}
              <span className="text-green-600">515,000</span> clues to play
              through! <br />
              The categories and clues are always shown in a random order.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/infinite">
                    <Button
                      type="button"
                      className="p-6 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-semibold sm:text-lg md:text-xl text-sm"
                    >
                      Infinite Jeopardy!
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Guess the answers to Jeopardy! clues and try to win as much
                    money as possible!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-1 flex-col gap-4 border rounded-3xl p-4 items-center justify-between h-full">
            <p className="font-[Lexend] whitespace-break-spaces sm:text-lg">
              Think you're too good for regular Jeopardy? Try a{" "}
              <span className="text-red-600">harder</span> version where you
              have to guess the clue when given the answer and the category!
              <br />
              An LLM will evaluate your answer.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/reverse">
                    <Button
                      type="button"
                      className="p-6 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-semibold sm:text-lg md:text-xl text-sm"
                    >
                      Reverse Jeopardy!
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Try to guess the Jeopardy! clue when only given the Category
                    and the Answer
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      </div>
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="p-6 m-2 rounded-4xl bg-transparent/75 text-[var(--jeopardy-main)]/25 hover:text-[var(--jeopardy-main)]/25 border-[var(--jeopardy-main)]/25 hover:border-[var(--jeopardy-main)]/25 md:text-lg text-sm hover:cursor-not-allowed focus:outline-none"
            >
              Browse Clues
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}

      <Link to="/about">
        <Button
          type="button"
          variant="outline"
          className="p-6 m-2 rounded-4xl text-[var(--jeopardy-main)] border-[var(--jeopardy-main)] hover:bg-zinc-100 md:text-lg text-sm"
        >
          About
          <BadgeInfo />
        </Button>
      </Link>
      <hr />
      <CatchBoundary
        getResetKey={() => "reset"}
        onCatch={(error) => console.error(error)}
        errorComponent={undefined}
      >
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
                  <Clue
                    category={data.category}
                    comments={data.comments}
                    answer={data.answer}
                    airDate={data.air_date}
                    round={data.round}
                    clueValue={data.clue_value}
                  />
                  <Results
                    skipped
                    correctAnswer={data.question}
                    similarity={0}
                  />
                </motion.div>
              </AnimatePresence>
            );
          }}
        </Await>
      </CatchBoundary>
    </div>
  );
}
