import { Game } from "@/components/Game";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/game")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Game />;
}
