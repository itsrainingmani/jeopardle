import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-2 absolute bottom-0 bg-[var(--light-paper)]">
      <section className="mx-auto w-full text-center text-balance text-sm text-muted-foreground">
        Built by{" "}
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          itsrainingmani
        </a>
        . Source code available on{" "}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </section>
    </footer>
  );
}
