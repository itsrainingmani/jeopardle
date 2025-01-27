import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "./site-footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const routerState = useRouterState();

  return (
    <div className="min-h-screen flex flex-col min-w-screen">
      <header>
        <div className="flex justify-center items-center container mx-auto max-w-3xl w-full">
          <Link to="/">
            <h1 className="text-5xl md:text-6xl p-2 font-extrabold text-center mb-4 bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text">
              jeopardle!
              {routerState.location.pathname === "/game" && (
                <sub className="text-red-500 font-extrabold text-3xl font-mono">
                  ∞
                </sub>
              )}
            </h1>
          </Link>
        </div>
        <hr />
      </header>
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
};
