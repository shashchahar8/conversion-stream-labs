import { Container } from "@/components/global/Container";
import { homepage } from "@/content/homepage";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";

export function RecognitionSection() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{homepage.recognition.eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              {homepage.recognition.headline}
            </h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              {homepage.recognition.body}
            </p>
            <ul className="mt-8 space-y-3">
              {homepage.recognition.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3 border-b border-border pb-3 text-base">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-8">
            <DiagnosticForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
