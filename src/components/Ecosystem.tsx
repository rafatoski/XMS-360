import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Megaphone, Share2, Globe, PenTool } from 'lucide-react';

const ecosystemNodes = [
    {
        id: 'seo',
        title: 'AI SEO',
        badge: 'AISCO™ — AI Search Content Optimization',
        icon: <Search className="w-6 h-6 text-black" />,
        description: "Rank on Google. Get cited by AI. We optimize your brand for both.",
        tools: ["Semrush AI", "Ahrefs", "DeepSeek"],
        stat: "93% Search Initiation",
        position: { x: 0, y: -160 }
    },
    {
        id: 'sem',
        title: 'AI SEM',
        badge: 'Smart PPC — Certified Google Ads',
        icon: <Megaphone className="w-6 h-6 text-black" />,
        description: "Every ad dollar working at maximum intelligence with automated bidding.",
        tools: ["Google AI Max", "Auto-Bidding"],
        stat: "$2:$1 Avg ROI",
        position: { x: 150, y: -50 }
    },
    {
        id: 'social',
        title: 'AI Social Media',
        badge: 'Social Intelligence Engine',
        icon: <Share2 className="w-6 h-6 text-black" />,
        description: "Right message, right person, right moment — at scale.",
        tools: ["AI Content", "Smart Segmentation"],
        stat: "3x Engagement",
        position: { x: 100, y: 120 }
    },
    {
        id: 'web',
        title: 'AI Websites',
        badge: 'Conversion Architecture',
        icon: <Globe className="w-6 h-6 text-black" />,
        description: "Your website transformed into a 24/7 growth machine.",
        tools: ["AI UX Analysis", "Lovable", "A/B Testing"],
        stat: "7% Conversion Loss per 1s Delay",
        position: { x: -100, y: 120 }
    },
    {
        id: 'creative',
        title: 'Creative Content',
        badge: 'AI Creative Intelligence',
        icon: <PenTool className="w-6 h-6 text-black" />,
        description: "Hundreds of high-impact assets. Zero creative bottlenecks.",
        tools: ["Firefly", "Gemini", "AI Video"],
        stat: "+33% Revenue with Consistency",
        position: { x: -150, y: -50 }
    }
];

export default function Ecosystem() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <section id="ecosystem" className="py-32 bg-background relative overflow-hidden min-h-[900px] flex items-center justify-center">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col items-center">

                <div className="text-center max-w-3xl mb-24">
                    <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">THE XMS AI DIFFERENCE</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        One Ecosystem. Five Intelligent Systems. <br />
                        <span className="text-white/50">Infinite Growth Potential.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-sans">
                        We engineer an interconnected AI-powered growth ecosystem where every component amplifies the others.
                    </p>
                </div>

                <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center">

                    {/* Gold Orbit Rings */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-10 md:inset-20 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                    {/* Central Hub */}
                    <motion.div
                        className="relative z-20 w-48 h-48 rounded-full bg-black border border-accent/30 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(201,168,76,0.2)]"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="absolute inset-0 bg-accent/5 rounded-full animate-pulse" />
                        <div className="text-center p-6">
                            <div className="text-4xl font-display font-bold text-white mb-1">XMS</div>
                            <div className="text-xs font-mono text-accent tracking-widest">360° ENGINE</div>
                        </div>
                    </motion.div>

                    {/* Orbiting Nodes */}
                    {ecosystemNodes.map((node, index) => (
                        <motion.div
                            key={node.id}
                            className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-black border border-white/10 flex items-center justify-center cursor-pointer z-30 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:bg-accent"
                            style={{
                                top: '50%',
                                left: '50%',
                                marginTop: -48, // Half of height (approx)
                                marginLeft: -48, // Half of width
                                x: node.position.x * 1.5, // Scale spread
                                y: node.position.y * 1.5
                            }}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                            onHoverStart={() => setActiveNode(node.id)}
                            onHoverEnd={() => setActiveNode(null)}
                        >
                            <div className="text-white group-hover:text-black transition-colors duration-300">
                                {React.cloneElement(node.icon as React.ReactElement, { className: "w-6 h-6 text-white group-hover:text-black" })}
                            </div>

                            {/* Connecting Line to Centre */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-20" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                                <line x1="50%" y1="50%" x2={-node.position.x * 1.2} y2={-node.position.y * 1.2} stroke="#C9A84C" strokeWidth="1" />
                            </svg>

                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 md:opacity-100 transition-opacity">
                                <span className="text-xs font-medium text-white/50 uppercase tracking-wide group-hover:text-accent font-mono">{node.title}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Detail Card Overlay */}
                <AnimatePresence mode='wait'>
                    {activeNode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-10 md:bottom-20 z-40 bg-[rgba(14,18,32,0.9)] backdrop-blur-3xl border border-accent/20 p-8 rounded-3xl max-w-xl w-full shadow-2xl"
                        >
                            {ecosystemNodes.filter(n => n.id === activeNode).map(n => (
                                <div key={n.id}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20">
                                                {n.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white font-display">{n.title}</h3>
                                                <div className="text-xs text-accent font-mono uppercase mt-1">{n.badge}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-white">{n.stat}</div>
                                            <div className="text-xs text-white/30 uppercase tracking-wider">Impact</div>
                                        </div>
                                    </div>
                                    <p className="text-white/70 leading-relaxed text-sm mb-4 font-sans">
                                        {n.description}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {n.tools.map(t => (
                                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/5 font-mono">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
