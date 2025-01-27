import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-2 bottom-0 bg-[var(--light-paper)]">
      <section className="mx-auto w-full text-center text-balance sm:text-sm text-xs text-muted-foreground">
        Built by{" "}
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-2 after:content-['↗'] decoration-dotted hover:decoration-solid"
        >
          itsrainingmani
        </a>
        . Source code available on{" "}
        <a
          href={siteConfig.links.github + "/jeopardle"}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-2 after:content-['↗'] decoration-dotted hover:decoration-solid"
        >
          GitHub
        </a>
        .
      </section>
    </footer>
  );
}
