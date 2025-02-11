import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";

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

interface ClueProps {
  category: string;
  comments: string | null;
  answer: string;
  airDate: Date;
  round: number;
  clueValue?: number;
}

export function Clue({
  category,
  comments,
  answer,
  airDate,
  round,
  clueValue,
}: ClueProps) {
  const roundName = matchRound(round);

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
              {category}
            </CardTitle>
            {comments && (
              <p className="sm:text-md text-sm px-2 text-center text-muted-foreground italic">
                {comments}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="md:text-2xl sm:text-xl text-lg sm:mb-8 mb-2 sm:p-4 p-2 text-center font-medium font-[Lexend]">
              {answer}
            </p>
            <div className="flex justify-between sm:text-md text-sm text-muted-foreground">
              <span>{airDate.getFullYear()}</span>
              <span>Round: {roundName}</span>
              {round !== 3 && clueValue ? (
                <Badge className="bg-green-700 hover:bg-green-700 sm:text-sm text-xs">
                  ${clueValue}
                </Badge>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Tilt>
  );
}
