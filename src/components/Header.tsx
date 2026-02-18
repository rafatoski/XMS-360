import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Tools', href: '#tools' },
        { name: 'Results', href: '#testimonials' },
        { name: 'Industries', href: '#industries' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                    {/* LOGO REPLACEMENT */}
                    <img src="/brand/XMS LOGO - BLACK BACKGROUND.webp" alt="XMS AI Logo" className="h-14 w-auto" />
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-blue-400 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Button className="bg-blue-600 text-white hover:bg-blue-500 rounded-full px-6 transition-all shadow-[0_0_15px_-5px_rgba(59,130,246,0.4)]">
                        Get Free Audit
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 bg-black z-40 pt-24 px-4 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-display font-bold text-white hover:text-blue-400"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button className="bg-blue-600 text-white hover:bg-blue-500 w-full mt-4 py-6 text-lg rounded-xl">
                                Get Free Audit
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
