import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/clues")({
  component: BrowseClues,
});

function BrowseClues() {
  return <div>Hello "/clues"!</div>;
}
