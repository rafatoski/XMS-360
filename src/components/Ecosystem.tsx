import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Megaphone, Share2, Globe, PenTool, Database, Zap, BarChart } from 'lucide-react';

const ecosystemNodes = [
    {
        id: 'seo',
        title: 'AI SEO & AEO',
        icon: <Search className="w-6 h-6 text-white" />,
        description: "Dominate both traditional search and AI Answer Engines (ChatGPT, Gemini).",
        tools: ["Semrush", "Perplexity", "SurferSEO"],
        stat: "+300% Organic Traffic",
        position: { x: 0, y: -160 } // Top
    },
    {
        id: 'sem',
        title: 'AI Paid Ads',
        icon: <Megaphone className="w-6 h-6 text-white" />,
        description: "Programmatic ad buying and optimization for max ROAS.",
        tools: ["Google Ads AI", "Meta Advantage+"],
        stat: "-40% CPC Reduction",
        position: { x: 150, y: -50 } // Top Right
    },
    {
        id: 'social',
        title: 'AI Social',
        icon: <Share2 className="w-6 h-6 text-white" />,
        description: "Automated content distribution and engagement at scale.",
        tools: ["Opus Clip", "Jasper", "ManyChat"],
        stat: "24/7 Engagement",
        position: { x: 100, y: 120 } // Bottom Right
    },
    {
        id: 'web',
        title: 'Smart Websites',
        icon: <Globe className="w-6 h-6 text-white" />,
        description: "Self-optimizing landing pages that adapt to user behavior.",
        tools: ["Framer", "V0", "Hotjar AI"],
        stat: "2x Conversion Rate",
        position: { x: -100, y: 120 } // Bottom Left
    },
    {
        id: 'creative',
        title: 'Gen AI Creative',
        icon: <PenTool className="w-6 h-6 text-white" />,
        description: "Unlimited high-quality assets generated in seconds.",
        tools: ["Midjourney", "Runway", "ElevenLabs"],
        stat: "10x Content Speed",
        position: { x: -150, y: -50 } // Top Left
    }
];

export default function Ecosystem() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <section id="ecosystem" className="py-32 bg-background relative overflow-hidden min-h-[1000px] flex items-center justify-center">
            {/* Background Decor - Blue */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col items-center">

                <div className="text-center max-w-3xl mb-24">
                    <span className="text-blue-500 text-sm font-mono tracking-widest uppercase mb-4 block">The XMS AI Difference</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        One Ecosystem. <br />
                        <span className="text-white/50">Five Intelligent Systems.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We engineer an interconnected AI-powered growth ecosystem where every component amplifies the others.
                    </p>
                </div>

                <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center">

                    {/* Orbit Rings */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-10 md:inset-20 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                    {/* Central Hub */}
                    <motion.div
                        className="relative z-20 w-48 h-48 rounded-full bg-black border border-blue-500/30 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                        <div className="text-center p-6">
                            <div className="text-4xl font-display font-bold text-white mb-1">XMS</div>
                            <div className="text-xs font-mono text-blue-400 tracking-widest">360° ENGINE</div>
                        </div>
                    </motion.div>

                    {/* Orbiting Nodes */}
                    {ecosystemNodes.map((node, index) => (
                        <motion.div
                            key={node.id}
                            className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-black border border-white/10 flex items-center justify-center cursor-pointer z-30 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
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
                            {node.icon}

                            {/* Connecting Line to Centre */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-20" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                                <line x1="50%" y1="50%" x2={-node.position.x * 1.2} y2={-node.position.y * 1.2} stroke="white" strokeWidth="1" />
                            </svg>

                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 md:opacity-100 transition-opacity">
                                <span className="text-xs font-medium text-white/50 uppercase tracking-wide">{node.title}</span>
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
                            className="absolute bottom-10 md:bottom-20 z-40 bg-black/90 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl max-w-xl w-full shadow-2xl"
                        >
                            {ecosystemNodes.filter(n => n.id === activeNode).map(n => (
                                <div key={n.id}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                                {n.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white font-display">{n.title}</h3>
                                                <div className="flex gap-2 mt-1">
                                                    {n.tools.map(t => (
                                                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-blue-400">{n.stat}</div>
                                            <div className="text-xs text-white/30 uppercase tracking-wider">Avg. Impact</div>
                                        </div>
                                    </div>
                                    <p className="text-white/70 leading-relaxed text-sm">
                                        {n.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
