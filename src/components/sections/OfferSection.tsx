import { Container } from "@/components/global/Container";

export function OfferSection({
  eyebrow,
  headline,
  body,
  items,
  clarifications,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  items: string[];
  clarifications: string[];
}) {
  return (
    <section className="section-ink py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">{headline}</h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">{body}</p>
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              {clarifications.map((c) => (
                <p key={c}>— {c}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3">
            {items.map((it, i) => (
              <li
                key={it}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-bone">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
