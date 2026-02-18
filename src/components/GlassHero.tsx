import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function GlassHero() {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Background Image with Blur & Dim Overlay */}
            <div className="absolute inset-0 z-0 select-none">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Abstract City/Tech Background - High Quality Placeholder */}
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                    alt="Deep Space Abstract"
                    className="w-full h-full object-cover blur-sm opacity-50 scale-105"
                />
                {/* Granular Noise Overlay for Texture */}
                <div className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            {/* Glassmorphism Background Overlay */}
            <div className="absolute inset-0 z-10 backdrop-blur-xl bg-white/5 border-b border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"></div>

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
                            <Button className="h-14 px-10 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 group">
                                Get My Free Audit
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white pb-1">
                                Explore The Ecosystem →
                            </button>
                        </div>

                        {/* Certification Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="flex items-center justify-center md:justify-start gap-8 md:gap-12 mt-12 pt-8 "
                        >
                            <img
                                src="https://wemanageweb.co.uk/wp-content/uploads/2024/02/meta_partner_logo.png"
                                alt="Meta Partner"
                                className="h-7 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                            <img
                                src="https://wexpert.com.au/wp-content/uploads/2022/01/Logo-4.png"
                                alt="Google Ads Partner"
                                className="h-6 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                            <img
                                src="https://fullermarketing.ie/wp-content/uploads/2018/09/google-logo-white-small.png"
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
