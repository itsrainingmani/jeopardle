import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { PlayDrawerDialog } from "@/components/GameInfo";

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
    case "/clues":
      return (
        <sub className="text-purple-600 font-extrabold md:text-3xl text-2xl">
          clues
        </sub>
      );
    default:
      return null;
  }
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const routerState = useRouterState();
  const isReversePath = routerState.location.pathname === "/reverse";

  return (
    <div className="min-h-screen flex flex-col min-w-screen">
      <header>
        <div className="container mx-auto max-w-3xl w-full text-center relative">
          <Link to="/">
            <h1 className="relative inline-block text-5xl md:text-6xl py-2 pl-2 font-extrabold mb-4 bg-gradient-to-r from-[var(--jeopardy-accent)] to-[var(--jeopardy-main)] text-transparent bg-clip-text">
              jeopardle!
              <span className="absolute left-full top-1/2 transform -translate-y-1/2">
                <GameState path={routerState.location.pathname} />
              </span>
            </h1>
          </Link>
          {isReversePath && (
            <div className="fixed md:right-8 right-4 md:top-6 top-5">
              <PlayDrawerDialog />
            </div>
          )}
        </div>
        <hr />
      </header>
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
};
