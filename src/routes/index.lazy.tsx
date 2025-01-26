import { Button } from "@/components/ui/button";
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
          <Link to="/reverse">
            <Button className="p-6 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-semibold text-xl">
              Reverse Jeopardy!
            </Button>
          </Link>
        </motion.div>
      </div>
      {/* <Link to="/game">
        <Button className="p-8 m-2 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] font-bold text-xl">
          Play Infinite Jeopardy
        </Button>
      </Link> */}
      <Link to="/clues">
        <Button
          variant="outline"
          className="p-6 m-2 rounded-4xl bg-transparent text-[var(--jeopardy-main)] border-[var(--jeopardy-main)] hover:bg-white text-lg"
        >
          Browse Clues
        </Button>
      </Link>
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
