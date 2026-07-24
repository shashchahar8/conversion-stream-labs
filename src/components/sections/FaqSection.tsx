import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/global/Container";
import { getFaqsByIds } from "@/content/faqs";

export function FaqSection({ ids, headline = "Frequently asked" }: { ids: string[]; headline?: string }) {
  const items = getFaqsByIds(ids);
  if (items.length === 0) return null;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <span className="eyebrow">FAQs</span>
            <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">{headline}</h2>
          </div>
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="border-t border-border">
              {items.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border-b border-border">
                  <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}
