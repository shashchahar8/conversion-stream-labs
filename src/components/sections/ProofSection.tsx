import { Container } from "@/components/global/Container";

/**
 * Proof section. Deliberately renders labelled placeholders until
 * verified client assets are supplied — see AGENTS.md rule on proof.
 */
export function ProofSection() {
  const placeholders = [
    { label: "Verified case study required", context: "Allied health · multi-location" },
    { label: "Approved client result required", context: "Cosmetic dental · case value uplift" },
    { label: "Approved testimonial required", context: "Legal · pipeline visibility" },
  ];
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">Proof</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            Only verified outcomes are published here.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Fabricated results are worse than none. Case studies and testimonials appear once client approval and reconciled data are in place.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {placeholders.map((p, i) => (
            <div
              key={i}
              className="flex aspect-[4/5] flex-col justify-between rounded-2xl border border-dashed border-border bg-mist/50 p-6"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Placeholder</span>
              <div>
                <p className="font-display text-2xl">{p.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.context}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
