import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

// ─── Web3Forms ────────────────────────────────────────────────────────────────
// 1. Go to https://web3forms.com and sign up with your email
// 2. Replace the value below with your access key
const WEB3FORMS_ACCESS_KEY = '82b71a45-0d14-4ab2-a4de-1921143c5bcf';
// ─────────────────────────────────────────────────────────────────────────────

const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

interface FormData {
    name: string;
    businessName: string;
    email: string;
    phone: string;
    website: string;
    goals: string;
    message: string;
}

const EMPTY_FORM: FormData = {
    name: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    goals: '',
    message: '',
};

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!PHONE_REGEX.test(formData.phone.trim())) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.goals) newErrors.goals = 'Please select your primary goal';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `New Audit Request from ${formData.businessName}`,
                    from_name: formData.name,
                    ...formData,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData(EMPTY_FORM);
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <section id="contact" className="py-20 bg-black">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <div className="glass-card rounded-2xl p-12 space-y-4">
                        <div className="text-5xl mb-4">✅</div>
                        <h2 className="text-3xl font-bold text-gradient-blue">
                            Request Received!
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Thank you! We'll review your information and reach out within 24 hours with your free audit.
                        </p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="mt-6 text-sm text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
                        >
                            Submit another request
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get Your Free AI-Powered Marketing Audit
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Discover how AI can transform your marketing. No obligations, just insights.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

                    {submitStatus === 'error' && (
                        <p className="text-sm text-destructive text-center">
                            Something went wrong. Please try again or email us directly.
                        </p>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            'Request My Free Audit'
                        )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to be contacted by XMS-AI regarding your marketing needs.
                    </p>
                </form>
            </div>
        </section>
    );
}
