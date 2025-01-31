import { Game } from "@/components/Reverse";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/reverse")({
  component: Game,
});
