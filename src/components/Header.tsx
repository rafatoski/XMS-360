import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const XMS_BASE = 'https://xperienceaimarketing.com';

const navLinks = [
    { name: 'About Us', href: `${XMS_BASE}/about-us-xms-ai-marketing-team/` },
    { name: 'Ai Marketing Solutions', href: `${XMS_BASE}/360-ecosystem` },
    { name: 'Ai Websites', href: `${XMS_BASE}/website-development/` },
    { name: 'Creative Content', href: `${XMS_BASE}/creative-content-and-design/` },
    { name: 'Contact Us', href: `${XMS_BASE}/contact-us/` },
];

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

    // Open the audit modal (defined in GlassHero)
    const openAuditModal = () => {
        const overlay = document.getElementById('xmsModalOverlay');
        if (overlay) {
            overlay.classList.add('active');
            const urlInput = document.getElementById('xmsWebsiteUrl') as HTMLInputElement | null;
            if (urlInput) urlInput.focus();
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                : 'bg-transparent py-6 border-b border-transparent'
                }`}
        >
            <div className={`container mx-auto px-6 flex items-center justify-between relative z-50 ${isScrolled ? 'md:px-8' : 'md:px-6'}`}>
                <a href={XMS_BASE} className="flex items-center gap-2 shrink-0">
                    {/* LOGO */}
                    <img src={`${import.meta.env.BASE_URL}brand/XMS LOGO - BLACK BACKGROUND.webp`} alt="XMS Ai Logo" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'} w-auto`} />
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${isScrolled ? 'text-white/90 hover:text-blue-400' : 'text-white/70 hover:text-blue-400'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Button
                        onClick={openAuditModal}
                        className={`bg-blue-600 text-white hover:bg-blue-500 rounded-full transition-all shadow-[0_0_15px_-5px_rgba(59,130,246,0.4)] ${isScrolled ? 'px-5 py-1.5 h-9 text-sm' : 'px-6 h-11'}`}
                    >
                        Get Free Audit
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                            <Button
                                onClick={openAuditModal}
                                className="bg-blue-600 text-white hover:bg-blue-500 w-full mt-4 py-6 text-lg rounded-xl"
                            >
                                Get Free Audit
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
