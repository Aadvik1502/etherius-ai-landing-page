import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does a typical AI implementation take?",
    answer: "Most projects range from 2-6 months depending on complexity. We start with quick wins (30-90 days) while building toward larger strategic initiatives."
  },
  {
    question: "What if we don't have clean data?",
    answer: "Data readiness is part of our assessment. We help you identify data gaps and create a plan to prepare your data for AI success."
  },
  {
    question: "How do you measure ROI from AI projects?",
    answer: "We establish clear KPIs upfront and use both leading indicators (efficiency gains, process improvements) and lagging indicators (revenue, cost savings) to track success."
  },
  {
    question: "Do you work with companies outside of tech?",
    answer: "Absolutely. We have deep expertise across industries including manufacturing, healthcare, finance, retail, and professional services."
  },
  {
    question: "What size companies do you typically work with?",
    answer: "Our sweet spot is mid-market to enterprise companies with dedicated technology teams and budget for AI initiatives."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Frequently Asked <span className="text-neon-yellow">Questions</span>
          </h2>
          <p className="text-xl text-white leading-relaxed">
            Get answers to common questions about AI implementation and working with Etherius.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/20 rounded-lg px-6 bg-deep-blue"
              >
                <AccordionTrigger className="text-left hover:text-neon-yellow transition-colors py-6">
                  <span className="text-lg font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};