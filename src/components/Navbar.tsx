import React, { useState } from 'react';
import { Sparkles, Menu, X, PlusCircle, Bookmark, ExternalLink } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  onOpenSubmitModal: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  onResetSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSubmitModal,
  onOpenBookmarks,
  bookmarkCount,
  onResetSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; category: Category }[] = [
    { label: 'Home', category: 'All' },
    { label: 'AI Tools', category: 'AI & Coding' },
    { label: 'Developer', category: 'Developer' },
    { label: 'Hosting', category: 'Hosting' },
    { label: 'Cloud', category: 'Cloud' },
    { label: 'Student Perks', category: 'Student Perks' }
  ];

  const handleNavClick = (category: Category) => {
    onSelectCategory(category);
    onResetSearch();
    setMobileMenuOpen(false);
    
    // Smooth scroll to directory top if below hero
    const dirElement = document.getElementById('tools-directory-section');
    if (dirElement && category !== 'All') {
      dirElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              id="navbar-brand-logo"
              onClick={() => handleNavClick('All')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                  FreePerks
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-tight mt-0.5">
                  for students
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeCategory === item.category;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => handleNavClick(item.category)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 border border-blue-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Bookmarks Counter Button */}
            <button
              type="button"
              id="navbar-saved-perks-btn"
              onClick={onOpenBookmarks}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors"
              title="View saved tools"
            >
              <Bookmark className="w-4 h-4 text-slate-600" />
              <span className="hidden lg:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Submit a Tool button */}
            <button
              type="button"
              id="navbar-submit-tool-btn"
              onClick={onOpenSubmitModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit a Tool</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              id="navbar-mobile-saved-btn"
              onClick={onOpenBookmarks}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative"
              aria-label="View saved perks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              type="button"
              id="navbar-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeCategory === item.category;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.category)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              id="mobile-submit-tool-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmitModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit a Tool</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
