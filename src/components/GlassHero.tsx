import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import LiquidBackground from './LiquidBackground';

const XMS_CONTACT = 'https://xperienceaimarketing.com/contact-us/';
const N8N_WEBHOOK_URL = 'https://xmsai.app.n8n.cloud/webhook/seo-audit';

// ─── Audit Modal (self-contained, rendered once) ─────────────────────────────
function AuditModal() {
    useEffect(() => {
        const overlay = document.getElementById('xmsModalOverlay');
        const openBtn = document.getElementById('xmsOpenModal');
        const closeBtn = document.getElementById('xmsCloseModal');
        const form = document.getElementById('xmsAuditForm') as HTMLFormElement | null;
        const urlInput = document.getElementById('xmsWebsiteUrl') as HTMLInputElement | null;
        const emailInput = document.getElementById('xmsEmail') as HTMLInputElement | null;
        const submitBtn = document.getElementById('xmsSubmitBtn') as HTMLButtonElement | null;
        const successMsg = document.getElementById('xmsSuccessMessage') as HTMLElement | null;
        const errorMsg = document.getElementById('xmsErrorMessage') as HTMLElement | null;
        const urlError = document.getElementById('xmsUrlError') as HTMLElement | null;
        const emailError = document.getElementById('xmsEmailError') as HTMLElement | null;

        if (!overlay || !form || !urlInput || !emailInput || !submitBtn) return;

        const isValidUrl = (s: string) => {
            try {
                const url = new URL(s.match(/^https?:\/\//i) ? s : 'https://' + s);
                return url.protocol === 'http:' || url.protocol === 'https:';
            } catch { return false; }
        };
        const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
        const normalizeUrl = (u: string) => u.trim().match(/^https?:\/\//i) ? u.trim() : 'https://' + u.trim();

        const openModal = () => { overlay.classList.add('active'); urlInput.focus(); };
        const closeModal = () => { overlay.classList.remove('active'); resetForm(); };

        const resetForm = () => {
            form.reset();
            form.style.display = 'block';
            if (successMsg) successMsg.style.display = 'none';
            if (errorMsg) errorMsg.style.display = 'none';
            urlInput.classList.remove('error');
            emailInput.classList.remove('error');
            urlError?.classList.remove('show');
            emailError?.classList.remove('show');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Request';
        };

        openBtn?.addEventListener('click', openModal);
        closeBtn?.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal(); });

        urlInput.addEventListener('blur', () => {
            if (urlInput.value.trim() && !isValidUrl(urlInput.value.trim())) {
                urlInput.classList.add('error'); urlError?.classList.add('show');
            } else { urlInput.classList.remove('error'); urlError?.classList.remove('show'); }
        });
        emailInput.addEventListener('blur', () => {
            if (emailInput.value.trim() && !isValidEmail(emailInput.value.trim())) {
                emailInput.classList.add('error'); emailError?.classList.add('show');
            } else { emailInput.classList.remove('error'); emailError?.classList.remove('show'); }
        });
        urlInput.addEventListener('input', () => { urlInput.classList.remove('error'); urlError?.classList.remove('show'); });
        emailInput.addEventListener('input', () => { emailInput.classList.remove('error'); emailError?.classList.remove('show'); });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const url = urlInput.value.trim();
            const email = emailInput.value.trim();
            if (!isValidUrl(url)) { urlInput.classList.add('error'); urlError?.classList.add('show'); urlInput.focus(); return; }
            if (!isValidEmail(email)) { emailInput.classList.add('error'); emailError?.classList.add('show'); emailInput.focus(); return; }
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            try {
                const res = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: normalizeUrl(url), email, timestamp: new Date().toISOString() })
                });
                if (res.ok) {
                    if (successMsg) successMsg.style.display = 'block';
                    if (errorMsg) errorMsg.style.display = 'none';
                    form.style.display = 'none';
                    setTimeout(() => { overlay.classList.remove('active'); resetForm(); }, 3000);
                } else { throw new Error('Server error'); }
            } catch {
                if (errorMsg) errorMsg.style.display = 'block';
                if (successMsg) successMsg.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Request';
            }
        });
    }, []);

    return (
        <>
            {/* ── Inline styles ─────────────────────────────────────────────── */}
            <style>{`
                .xms-modal-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);backdrop-filter:blur(5px);z-index:999999;animation:xmsFadeIn .3s}
                .xms-modal-overlay.active{display:flex;justify-content:center;align-items:center}
                .xms-modal{background:#fff;padding:2.5rem;border-radius:16px;max-width:500px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.3);animation:xmsSlideUp .3s}
                .xms-modal h2{margin-bottom:.5rem;font-size:1.8rem;color:#1a1a1a}
                .xms-modal>p{margin-bottom:1.5rem;color:#666;font-size:.95rem}
                .xms-form-group{margin-bottom:1.5rem;text-align:left}
                .xms-form-group label{display:block;margin-bottom:.5rem;font-weight:600;color:#333;font-size:.95rem}
                .xms-form-group input{width:100%;padding:.9rem;font-size:1rem;border:2px solid #ddd;border-radius:8px;outline:none;transition:all .3s;box-sizing:border-box}
                .xms-form-group input:focus{border-color:#4580ed;box-shadow:0 0 0 3px rgba(69,128,237,.4)}
                .xms-form-group input.error{border-color:#b91c1c}
                .xms-error-text{color:#b91c1c;font-size:.85rem;margin-top:.3rem;display:none}
                .xms-error-text.show{display:block}
                .xms-modal-buttons{display:flex;gap:1rem;justify-content:flex-end;margin-top:2rem}
                .xms-btn-cancel{padding:.8rem 1.5rem;background:#f5f5f5;border:none;border-radius:8px;cursor:pointer;font-weight:600;transition:all .3s;color:#333}
                .xms-btn-cancel:hover{background:#e0e0e0}
                .xms-btn-submit{padding:.8rem 1.5rem;background:#1d4ed8;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;transition:all .3s}
                .xms-btn-submit:hover{background:#2563eb}
                .xms-btn-submit:disabled{background:#ccc;cursor:not-allowed}
                .xms-success-message{display:none;padding:1rem;background:#4caf50;color:#fff;border-radius:8px;margin-bottom:1rem;text-align:center}
                .xms-error-message{display:none;padding:1rem;background:#b91c1c;color:#fff;border-radius:8px;margin-bottom:1rem;text-align:center}
                @keyframes xmsFadeIn{from{opacity:0}to{opacity:1}}
                @keyframes xmsSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
                @media(max-width:768px){.xms-modal{padding:1.5rem}}
            `}</style>

            {/* ── Modal markup ──────────────────────────────────────────────── */}
            <div className="xms-modal-overlay" id="xmsModalOverlay">
                <div className="xms-modal">
                    <h2>Get Your Free Ai Growth Audit</h2>
                    <p>Enter your details below and we'll send you a comprehensive SEO analysis of your website.</p>

                    <div className="xms-success-message" id="xmsSuccessMessage">
                        ✓ Request sent successfully! Check your email for your audit.
                    </div>
                    <div className="xms-error-message" id="xmsErrorMessage">
                        ✗ There was an error sending your request. Please try again.
                    </div>

                    <form id="xmsAuditForm">
                        <div className="xms-form-group">
                            <label htmlFor="xmsWebsiteUrl">Website URL *</label>
                            <input type="text" id="xmsWebsiteUrl" name="website_url" placeholder="https://yourwebsite.com" required />
                            <div className="xms-error-text" id="xmsUrlError">Please enter a valid URL (e.g., https://example.com)</div>
                        </div>
                        <div className="xms-form-group">
                            <label htmlFor="xmsEmail">Email Address *</label>
                            <input type="email" id="xmsEmail" name="email" placeholder="your@email.com" required />
                            <div className="xms-error-text" id="xmsEmailError">Please enter a valid email address</div>
                        </div>
                        <div className="xms-modal-buttons">
                            <button type="button" className="xms-btn-cancel" id="xmsCloseModal">Cancel</button>
                            <button type="submit" className="xms-btn-submit" id="xmsSubmitBtn">Send Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function GlassHero() {
    const openAuditModal = () => {
        const overlay = document.getElementById('xmsModalOverlay');
        if (overlay) {
            overlay.classList.add('active');
            const urlInput = document.getElementById('xmsWebsiteUrl') as HTMLInputElement | null;
            if (urlInput) urlInput.focus();
        }
    };

    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">

            {/* Audit modal — rendered once, controlled via DOM */}
            <AuditModal />

            {/* Main Liquid Background Animation */}
            <div className="absolute inset-0 z-0 select-none">
                <LiquidBackground />
                <div className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            {/* Hero Background Elements */}
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
                            <span>Ai-Powered 360° Marketing Ecosystem</span>
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
                            XMS Ai combines 20+ years of marketing expertise with an enterprise-grade autonomous ecosystem. Diagnose, Architect, Deploy, and Optimize —
                            <span className="text-white font-medium"> instantly.</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                            {/* Blue button — opens audit modal */}
                            <Button
                                id="xmsOpenModal"
                                onClick={openAuditModal}
                                className="h-14 px-10 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95 group"
                            >
                                Get My Free Audit
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            {/* Explore button — goes to contact page */}
                            <a
                                href={XMS_CONTACT}
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
                            className="flex items-center justify-center md:justify-start gap-8 md:gap-12 mt-12 pt-8"
                        >
                            <img src={`${import.meta.env.BASE_URL}brand/meta-partner.png`} alt="Meta Partner" className="h-7 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                            <img src={`${import.meta.env.BASE_URL}brand/google-ads-partner.png`} alt="Google Ads Partner" className="h-6 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                            <img src={`${import.meta.env.BASE_URL}brand/google-certified.png`} alt="Google Certified" className="h-6 md:h-18 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
