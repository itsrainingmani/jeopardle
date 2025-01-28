import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Clue as ClueType } from "../types/game";
import { motion } from "framer-motion";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";

interface ClueProps {
  clue: ClueType;
}

function matchRound(round: number) {
  switch (round) {
    case 1:
      return "Jeopardy!";
    case 2:
      return "Double Jeopardy!";
    case 3:
      return "Final Jeopardy!";

    default:
      return "Jeopardy!";
  }
}

export function Clue({ clue }: ClueProps) {
  const round = matchRound(clue.round);

  return (
    <Tilt rotationFactor={1} isRevese>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-full mx-auto">
          <CardHeader className="sm:p-6 p-2">
            <CardTitle className="md:text-3xl sm:text-2xl text-lg font-bold font-mono text-center">
              {clue.category}
            </CardTitle>
            {clue.comments && (
              <p className="sm:text-md text-sm px-2 text-center text-muted-foreground italic">
                {clue.comments}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="md:text-2xl sm:text-xl text-lg sm:mb-8 mb-2 sm:p-4 p-2 text-center font-medium font-[Lexend]">
              {clue.answer}
            </p>
            <div className="flex justify-between sm:text-md text-sm text-muted-foreground">
              <span>{clue.air_date.getFullYear()}</span>
              <span>Round: {round}</span>
              {clue.round !== 3 ? (
                <Badge className="bg-green-700 hover:bg-green-700 sm:text-sm text-xs">
                  ${clue.clue_value}
                </Badge>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Tilt>
  );
}
