import { Game } from "@/components/Game";
import { SiteFooter } from "./components/site-footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col w-screen">
      <main className="flex-1 flex justify-center items-start pt-8">
        <Game />
      </main>
      <SiteFooter />
    </div>
  );
}
