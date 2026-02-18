import React from 'react';
import { motion } from 'framer-motion';

// External Logos (using reliable CDNs or placeholders)
const ImageMap: Record<string, string> = {
    "OpenAI": "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    "Gemini": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    "DeepSeek": "https://upload.wikimedia.org/wikipedia/commons/e/ec/DeepSeek_logo.svg",
    "Zapier": "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    "n8n": "https://upload.wikimedia.org/wikipedia/commons/4/4e/N8n-logo.svg",
    "Adobe Firefly": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Adobe_Firefly_Icon.svg", // Finding a better SVG if possible
    "Semrush": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Semrush_logo.svg/2560px-Semrush_logo.svg.png",
    "Ahrefs": "https://companieslogo.com/img/orig/ahrefs_BIG-20d12c92.png",
    "Make.com": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Make_Logo.svg",
    "Lovable": "https://lovable.dev/favicon.ico",
    "Moz": "https://www.vectorlogo.zone/logos/moz/moz-icon.svg",
    "HubSpot": "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg",
    "Shopify": "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg",
    "TikTok": "https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg",
    "LinkedIn": "https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg",
    "Stripe": "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg",
    "Klaviyo": "https://cdn.worldvectorlogo.com/logos/klaviyo.svg",
    "WordPress": "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg",
    "Salesforce": "https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg",
    "Mailchimp": "https://www.vectorlogo.zone/logos/mailchimp/mailchimp-icon.svg",
    "Canva": "https://www.vectorlogo.zone/logos/canva/canva-icon.svg",
    "Figma": "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
    "Google Ads": "https://www.vectorlogo.zone/logos/google_ads/google_ads-icon.svg",
    "Meta": "https://www.vectorlogo.zone/logos/meta/meta-icon.svg",
    "Google Analytics": "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg",
    "Looker": "https://www.vectorlogo.zone/logos/google_looker/google_looker-icon.svg",
    "Midjourney": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.svg",
    "Notion": "https://www.vectorlogo.zone/logos/notion/notion-icon.svg",
    "Webflow": "https://www.vectorlogo.zone/logos/webflow/webflow-icon.svg",
    "React": "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
    "Astro": "https://www.vectorlogo.zone/logos/astro/astro-icon.svg",
    "Tailwind": "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    "Python": "https://www.vectorlogo.zone/logos/python/python-icon.svg",
    "Perplexity": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg"
};

const toolsRow1 = [
    "Google Ads", "Meta", "OpenAI", "Semrush", "HubSpot",
    "Shopify", "TikTok", "LinkedIn", "Zapier", "Stripe"
];

const toolsRow2 = [
    "Klaviyo", "WordPress", "Salesforce", "Mailchimp", "Canva",
    "DeepSeek", "Make.com", "n8n", "Adobe Firefly", "Figma"
];

const toolsRow3 = [
    "Google Analytics", "Looker", "Perplexity", "Midjourney", "Notion",
    "Webflow", "React", "Astro", "Tailwind", "Python", "Gemini", "Lovable", "Moz", "Ahrefs"
];

// Duplicate lists for seamless loop
const marqueeRow1 = [...toolsRow1, ...toolsRow1, ...toolsRow1];
const marqueeRow2 = [...toolsRow2, ...toolsRow2, ...toolsRow2];
const marqueeRow3 = [...toolsRow3, ...toolsRow3, ...toolsRow3];

const ToolCard = ({ name }: { name: string }) => {
    const ImageUrl = ImageMap[name];

    return (
        <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
            <div className="w-52 h-36 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] group overflow-hidden p-8">
                {ImageUrl ? (
                    <img
                        src={ImageUrl}
                        alt={name}
                        className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                ) : (
                    <span className="text-sm font-bold text-white/40 font-display">{name}</span>
                )}
            </div>
        </div>
    );
};

export default function ModernTools() {
    return (
        <section className="py-24 md:pt-28 md:pb-4 bg-background relative overflow-hidden text-white border-y border-white/5">

            <div className="text-center max-w-3xl mx-auto mb-20 px-4">
                <span className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-4 block">THE TECHNOLOGY BEHIND YOUR GROWTH</span>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                    Enterprise-Grade AI Tools. <br />
                    <span className="text-white/50">Working For You 24/7.</span>
                </h2>
                <p className="text-white/60 font-sans text-base">
                    We deploy the most powerful AI platforms available —
                    the same technology used by Fortune 500 companies.
                </p>
            </div>

            {/* Marquee Container - Full Width */}
            <div className="relative w-full overflow-hidden py-12 flex flex-col gap-4">
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>

                {/* Row 1 */}
                <motion.div
                    className="flex gap-4 min-w-max"
                    animate={{ x: [0, -2000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeRow1.map((tool, index) => (
                        <ToolCard key={`r1-${tool}-${index}`} name={tool} />
                    ))}
                </motion.div>

                {/* Row 2 */}
                <motion.div
                    className="flex gap-4 min-w-max"
                    animate={{ x: [-500, -2500] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 55,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeRow2.map((tool, index) => (
                        <ToolCard key={`r2-${tool}-${index}`} name={tool} />
                    ))}
                </motion.div>

                {/* Row 3 */}
                <motion.div
                    className="flex gap-4 min-w-max"
                    animate={{ x: [-200, -2200] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 45,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeRow3.map((tool, index) => (
                        <ToolCard key={`r3-${tool}-${index}`} name={tool} />
                    ))}
                </motion.div>
            </div>



        </section>
    );
}
