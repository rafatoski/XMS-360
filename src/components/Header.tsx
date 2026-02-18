import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const navItems = [
        { label: 'Services', id: 'services' },
        { label: 'Why Us', id: 'why-us' },
        { label: 'Ecosystem 360', id: 'ecosystem' },
        { label: 'Testimonials', id: 'testimonials' },
        { label: 'FAQ', id: 'faq' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:opacity-80 transition-opacity"
                >
                    <img
                        src="/brand/XMS LOGO - WHITE BACKGROUND.webp"
                        alt="XMS - Xperience AI Marketing Solutions"
                        className="h-12 w-auto"
                    />
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}
                    <Button onClick={() => scrollToSection('contact')} size="sm">
                        Get a Free AI-Powered Audit
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <nav className="container mx-auto flex flex-col gap-4 p-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        <Button onClick={() => scrollToSection('contact')} className="w-full">
                            Get a Free AI-Powered Audit
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
