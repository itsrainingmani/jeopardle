import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "./site-footer";

interface GameStateProps {
  path: string;
}

const GameState = ({ path }: GameStateProps) => {
  switch (path) {
    case "/":
      return null;
    case "/infinite":
      return (
        <sub className="text-red-500 font-extrabold text-3xl font-mono">∞</sub>
      );
    case "/reverse":
      return (
        <sub className="text-green-600 font-extrabold text-3xl font-mono">
          ♻
        </sub>
      );
    default:
      return null;
  }
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const routerState = useRouterState();

  return (
    <div className="min-h-screen flex flex-col min-w-screen">
      <header>
        <div className="flex justify-center items-center container mx-auto max-w-3xl w-full">
          <Link to="/">
            <h1 className="text-5xl md:text-6xl p-2 font-extrabold text-center mb-4 bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text">
              jeopardle!
              <GameState path={routerState.location.pathname} />
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
