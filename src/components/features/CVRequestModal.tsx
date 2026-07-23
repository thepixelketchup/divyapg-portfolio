"use client";

import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { useState } from 'react';

interface CVRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

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
    { key: 'startDate', label: 'Start Date', required: false, placeholder: 'e.g. ASAP, Q1 2027' },
    { key: 'budget', label: 'Budget / Rate', required: false, placeholder: 'Specify currency and frequency' },
];

export const CVRequestModal = ({ isOpen, onClose }: CVRequestModalProps) => {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleChange = (key: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleClose = () => {
        onClose();
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    {status === 'done' ? (
                        <div className="text-center py-8">
                            <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={48} />
                            <h3 className="text-xl font-bold text-white mb-2">Request received!</h3>
                            <p className="text-gray-400">
                                Thanks {form.name.split(' ')[0] || 'there'} — I&apos;ll personally verify your details and follow up at{' '}
                                <span className="text-emerald-400">{form.email}</span> with my CV shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-white mb-2">Request my CV</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                To keep my CV out of scraper inboxes, I ask for a few details first. I personally
                                review every request and send the CV directly once verified — no automatic download.
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
    );
};
