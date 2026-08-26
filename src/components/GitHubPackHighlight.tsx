import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ExternalLink, Gift, ShieldCheck } from 'lucide-react';
import { GITHUB_PACK_DATA } from '../data/tools';
import { BrandLogo } from './BrandLogo';

interface GitHubPackHighlightProps {
  onLearnMore?: () => void;
}

export const GitHubPackHighlight: React.FC<GitHubPackHighlightProps> = ({ onLearnMore }) => {
  return (
    <section id="student-pack-section" className="my-16">
      <div 
        id="github-pack-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-10 md:p-12 border border-slate-700/80 shadow-xl"
      >
        {/* Subtle background glow effect */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <span>{GITHUB_PACK_DATA.badge}</span>
              <span className="text-white/40">|</span>
              <span className="text-amber-200">The Ultimate Student Bundle</span>
            </div>

            {/* Title & Headline */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center shrink-0">
                <BrandLogo logoKey="github" name="GitHub" size="md" className="w-full h-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {GITHUB_PACK_DATA.name}
              </h2>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-blue-300 mb-4">
              {GITHUB_PACK_DATA.headline}
            </p>

            {/* Description */}
            <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-2xl">
              {GITHUB_PACK_DATA.description}
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                id="github-pack-cta-btn"
                href={GITHUB_PACK_DATA.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>{GITHUB_PACK_DATA.ctaText}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3.5 py-2 rounded-lg border border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Requires active student email (.edu) or student ID</span>
              </div>
            </div>
          </div>

          {/* Included Perks Bullet Points Card */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
              <Gift className="w-4 h-4 text-blue-400" />
              <span>What's inside the pack</span>
            </div>
            
            <ul className="space-y-3.5">
              {GITHUB_PACK_DATA.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Estimated value: $200k+ in perks</span>
              <span className="text-emerald-400 font-semibold">100% Free for students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
