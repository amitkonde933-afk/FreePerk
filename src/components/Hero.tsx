import React, { useRef, useEffect } from 'react';
import { Search, X, CheckCircle, Sparkles, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../data/tools';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  totalToolsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  totalToolsCount
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="hero-section" className="pt-10 pb-12 sm:pt-14 sm:pb-16 text-center max-w-4xl mx-auto px-4">
      {/* Mini top badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
        <span>Curated Directory For Student Builders</span>
      </div>

      {/* Large Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">
        Free tools & perks <br className="hidden sm:inline" />
        <span className="text-blue-600">for students.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
        Discover useful AI tools, coding software, hosting, cloud credits, and student-only perks — all in one place.
      </p>

      {/* Large Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="relative flex items-center">
          <div className="absolute left-4 sm:left-5 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
          </div>
          <input
            id="hero-search-input"
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search free tools, IDEs, hosting, or perks..."
            className="w-full pl-12 sm:pl-14 pr-24 sm:pr-28 py-4 sm:py-4.5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-hidden text-base sm:text-lg text-slate-900 placeholder:text-slate-400 font-medium transition-all"
          />
          <div className="absolute right-3 sm:right-4 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                id="search-clear-btn"
                onClick={() => onSearchChange('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
              /
            </kbd>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div id="category-filter-pills" className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-8">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              id={`filter-category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs scale-102'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Trust Indicator */}
      <div id="trust-indicator" className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium bg-slate-100/70 border border-slate-200/60 rounded-full px-5 py-2">
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          100% free resources
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          Student-friendly
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
          Updated regularly
        </span>
      </div>
    </section>
  );
};
