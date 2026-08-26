/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Terminal, 
  Bot, 
  Cpu, 
  Globe, 
  Cloud, 
  Bookmark, 
  Filter, 
  RotateCcw,
  ArrowRight,
  Layers,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Category, ToolItem } from './types';
import { INITIAL_TOOLS, GITHUB_PACK_DATA, CATEGORIES } from './data/tools';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolCard } from './components/ToolCard';
import { GitHubPackHighlight } from './components/GitHubPackHighlight';
import { ToolDetailModal } from './components/ToolDetailModal';
import { SubmitModal } from './components/SubmitModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';

export default function App() {
  const [tools, setTools] = useState<ToolItem[]>(() => {
    try {
      const custom = localStorage.getItem('freeperks_custom_tools');
      if (custom) {
        const parsed: ToolItem[] = JSON.parse(custom);
        return [...INITIAL_TOOLS, ...parsed];
      }
    } catch {
      // Ignore fallback
    }
    return INITIAL_TOOLS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedToolForDetails, setSelectedToolForDetails] = useState<ToolItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [aboutModalState, setAboutModalState] = useState<{ isOpen: boolean; type: 'about' | 'privacy' }>({
    isOpen: false,
    type: 'about'
  });

  // Local Storage Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('freeperks_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freeperks_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage errors
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  const handleAddTool = (newTool: ToolItem) => {
    setTools((prev) => {
      const updated = [newTool, ...prev];
      try {
        const existingCustom = JSON.parse(localStorage.getItem('freeperks_custom_tools') || '[]');
        localStorage.setItem('freeperks_custom_tools', JSON.stringify([newTool, ...existingCustom]));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  const bookmarkedToolsList = useMemo(() => {
    return tools.filter((tool) => bookmarkedIds.includes(tool.id));
  }, [tools, bookmarkedIds]);

  // Filtering Logic
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      // Category match
      let categoryMatch = false;
      if (selectedCategory === 'All') {
        categoryMatch = true;
      } else if (selectedCategory === 'AI & Coding') {
        categoryMatch = tool.category === 'AI & Coding';
      } else if (selectedCategory === 'Developer') {
        categoryMatch = tool.category === 'Developer';
      } else if (selectedCategory === 'Hosting') {
        categoryMatch = tool.category === 'Hosting' || tool.category === 'Domains';
      } else if (selectedCategory === 'Cloud') {
        categoryMatch = tool.category === 'Cloud';
      } else if (selectedCategory === 'Student Perks') {
        categoryMatch = Boolean(tool.badge?.toLowerCase().includes('student') || tool.category === 'Student Perks');
      }

      if (!categoryMatch) return false;

      // Text search match
      if (!q) return true;

      const nameMatch = tool.name.toLowerCase().includes(q);
      const descMatch = tool.description.toLowerCase().includes(q);
      const categoryTextMatch = tool.category.toLowerCase().includes(q);
      const badgeMatch = tool.badge ? tool.badge.toLowerCase().includes(q) : false;
      const tagMatch = tool.tags.some((t) => t.toLowerCase().includes(q));

      return nameMatch || descMatch || categoryTextMatch || badgeMatch || tagMatch;
    });
  }, [tools, searchQuery, selectedCategory]);

  const isFilteringActive = searchQuery.trim().length > 0 || selectedCategory !== 'All';

  // Section groupings for Default Homepage Flow
  const featuredTools = useMemo(() => {
    return tools.filter((t) => t.section === 'featured');
  }, [tools]);

  const agenticTools = useMemo(() => {
    return tools.filter((t) => t.section === 'agentic_ide');
  }, [tools]);

  const hostingTools = useMemo(() => {
    return tools.filter((t) => t.section === 'hosting_domains');
  }, [tools]);

  const cloudTools = useMemo(() => {
    return tools.filter((t) => t.section === 'cloud_credits');
  }, [tools]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarkedIds.length}
        onResetSearch={() => setSearchQuery('')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalToolsCount={tools.length}
        />

        <div id="tools-directory-section" className="pt-4 scroll-mt-24">
          {isFilteringActive ? (
            /* ========================================================================= */
            /* FILTERED SEARCH RESULTS VIEW                                              */
            /* ========================================================================= */
            <div id="search-results-container" className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedCategory === 'All' ? 'Search Results' : selectedCategory}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Found {filteredTools.length} tool{filteredTools.length === 1 ? '' : 's'}
                    {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
                    {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
                  </p>
                </div>

                <button
                  type="button"
                  id="reset-filter-btn"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 transition-colors self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              </div>

              {filteredTools.length === 0 ? (
                /* Empty State */
                <div id="empty-search-state" className="py-16 sm:py-20 text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">No tools found</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Try another search or category.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-xs hover:bg-blue-700 transition-all"
                    >
                      Clear search & filters
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                    >
                      Submit a tool
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onOpenDetails={setSelectedToolForDetails}
                      isBookmarked={bookmarkedIds.includes(tool.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ========================================================================= */
            /* STRUCTURED HOMEPAGE SECTIONS FLOW                                        */
            /* ========================================================================= */
            <div className="space-y-16 sm:space-y-20">
              
              {/* 3. Featured Section */}
              <section id="featured-perks-section" className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Featured student perks
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    Start with some of the most useful resources for students and developers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onOpenDetails={setSelectedToolForDetails}
                      isBookmarked={bookmarkedIds.includes(tool.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* 4. Agentic IDEs Section */}
              <section id="agentic-ides-section" className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    AI-powered development environments
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    Autonomous IDEs that write code, plan specifications, and test applications live in the browser.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agenticTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onOpenDetails={setSelectedToolForDetails}
                      isBookmarked={bookmarkedIds.includes(tool.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* 7. Highlight GitHub Student Developer Pack */}
              <GitHubPackHighlight />

              {/* 5. Hosting & Domains Section */}
              <section id="hosting-domains-section" className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Launch your project for free
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    Generous free tiers, student hosting discounts, and domain registrars for shipping apps.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hostingTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onOpenDetails={setSelectedToolForDetails}
                      isBookmarked={bookmarkedIds.includes(tool.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>

              {/* 6. Cloud Credits Section */}
              <section id="cloud-credits-section" className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    Free cloud credits for startups
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    Promotional credits and cloud infrastructure for student builders and early-stage projects.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cloudTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onOpenDetails={setSelectedToolForDetails}
                      isBookmarked={bookmarkedIds.includes(tool.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              </section>

            </div>
          )}
        </div>
      </main>

      {/* Modals & Drawers */}
      <ToolDetailModal
        tool={selectedToolForDetails}
        onClose={() => setSelectedToolForDetails(null)}
        isBookmarked={selectedToolForDetails ? bookmarkedIds.includes(selectedToolForDetails.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onAddTool={handleAddTool}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedTools={bookmarkedToolsList}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearAllBookmarks}
        onOpenDetails={(t) => {
          setIsBookmarksOpen(false);
          setSelectedToolForDetails(t);
        }}
      />

      <AboutModal
        isOpen={aboutModalState.isOpen}
        onClose={() => setAboutModalState({ ...aboutModalState, isOpen: false })}
        type={aboutModalState.type}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenAboutModal={(type) => setAboutModalState({ isOpen: true, type })}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
}
