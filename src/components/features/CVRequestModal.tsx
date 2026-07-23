"use client";

import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

interface FormState {
    name: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    company: string;
    roleDetails: string;
    startDate: string;
    budget: string;
}

const EMPTY_FORM: FormState = {
    name: '', email: '', phone: '', linkedinUrl: '', company: '', roleDetails: '', startDate: '', budget: '',
};

const FIELDS: { key: keyof FormState; label: string; required: boolean; placeholder: string; textarea?: boolean }[] = [
    { key: 'name', label: 'Full Name', required: true, placeholder: 'Jane Doe' },
    { key: 'email', label: 'Email', required: true, placeholder: 'jane@company.com' },
    { key: 'phone', label: 'Phone', required: true, placeholder: '+1 555 123 4567' },
    { key: 'linkedinUrl', label: 'LinkedIn Profile URL', required: true, placeholder: 'https://linkedin.com/in/yourname' },
    { key: 'company', label: 'Company / Client Name', required: true, placeholder: 'Acme Inc.' },
    { key: 'roleDetails', label: 'Role / Opportunity Details', required: true, placeholder: 'Role, tech stack, or a link to the JD', textarea: true },
    { key: 'startDate', label: 'Start Date', required: true, placeholder: 'e.g. ASAP, Q1 2027' },
    { key: 'budget', label: 'Budget / Rate', required: true, placeholder: 'Specify currency and frequency' },
];

interface CVRequestModalContextValue {
    open: () => void;
}

const CVRequestModalContext = createContext<CVRequestModalContextValue | null>(null);

export function useCVRequestModal() {
    const ctx = useContext(CVRequestModalContext);
    if (!ctx) throw new Error('useCVRequestModal must be used within a CVRequestModalProvider');
    return ctx;
}

// Mounted at the layout root (see layout.tsx) so its `fixed` overlay isn't trapped inside
// a descendant's stacking context (e.g. Hero's `position: sticky` section) and always renders on top.
export function CVRequestModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (key: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleClose = () => {
        setIsOpen(false);
        setStatus('idle');
        setErrorMessage(null);
        setForm(EMPTY_FORM);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage(null);

        try {
            const response = await fetch('/api/request-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('done');
            } else {
                setStatus('error');
                setErrorMessage(data.error || "Something went wrong. Please email divya@thecuriousbunny.nl directly.");
            }
        } catch {
            setStatus('error');
            setErrorMessage("Something went wrong. Please email divya@thecuriousbunny.nl directly.");
        }
    };

    return (
        <CVRequestModalContext.Provider value={{ open: () => setIsOpen(true) }}>
            {children}

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                        {/* Header: fixed in place, never scrolls away — close is always reachable */}
                        <div className="flex items-center justify-between gap-4 p-6 pb-4 shrink-0 border-b border-white/5">
                            <h3 className="text-xl font-bold text-white">Let&apos;s Make This Official</h3>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar p-8 pt-6">
                            {status === 'done' ? (
                                <div className="text-center py-8">
                                    <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={48} />
                                    <h4 className="text-xl font-bold text-white mb-2">Consider It Sent!</h4>
                                    <p className="text-gray-400">
                                        Thanks {form.name.split(' ')[0] || 'there'} — I&apos;ve got your details and I&apos;ll personally
                                        send my CV to <span className="text-emerald-400">{form.email}</span> shortly.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Skip the anonymous download button — tell me a bit about the opportunity,
                                        and I&apos;ll personally send my CV straight to your inbox.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {FIELDS.map(field => (
                                            <div key={field.key}>
                                                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                                                    {field.label}{field.required && <span className="text-emerald-500"> *</span>}
                                                </label>
                                                {field.textarea ? (
                                                    <textarea
                                                        required={field.required}
                                                        value={form[field.key]}
                                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                                        placeholder={field.placeholder}
                                                        maxLength={3000}
                                                        className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-emerald-500/50 resize-none"
                                                    />
                                                ) : (
                                                    <input
                                                        type={field.key === 'email' ? 'email' : 'text'}
                                                        required={field.required}
                                                        value={form[field.key]}
                                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                                        placeholder={field.placeholder}
                                                        maxLength={300}
                                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500/50"
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        {status === 'error' && (
                                            <p className="text-sm text-red-400">{errorMessage}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className={cn(
                                                "w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                            )}
                                        >
                                            {status === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : null}
                                            {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </CVRequestModalContext.Provider>
    );
}
