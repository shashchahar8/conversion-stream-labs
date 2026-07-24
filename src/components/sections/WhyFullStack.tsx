import { Container } from "@/components/global/Container";

export function WhyFullStack({ eyebrow, headline, body, points }: { eyebrow: string; headline: string; body: string; points: string[] }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">{headline}</h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">{body}</p>
          </div>
          <ul className="border-t border-border">
            {points.map((p) => (
              <li key={p} className="border-b border-border py-5 text-lg text-foreground">
                <span className="mr-3 font-mono text-xs text-accent">—</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
