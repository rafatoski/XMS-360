import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MousePointer, Share2, Layout, PenTool, Database, Cpu, Zap, BarChart, Globe } from 'lucide-react';

const ecosystemNodes = [
    {
        id: 'seo',
        title: 'AI SEO',
        icon: <Search className="w-6 h-6" />,
        badge: 'AISCO™',
        desc: 'Rank on Google. Get cited by AI.',
        tools: ['Semrush AI', 'Ahrefs', 'Moz Pro', 'DeepSeek'],
        stat: '93% of online experiences start with search',
        position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
    },
    {
        id: 'sem',
        title: 'AI SEM',
        icon: <MousePointer className="w-6 h-6" />,
        badge: 'Smart PPC',
        desc: 'Every ad dollar working at maximum intelligence.',
        tools: ['Google AI Max', 'Auto-Bidding', 'Multivariate Testing'],
        stat: '$2 earned for every $1 spent',
        position: 'top-[30%] right-[5%] translate-x-1/2'
    },
    {
        id: 'social',
        title: 'AI Social',
        icon: <Share2 className="w-6 h-6" />,
        badge: 'Social Intelligence',
        desc: 'Right message, right person, right moment.',
        tools: ['AI Generation', 'Smart Segmentation', 'Auto-Opt'],
        stat: '3x higher engagement with AI strategy',
        position: 'bottom-[30%] right-[5%] translate-x-1/2'
    },
    {
        id: 'web',
        title: 'AI Websites',
        icon: <Layout className="w-6 h-6" />,
        badge: 'Conversion Arc',
        desc: 'Your website. Transformed into a 24/7 growth machine.',
        tools: ['AI UX Analysis', 'Lovable', 'A/B Insights'],
        stat: '1s delay drops conversion by 7%',
        position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
    },
    {
        id: 'creative',
        title: 'AI Creative',
        icon: <PenTool className="w-6 h-6" />,
        badge: 'Creative Intel',
        desc: 'High-impact assets. Zero bottlenecks.',
        tools: ['Firefly', 'Gemini', 'AI Video', 'Brand AI'],
        stat: '33% revenue lift with consistent creative',
        position: 'top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2'
    },
];

export default function Ecosystem() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <section id="ecosystem" className="py-32 bg-background relative overflow-hidden min-h-[1000px] flex items-center justify-center">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">

                <div className="text-center max-w-3xl mb-24">
                    <span className="text-accent text-sm font-mono tracking-widest uppercase mb-4 block">The XMS AI Difference</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        One Ecosystem. <br />
                        <span className="text-white/50">Five Intelligent Systems.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We engineer an interconnected AI-powered growth ecosystem where every component amplifies the others.
                    </p>
                </div>

                {/* The Solar System Diagram */}
                <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center">

                    {/* Orbits */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-[15%] rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
                    <div className="absolute inset-[30%] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />

                    {/* Central Hub */}
                    <motion.div
                        className="relative z-20 w-48 h-48 rounded-full bg-black border border-accent/30 flex items-center justify-center shadow-[0_0_50px_-10px_hsl(var(--accent)/0.3)] backdrop-blur-xl group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-center p-6">
                            <div className="text-4xl font-display font-bold text-white mb-1">XMS</div>
                            <div className="text-xs font-mono text-accent tracking-widest">360° ENGINE</div>
                        </div>

                        {/* Pulse Effect */}
                        <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping opacity-20" />
                    </motion.div>

                    {/* Satellite Nodes */}
                    {ecosystemNodes.map((node, index) => {
                        // Calculate position on circle (simplified for layout, using absolute positioning classes for responsiveness in Tailwind)
                        // For a true circular layout we'd use trigonometry, but let's try a CSS grid/flex hybrid approach or absolute positioning relative to center
                        // Using rotation transform for precise placement
                        const angle = (index * 360) / ecosystemNodes.length;
                        const radius = 280; // Distance from center
                        const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                        const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                        return (
                            <motion.div
                                key={node.id}
                                className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-black border border-white/10 hover:border-accent hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.5)] z-30 cursor-pointer flex items-center justify-center transition-all duration-300 group"
                                style={{ x, y }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setActiveNode(node.id)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                <div className="text-white/70 group-hover:text-accent transition-colors">
                                    {node.icon}
                                </div>

                                {/* Connection Line to Center */}
                                <svg className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-20" style={{ transform: `rotate(${-angle}deg)` }}>
                                    <line x1="300" y1="300" x2="300" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-white/30" />
                                </svg>

                                {/* Title Label (Visible by default) */}
                                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-all ${activeNode === node.id ? 'text-accent opacity-100' : 'text-white/50 opacity-70'}`}>
                                    {node.title}
                                </div>

                            </motion.div>
                        );
                    })}

                </div>

                {/* Expanded Info Panel - Appears when hovering nodes */}
                <AnimatePresence mode='wait'>
                    {activeNode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-10 md:bottom-20 z-40 bg-black/90 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl max-w-xl w-full shadow-2xl"
                        >
                            {ecosystemNodes.filter(n => n.id === activeNode).map(node => (
                                <div key={node.id}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20">
                                            {node.icon}
                                        </span>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white font-display mb-1">{node.title}</h3>
                                            <span className="text-xs font-mono text-accent/80 border border-accent/20 px-2 py-1 rounded bg-accent/5">{node.badge}</span>
                                        </div>
                                    </div>

                                    <p className="text-white/80 mb-6 text-lg">{node.desc}</p>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-xs text-white/40 uppercase tracking-widest mb-3">Power Tools</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {node.tools.map(tool => (
                                                    <span key={tool} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">{tool}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs text-white/40 uppercase tracking-widest mb-3">Impact</h4>
                                            <div className="text-accent font-medium leading-tight text-sm">
                                                {node.stat}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fallback Instruction if no interaction */}
                {!activeNode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="absolute bottom-10 md:bottom-24 text-white/30 text-sm font-mono tracking-widest flex items-center gap-2"
                    >
                        <MousePointer className="w-4 h-4" />
                        HOVER TO EXPLORE NODES
                    </motion.div>
                )}

            </div>
        </section>
    );
}
