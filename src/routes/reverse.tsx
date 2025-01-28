import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reverse")({
  component: ReverseGame,
});

function ReverseGame() {
  return <div>Hello "/reverse"!</div>;
}
