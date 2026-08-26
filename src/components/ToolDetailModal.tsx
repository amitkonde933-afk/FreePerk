import React, { useEffect } from 'react';
import { X, ExternalLink, Bookmark, CheckCircle2, Sparkles } from 'lucide-react';
import { ToolItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!tool) return null;

  return (
    <div 
      id="tool-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id={`tool-detail-dialog-${tool.id}`}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 p-2 flex items-center justify-center shadow-xs">
              <BrandLogo
                logoKey={tool.logoKey}
                name={tool.name}
                url={tool.url}
                logoUrl={tool.logoUrl}
                size="lg"
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
                {tool.badge && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-700">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Category: <span className="text-slate-700 font-semibold">{tool.category}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="modal-bookmark-toggle-btn"
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-2 rounded-xl transition-colors border ${
                isBookmarked 
                  ? 'bg-blue-50 text-blue-600 border-blue-200' 
                  : 'text-slate-400 hover:text-slate-700 bg-white border-slate-200'
              }`}
              title={isBookmarked ? 'Saved to bookmarks' : 'Save tool'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">About this resource</h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {tool.description}
            </p>
          </div>

          {tool.valueDescription && (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-sm text-blue-900 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-0.5">Benefit details</p>
                <p className="text-blue-800 text-xs sm:text-sm">{tool.valueDescription}</p>
              </div>
            </div>
          )}

          {tool.requirements && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Eligibility & Verification</h4>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tool.requirements}</span>
              </div>
            </div>
          )}

          {tool.howToClaim && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">How to claim</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tool.howToClaim}
              </p>
            </div>
          )}

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200/70 transition-colors"
          >
            Close
          </button>
          
          <a
            id={`modal-cta-link-${tool.id}`}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-all"
          >
            <span>{tool.ctaText || 'Get access →'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
