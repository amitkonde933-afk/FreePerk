import React from 'react';
import { X, GraduationCap, CheckCircle2, Mail, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'about' | 'privacy';
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, type = 'about' }) => {
  if (!isOpen) return null;

  return (
    <div 
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="about-modal-dialog"
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden text-slate-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              {type === 'about' ? <GraduationCap className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {type === 'about' ? 'About FreePerks & Student Verification' : 'Privacy Policy & Terms'}
              </h3>
              <p className="text-xs text-slate-500">
                {type === 'about' ? 'A curated hub for student builders & developers' : 'Simple, transparent, zero-tracking'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto text-sm text-slate-600 leading-relaxed">
          {type === 'about' ? (
            <>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Our Mission</h4>
                <p>
                  FreePerks is built to help students discover and claim free tools, developer software, hosting tiers, AI assistants, and cloud credits in one clean, searchable place without navigating hundreds of bloated landing pages.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>How to verify student status</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Academic Email:</strong> Use your official school email ending in <code>.edu</code>, <code>.ac.uk</code>, or university domain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>GitHub Student Pack:</strong> Once approved for GitHub Education, you automatically unlock dozens of developer perks with 1 click.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SheerID / UNiDAYS:</strong> Upload your current student ID card or class schedule if your institution does not provide .edu emails.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Adding 50-100+ More Perks</h4>
                <p>
                  FreePerks is designed with a lightweight, modular data architecture. If you'd like to suggest an awesome developer tool, API credit, or student discount, click "Submit a Tool" or contribute directly.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">No Tracking, No Nonsense</h4>
                <p>
                  FreePerks does not track personal data, sell student info, or place intrusive advertising. All bookmarks and local submissions are stored securely in your own browser's localStorage.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Direct Official Links</h4>
                <p>
                  All "Get access" and "Learn more" links direct straight to the verified official software provider or student portal.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
