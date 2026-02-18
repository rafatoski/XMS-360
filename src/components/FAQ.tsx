import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion"

const faqs = [
    {
        question: "How is XMS different from a traditional agency?",
        answer: "We are a hybrid AI + Human ecosystem. Traditional agencies rely on manual labor and billable hours. We rely on intelligent automation and performance outcomes. We don't just execute; we build you a proprietary growth engine."
    },
    {
        question: "What is AEO and why does it matter?",
        answer: "AEO (Answer Engine Optimization) is the future of SEO. As users shift to AI search (ChatGPT, Perplexity, Gemini), ranking for keywords isn't enough. You need to be the referenced authority. We optimize your brand to be cited by AI models."
    },
    {
        question: "Do I need to replace my current team?",
        answer: "No. XMS is an ecosystem accelerator. We often partner with internal marketing teams to supercharge their capabilities with AI tools and high-level strategy, allowing them to focus on creative and execution."
    },
    {
        question: "How fast can we see results?",
        answer: "Our 'Diagnose' and 'Architect' phases typically take 2-3 weeks. Deployment begins immediately after. Most clients see significant efficiency gains within 30 days and measurable revenue impact within 60-90 days."
    },
    {
        question: "Is this suitable for B2B or B2C?",
        answer: "Both. The core principles of the XMS Ecosystem—Authority, Automation, and Analytics—are universal. We tailor the specific channels and messaging to fit your business model, whether it's high-ticket B2B sales or high-volume B2C acquisition."
    }
];

export default function FAQ() {
    return (
        <section className="py-24 md:py-28 bg-black relative overflow-hidden" id="faq">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold font-display text-white mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-white/60">
                            Everything you need to know about the XMS Ecosystem.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl px-6 data-[state=open]:bg-white/10 data-[state=open]:border-blue-500/30 transition-all duration-300"
                                >
                                    <AccordionTrigger className="text-left text-white hover:text-blue-400 font-display text-lg py-6 hover:no-underline transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white/70 font-sans text-base pb-6 leading-relaxed border-t border-white/5 pt-4">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
