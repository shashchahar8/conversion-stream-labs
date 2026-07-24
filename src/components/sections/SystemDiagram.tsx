import { Container } from "@/components/global/Container";

interface StageDef { name: string; body?: string }

/**
 * Restrained SVG-style system diagram — traffic → pipeline → revenue.
 * No parallax, no autoplay, no glow.
 */
export function SystemDiagram({ stages }: { stages: StageDef[] }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 md:p-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-7">
        {stages.map((s, i) => (
          <div key={s.name} className="relative">
            <div className="flex items-center gap-3 md:block">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Stage {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-0 md:mt-2 font-display text-lg md:text-xl">{s.name}</div>
            </div>
            {s.body ? <p className="mt-1 hidden text-sm text-muted-foreground md:block">{s.body}</p> : null}
            {i < stages.length - 1 ? (
              <div className="absolute right-[-8px] top-4 hidden h-px w-4 bg-border md:block" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <span className="uppercase tracking-widest">Attention</span>
        <div className="mx-4 h-px flex-1 bg-gradient-to-r from-border via-accent/60 to-border" aria-hidden />
        <span className="uppercase tracking-widest">Revenue</span>
      </div>
    </div>
  );
}

export function SectionSystemDiagram({ eyebrow, headline, body, stages }: { eyebrow: string; headline: string; body: string; stages: StageDef[] }) {
  return (
    <section className="section-ink py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">{headline}</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{body}</p>
        </div>
        <div className="mt-14">
          <SystemDiagram stages={stages} />
        </div>
      </Container>
    </section>
  );
}
