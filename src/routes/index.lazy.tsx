import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeInfo } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col gap-2 my-10 mx-auto px-4 py-8 max-w-xl min-h-screen items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="font-semibold text-3xl">Game Modes</h3>
        <motion.div className="flex flex-row gap-4 justify-center">
          <Link to="/game">
            <Button className="p-6 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-semibold text-xl">
              Infinite Jeopardy!
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="p-6 m-2 text-zinc-50 rounded-4xl bg-[var(--jeopardy-accent)]/75 hover:bg-[var(--jeopardy-accent)]/75 hover:cursor-not-allowed font-semibold text-xl">
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
              className="p-6 m-2 rounded-4xl bg-transparent/75 text-[var(--jeopardy-main)]/25 hover:text-[var(--jeopardy-main)]/25 border-[var(--jeopardy-main)]/50 text-lg hover:cursor-not-allowed"
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
          className="p-6 m-2 rounded-4xl text-[var(--jeopardy-main)] border-[var(--jeopardy-main)] hover:bg-white text-lg"
        >
          About
          <BadgeInfo />
        </Button>
      </Link>
    </div>
  );
}
