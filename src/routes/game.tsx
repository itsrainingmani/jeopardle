import { Game } from "@/components/Game";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game")({
  component: Game,
});
