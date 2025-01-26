import { AnimatedNumber } from "./ui/animated-number";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function moneyColor(money: number) {
  switch (true) {
    case money < 0:
      return "text-red-600";
    case money === 0:
      return "text-black";
    case money > 0:
      return "text-green-600";
    default:
      return "text-black";
  }
}

interface WinningsProps {
  money: number;
}

export function Winnings({ money }: WinningsProps) {
  const neg_money = money < 0;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="p-2"
    >
      <label className="text-muted-foreground text-lg">Winnings: </label>
      <AnimatedNumber
        className={cn(
          "inline-flex items-center text-lg",
          !neg_money && "before:content-['$']",
          neg_money && "before:content-['-$']",
          moneyColor(money)
        )}
        springOptions={{
          bounce: 0,
          duration: 750,
        }}
        value={Math.abs(money)}
      />
    </motion.div>
  );
}
