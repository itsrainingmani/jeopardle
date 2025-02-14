import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";

interface HowToPlayProps {
  isDesktop: boolean;
}

HowToPlay.defaultProps = {
  isDesktop: false,
};

function HowToPlay({ isDesktop }: HowToPlayProps) {
  return (
    <div className={cn("grid items-start gap-4", !isDesktop && "px-4")}>
      <div className="font-medium sm:text-lg text-sm">
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
    </div>
  );
}

export function PlayDrawerDialog() {
  const [firstTime, setFirstTime] = useLocalStorage("reverse-info", true);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={firstTime || open} onOpenChange={setOpen} modal>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full w-10 h-10 p-0">
            <Info className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How to Play!</DialogTitle>
          </DialogHeader>
          <HowToPlay isDesktop />
          <Button
            type="button"
            onClick={() => {
              if (firstTime) {
                setFirstTime(false);
              }
              setOpen(false);
            }}
          >
            Play Game!
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={firstTime || open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="rounded-full w-10 h-10 p-0">
          <Info className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>How to Play</DrawerTitle>
        </DrawerHeader>
        <HowToPlay />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              onClick={() => {
                if (firstTime) {
                  setFirstTime(false);
                }
                setOpen(false);
              }}
              type="button"
            >
              Play Game!
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
