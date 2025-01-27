import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/reverse")({
  component: ReverseGame,
});

function ReverseGame() {
  return <div>Hello "/reverse"!</div>;
}
