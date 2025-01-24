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
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-mono text-center">
              {clue.category}
            </CardTitle>
            {clue.comments && (
              <p className="text-md px-2 text-center text-muted-foreground italic">
                {clue.comments}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-2xl mb-8 p-4 text-center font-medium font-[Lexend]">
              {clue.answer}
            </p>
            <div className="flex justify-between text-md text-muted-foreground">
              <span>{clue.air_date.getFullYear()}</span>
              <span>Round: {round}</span>
              {clue.round !== 3 ? (
                <Badge className="bg-green-700 hover:bg-green-700">
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
