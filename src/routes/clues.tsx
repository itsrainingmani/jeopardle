import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clues")({
  component: BrowseClues,
});

function BrowseClues() {
  return <div>Hello "/clues"!</div>;
}
