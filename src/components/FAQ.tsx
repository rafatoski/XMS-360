import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';

const faqs = [
    {
        question: "What exactly is a 360° AI Marketing Ecosystem?",
        answer: "Unlike agencies that offer isolated services, XMS AI builds an interconnected system where SEO, paid ads, social media, your website, and creative content all feed data into each other — amplified by AI. The result is a compounding growth engine, not a collection of disconnected tactics."
    },
    {
        question: "What is AEO and why does it matter for my business?",
        answer: "Answer Engine Optimization (AEO) ensures your brand is recommended when people ask AI tools like ChatGPT, Gemini, or Perplexity for products or services in your space. As AI-powered search becomes the norm, being present in these results is no longer optional — it's competitive survival."
    },
    {
        question: "How long before I start seeing results?",
        answer: "Most clients see meaningful data and early performance signals within the first 30-60 days. Significant growth — organic ranking, lead volume, ROAS improvements — typically compounds between months 3-6 as the AI systems learn and optimize."
    },
    {
        question: "Do I need to understand AI to work with you?",
        answer: "Not at all. We handle all the technical complexity. You provide your business goals; we translate them into an AI-powered strategy. You get clear, jargon-free reports that show exactly what's happening and why."
    },
    {
        question: "How is XMS AI different from a traditional marketing agency?",
        answer: "Traditional agencies use manual processes, intuition-based decisions, and siloed services. XMS AI runs on enterprise-grade AI tools, cross-channel data intelligence, and 20+ years of human expertise — delivering speed, precision, and scalability that traditional agencies simply can't match."
    },
    {
        question: "What industries do you specialize in?",
        answer: "We serve 15+ industries including healthcare, real estate, legal, home services, retail, restaurants, and professional services. Our AI systems are calibrated to your specific competitive landscape and audience behavior, not applied generically."
    }
];

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">

                <div className="text-center mb-16">
                    <span className="text-accent text-sm font-mono tracking-widest uppercase block mb-4">FAQ</span>
                    <h2 className="text-4xl font-display font-bold text-white mb-6">
                        Everything You Need to Know <br />
                        <span className="text-white/50">Before We Start Growing Together</span>
                    </h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-2xl bg-white/5 px-6">
                            <AccordionTrigger className="text-lg font-medium text-white hover:text-accent font-display py-6 text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

            </div>
        </section>
    );
}
