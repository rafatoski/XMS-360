import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        website: '',
        goals: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!formData.goals) {
            newErrors.goals = 'Please select your primary goal';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // TODO: Replace with actual form submission
            // Options:
            // 1. Netlify Forms: add data-netlify="true" to form
            // 2. Formspree: action="https://formspree.io/f/YOUR_FORM_ID"
            // 3. Web3Forms: https://web3forms.com/
            // 4. Custom API endpoint

            console.log('Form submitted:', formData);
            alert('Thank you! We\'ll contact you soon. (Note: This is a demo - please integrate with a real form service)');

            // Reset form
            setFormData({
                name: '',
                businessName: '',
                email: '',
                phone: '',
                website: '',
                goals: '',
                message: '',
            });
        }
    };

    return (
        <section id="contact" className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get Your Free AI-Powered Marketing Audit
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Discover how AI can transform your marketing. No obligations, just insights.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Your Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="businessName">
                                Business Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                placeholder="Your Business LLC"
                                className={errors.businessName ? 'border-destructive' : ''}
                            />
                            {errors.businessName && (
                                <p className="text-sm text-destructive">{errors.businessName}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@business.com"
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                Phone <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(772) 555-0123"
                                className={errors.phone ? 'border-destructive' : ''}
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website">Website (optional)</Label>
                        <Input
                            id="website"
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourbusiness.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="goals">
                            Primary Goal <span className="text-destructive">*</span>
                        </Label>
                        <select
                            id="goals"
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.goals ? 'border-destructive' : ''
                                }`}
                        >
                            <option value="">Select your primary goal</option>
                            <option value="more-leads">Generate More Leads</option>
                            <option value="local-seo">Improve Local SEO</option>
                            <option value="social-media">Grow Social Media</option>
                            <option value="website">Build/Redesign Website</option>
                            <option value="ads">Run Paid Ads Campaigns</option>
                            <option value="automation">Marketing Automation</option>
                            <option value="full-ecosystem">Full 360 Ecosystem</option>
                        </select>
                        {errors.goals && (
                            <p className="text-sm text-destructive">{errors.goals}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Tell us about your business (optional)</Label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="What services do you offer? What are your biggest marketing challenges?"
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Request My Free Audit
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to be contacted by XMS-AI regarding your marketing needs.
                    </p>
                </form>
            </div>
        </section>
    );
}
