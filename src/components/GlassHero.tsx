import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import LiquidBackground from './LiquidBackground';

export default function GlassHero() {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">

            {/* Main Liquid Background Animation */}
            <div className="absolute inset-0 z-0 select-none">
                {/* [NEW] High-End Liquid Background Animation (Prism Style) */}
                <LiquidBackground />

                {/* Granular Noise Overlay for Texture - Keeping it subtle above the liquid */}
                <div className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            {/* Hero Background Elements - Maintaining transparency */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 z-20 relative py-20">
                <div className="max-w-7xl">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center md:text-left relative group"
                    >
                        {/* Subtle Inner Glow */}
                        <div className="absolute top-0 left-0 w-3/4 h-32 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-mono tracking-widest uppercase mb-6 hover:bg-white/10 transition-colors cursor-default"
                        >
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span>AI-Powered 360° Marketing Ecosystem</span>
                        </motion.div>

                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6">
                            <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Your Competitors Are Still Doing It Manually.
                            </span>
                            <br />
                            <span className="text-white relative">
                                You Don't Have To.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-base md:text-lg text-white/70 max-w-2xl mb-8 font-sans leading-relaxed">
                            XMS AI combines 20+ years of marketing expertise with an enterprise-grade autonomous ecosystem. Diagnose, Architect, Deploy, and Optimize —
                            <span className="text-white font-medium"> instantly.</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                            <Button
                                asChild
                                className="h-14 px-10 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 group"
                            >
                                <a href="#contact">
                                    Get My Free Audit
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>

                            <a
                                href="#tools"
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white pb-1"
                            >
                                Explore The Ecosystem →
                            </a>
                        </div>

                        {/* Certification Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="flex items-center justify-center md:justify-start gap-8 md:gap-12 mt-12 pt-8 "
                        >
                            <img
                                src="/brand/meta-partner.png"
                                alt="Meta Partner"
                                className="h-7 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                            <img
                                src="/brand/google-ads-partner.png"
                                alt="Google Ads Partner"
                                className="h-6 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                            <img
                                src="/brand/google-certified.png"
                                alt="Google Certified"
                                className="h-6 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
