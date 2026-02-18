import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';

export default function FAQ() {
    const faqs = [
        {
            question: 'What is an AI-powered 360 marketing ecosystem?',
            answer:
                'Our 360 ecosystem combines traditional marketing expertise with AI automation. We build a comprehensive Knowledge Base of your business data, then use AI agents to optimize campaigns, content, and workflows across all channels—SEO, ads, social media, web, and more. Everything is connected and data-driven.',
        },
        {
            question: 'How fast can we see results?',
            answer:
                'Timeline varies by service. Local SEO and Google Business Profile optimization can show improvements in 4-8 weeks. Paid ads campaigns often generate leads within the first week. Our AI-powered approach accelerates decision-making and iteration, helping you see meaningful traction faster than traditional agencies.',
        },
        {
            question: 'Do you work with small local businesses only?',
            answer:
                'We specialize in helping small to medium-sized businesses in Treasure Coast, Florida. Our sweet spot is local service providers, retail, healthcare, home services, and professional services. We understand the unique challenges of local markets and tailor our strategies accordingly.',
        },
        {
            question: 'What is included in the free audit?',
            answer:
                'Your free AI-powered audit includes: analysis of your current online presence (website, SEO, Google Business Profile), competitive landscape review, identification of quick-win opportunities, and a customized roadmap with prioritized recommendations. No obligations, just actionable insights.',
        },
        {
            question: 'Do you manage my Google Business Profile & Local SEO?',
            answer:
                'Absolutely. Local SEO and Google Business Profile management are core services. We optimize your profile, manage reviews, create posts, track rankings, build local citations, and ensure your business shows up when locals search for your services. This is critical for Treasure Coast businesses.',
        },
        {
            question: 'Can you integrate with my CRM or booking system?',
            answer:
                'Yes. We work with popular platforms like HubSpot, Salesforce, Zoho, Calendly, and many others. Our AI automations can sync data, trigger workflows, and ensure your marketing and operations stay connected. If you have a custom system, we will explore integration options during onboarding.',
        },
    ];

    return (
        <section id="faq" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Everything you need to know about working with XMS-AI
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
