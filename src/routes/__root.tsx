import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Layout } from "@/components/Layout";

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});
