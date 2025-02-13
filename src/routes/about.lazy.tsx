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
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: -20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

function ListEl({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      variants={item}
      className="py-2 sm:text-xl text-lg font-medium ml-4"
    >
      {children}
    </motion.li>
  );
}

function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl justify-center items-center">
      <p className="font-medium sm:text-xl text-lg py-4">
        <span className="font-extrabold mb-4 bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text sm:text-xl text-lg">
          jeopardle!
        </span>{" "}
        is a simple website that was born out of my dual desires to become a
        Jeopardy! wizard and to make something fun for people to play.
      </p>
      <motion.ul
        variants={container}
        // initial="hidden"
        // animate="show"
        className="list-decimal font-[Lexend]"
      >
        <ListEl>
          Try twists on the Jeopardy! formula with different modes like{" "}
          <Link
            to="/infinite"
            className="text-[var(--jeopardy-accent)] hover:text-[var(--jeopardy-main)]"
          >
            Infinite Jeopardy!
          </Link>{" "}
          &{" "}
          <Link
            to="/reverse"
            className="text-[var(--jeopardy-accent)] hover:text-[var(--jeopardy-main)]"
          >
            Reverse Jeopardy!
          </Link>
        </ListEl>
        <ListEl>
          Want to learn more trivia? Search through every Jeopardy! clue from
          past games{" "}
          <span className="text-muted-foreground text-sm">(coming soon!)</span>
        </ListEl>
        <ListEl>
          Become a Trivia Champion! &{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-[var(--jeopardy-accent)] hover:text-[var(--jeopardy-main)]"
            href="https://www.jeopardy.com/be-on-j/anytime-test"
            referrerPolicy="no-referrer"
          >
            apply
          </a>{" "}
          to go on Jeopardy!
        </ListEl>
      </motion.ul>
      <hr />
      <h3 className="font-medium text-2xl underline py-4">
        Reverse Jeopardy! Scoring
      </h3>
      <div className="font-medium sm:text-xl text-lg">
        <p>
          <Link
            to="/reverse"
            className="text-[var(--jeopardy-accent)] hover:text-[var(--jeopardy-main)]"
          >
            Reverse Jeopardy!
          </Link>{" "}
          uses precomputed{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2 after:content-['↗'] decoration-dotted hover:decoration-solid"
            href="https://en.wikipedia.org/wiki/Word_embedding"
          >
            Vector Embeddings
          </a>{" "}
          on all the clues to score your answer.
          <br /> When you enter a guess, the vector embeddings for your guess
          are generated dynamically using Mixed Bread's{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2 after:content-['↗'] decoration-dotted hover:decoration-solid"
            href="https://www.mixedbread.ai/docs/embeddings/mxbai-embed-large-v1"
          >
            mxbai-embed-large-v1
          </a>{" "}
          model.
          <br />
          Using that embeddings vector, I calculate the binary cosine similarity
          which allows me to know how close your guess was semantically to the
          answer!
        </p>
      </div>
      <div className="flex justify-center sm:justify-start">
        <Link to="/">
          <Button className="before:content-['←'] p-6 my-8 rounded-4xl hover:bg-[var(--jeopardy-main)] bg-[var(--jeopardy-accent)] sm:text-lg text-sm">
            Back Home
          </Button>
        </Link>
      </div>
      <details className="font-sans">
        <summary className="font-bold sm:text-2xl text-xl pb-4 hover:cursor-pointer">
          Disclaimer
        </summary>
        <p className="italic text-muted-foreground sm:text-lg text-md">
          All data is property of Jeopardy Productions, Inc. and protected under
          law. I am not affiliated with the show.
        </p>
      </details>
    </div>
  );
}
