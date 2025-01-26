import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/reverse")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/reverse"!</div>;
}
