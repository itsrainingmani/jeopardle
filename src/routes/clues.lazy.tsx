import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/clues")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/clues"!</div>;
}
