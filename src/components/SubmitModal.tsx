import React, { useState, useEffect } from 'react';
import { X, PlusCircle, CheckCircle2, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../data/tools';
import { ToolItem } from '../types';
import { BrandLogo, resolveLogoKeyFromInfo } from './BrandLogo';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (newTool: ToolItem) => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, onAddTool }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [category, setCategory] = useState<ToolItem['category']>('AI & Coding');
  const [badge, setBadge] = useState('Student');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim() || !description.trim()) {
      setError('Please fill in the tool name, URL, and a brief description.');
      return;
    }

    // Format URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const detectedLogoKey = resolveLogoKeyFromInfo(name.trim(), formattedUrl);

    const newTool: ToolItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      url: formattedUrl,
      category,
      badge: badge.trim() || 'Student',
      description: description.trim(),
      requirements: requirements.trim() || 'Student email or free registration',
      ctaText: 'Get access →',
      section: 'featured',
      tags: [category, 'Community Submission', badge],
      iconName: 'Sparkles',
      logoKey: detectedLogoKey !== 'generic' ? detectedLogoKey : undefined,
      logoUrl: logoUrl.trim() || undefined,
      colorTheme: 'blue',
      valueDescription: 'User-submitted student resource.'
    };

    onAddTool(newTool);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setUrl('');
      setLogoUrl('');
      setDescription('');
      setRequirements('');
      setError('');
      onClose();
    }, 1800);
  };

  return (
    <div 
      id="submit-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="submit-modal-card"
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Submit a Student Tool or Perk</h3>
              <p className="text-xs text-slate-500">Know a free tool that helps students? Share it!</p>
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

        {/* Content */}
        {submitted ? (
          <div className="p-10 text-center space-y-3 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Tool added successfully!</h4>
            <p className="text-sm text-slate-600">
              Thank you for contributing to the student community. It's now visible in your directory!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Live Logo Preview Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-2xs">
                <BrandLogo
                  name={name || 'Your Tool'}
                  url={url}
                  logoUrl={logoUrl}
                  size="sm"
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {name || 'Live Brand Logo Preview'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {url || 'Type name or URL to automatically match brand logo'}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="submit-tool-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tool Name *
              </label>
              <input
                id="submit-tool-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Notion for Education, JetBrains Student, Supabase"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium"
              />
            </div>

            <div>
              <label htmlFor="submit-tool-url" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Website or Perk URL *
              </label>
              <input
                id="submit-tool-url"
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/students"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium"
              />
            </div>

            <div>
              <label htmlFor="submit-tool-logo" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Custom Logo URL (Optional)
              </label>
              <input
                id="submit-tool-logo"
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.svg (optional)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="submit-tool-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  id="submit-tool-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ToolItem['category'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium"
                >
                  {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Domains">Domains</option>
                </select>
              </div>

              <div>
                <label htmlFor="submit-tool-badge" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Badge / Offer Type
                </label>
                <input
                  id="submit-tool-badge"
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Free Tier, Student, $100 credits"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="submit-tool-desc" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Description (1-2 sentences) *
              </label>
              <textarea
                id="submit-tool-desc"
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does the tool do and why is it beneficial for students?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium resize-none"
              />
            </div>

            <div>
              <label htmlFor="submit-tool-req" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Requirements (Optional)
              </label>
              <input
                id="submit-tool-req"
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="e.g., .edu email, GitHub Student Pack, SheerID"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-hidden font-medium"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                id="submit-form-save-btn"
                type="submit"
                className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all"
              >
                Add to Directory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
