import { Button } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: -20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

function ListEl({ children }: { children: React.ReactNode }) {
  return (
    <motion.li variants={item} className="py-2 text-xl font-medium">
      {children}
    </motion.li>
  );
}

function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-xl justify-center items-center">
      <p className="font-medium text-xl">
        <span className="font-extrabold mb-4 bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text text-xl">
          jeopardle
        </span>{" "}
        was born out of my dual desires to become a Jeopardy! wizard and to make
        something fun for people to play.
      </p>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="list-decimal font-[Lexend]"
      >
        <ListEl>
          Try twists on the Jeopardy! formula with different modes like Infinite
          Jeopardy & Reverse Jeopardy
        </ListEl>
        <ListEl>
          Want to learn more trivia? Search through every Jeopardy clue from
          past games
        </ListEl>
        <ListEl>Become a Trivia Champion! & apply to go on Jeopardy!</ListEl>
      </motion.ul>
      <Link to="/">
        <Button className="before:content-['←'] p-6 my-8 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] text-lg">
          Back Home
        </Button>
      </Link>
      <details className="font-sans">
        <summary className="font-bold text-2xl pb-4 hover:cursor-pointer">
          Disclaimer
        </summary>
        <p className="italic text-muted-foreground text-lg">
          All data is property of Jeopardy Productions, Inc. and protected under
          law. I am not affiliated with the show.
        </p>
      </details>
    </div>
  );
}
