import React from 'react';
import { X, Bookmark, ExternalLink, Trash2, ArrowRight } from 'lucide-react';
import { ToolItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedTools: ToolItem[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onOpenDetails: (tool: ToolItem) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedTools,
  onRemoveBookmark,
  onClearAll,
  onOpenDetails
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="bookmarks-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="bookmarks-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Saved Perks</h3>
              <p className="text-xs text-slate-500">{bookmarkedTools.length} tool{bookmarkedTools.length === 1 ? '' : 's'} bookmarked</p>
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

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
          {bookmarkedTools.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <Bookmark className="w-12 h-12 text-slate-200" />
              <div>
                <p className="font-semibold text-slate-700 text-sm">No saved tools yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Click the bookmark icon on any tool card to save free resources and student perks to your list.
                </p>
              </div>
            </div>
          ) : (
            bookmarkedTools.map((tool) => (
              <div 
                key={tool.id}
                id={`saved-item-${tool.id}`}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-xs transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 mt-0.5">
                    <BrandLogo
                      logoKey={tool.logoKey}
                      name={tool.name}
                      url={tool.url}
                      logoUrl={tool.logoUrl}
                      size="sm"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{tool.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">{tool.description}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenDetails(tool);
                        }}
                        className="text-[11px] font-semibold text-blue-600 hover:underline"
                      >
                        Details
                      </button>
                      <span className="text-slate-300">•</span>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-0.5"
                      >
                        Open <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveBookmark(tool.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedTools.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
            >
              Clear all bookmarks
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
