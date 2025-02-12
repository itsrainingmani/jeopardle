import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "./site-footer";

interface GameStateProps {
  path: string;
}

const GameState = ({ path }: GameStateProps) => {
  switch (path) {
    case "/about":
      return (
        <sub className="text-yellow-500 font-extrabold md:text-3xl text-2xl font-mono">
          ?
        </sub>
      );
    case "/infinite":
      return (
        <sub className="text-red-500 font-extrabold md:text-3xl text-2xl font-mono">
          ∞
        </sub>
      );
    case "/reverse":
      return (
        <sub className="text-green-600 font-extrabold md:text-3xl text-2xl font-mono">
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
        <div className="container mx-auto max-w-3xl w-full text-center">
          <Link to="/">
            <h1 className="relative inline-block text-5xl md:text-6xl py-2 pl-2 font-extrabold mb-4 bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text">
              jeopardle!
              <span className="absolute left-full top-1/2 transform -translate-y-1/2">
                <GameState path={routerState.location.pathname} />
              </span>
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
