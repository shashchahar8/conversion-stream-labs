import { Container } from "@/components/global/Container";

export function ProcessStages({
  eyebrow,
  headline,
  stages,
}: {
  eyebrow: string;
  headline: string;
  stages: { number: string; name: string; body: string }[];
}) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            {headline}
          </h2>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-7">
          {stages.map((s) => (
            <li key={s.number} className="bg-card p-6">
              <p className="font-mono text-xs text-accent">{s.number}</p>
              <h3 className="mt-3 font-display text-lg">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
