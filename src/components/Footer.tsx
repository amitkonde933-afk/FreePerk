import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onOpenSubmitModal: () => void;
  onOpenAboutModal: (type: 'about' | 'privacy') => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSubmitModal,
  onOpenAboutModal,
  onScrollToTop
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200/90 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo & Description */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                FreePerks
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Free tools and perks for students.
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Discover free AI tools, developer software, hosting, cloud credits, and student perks — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-wrap gap-8 md:justify-end">
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={onScrollToTop}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory('All');
                      const el = document.getElementById('category-filter-pills');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenSubmitModal}
                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Submit a Tool
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Resources</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenAboutModal('about')}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenAboutModal('privacy')}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Privacy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Built to help students discover useful resources without the hassle.
          </p>
          <div className="flex items-center gap-1">
            <span>FreePerks Directory © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
