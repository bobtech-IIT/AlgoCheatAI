import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the Content Lab audit work?",
    a: "Our proprietary algorithm scanner runs completely in-browser, leveraging advanced client-side edge models to score your drafts. This ensures extreme speed and zero server lag without compromising your content's privacy.",
  },
  {
    q: "How is this different from Taplio or AuthoredUp?",
    a: "Those are scheduling-first tools with surface-level scoring. AlgoCheat is built around a strict 10-parameter audit calibrated to the 2026 algorithm, with format-specific rubrics for text, image carousels, and articles — plus a generator that scores its own output before delivery.",
  },
  {
    q: "Will posting AI-assisted content get me deprioritized by LinkedIn?",
    a: "Generic AI slop, yes. The 2026 algorithm is brutal to it. Our rubric specifically penalizes AI-detection signals (em-dashes, em-dash phrasing, generic 'unlock', 'leverage', list-stuffing) so the output reads as authored, not generated.",
  },
  {
    q: "Can I cancel my waitlist or subscription anytime?",
    a: "Yes. Monthly plans cancel instantly. Annual plans get a pro-rated refund inside 14 days, no questions asked.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee a 10/10 audit score on every generated post. We can't guarantee your audience will love your topic — that's still on you. But if a 10/10 post flops repeatedly, your niche or offer needs work, not your formatting.",
  },
  {
    q: "What about agencies / teams?",
    a: "Right now this is built for solo operators. A multi-seat plan is coming Q2 2026 — join the Pro waitlist and we'll loop you in.",
  },
  {
    q: "Do you store my posts or data?",
    a: "No. All audits and rewrites run client-side on your local device via encrypted browser edge proxies. We do not store your drafts, nor do we run them through central databases, guaranteeing 100% enterprise-grade privacy.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Honest <span className="text-gradient-mint">answers</span>.
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border/60 bg-card/40 px-5 data-[state=open]:border-primary/40 data-[state=open]:bg-card/70"
            >
              <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
