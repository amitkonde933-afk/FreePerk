import React from 'react';
import { 
  ExternalLink, 
  Bookmark, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { ToolItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface ToolCardProps {
  tool: ToolItem;
  onOpenDetails: (tool: ToolItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onOpenDetails,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <div 
      id={`tool-card-${tool.id}`}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-blue-300/80 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div>
        {/* Card Header: Real Brand Logo & Title */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-2xs">
              <BrandLogo 
                logoKey={tool.logoKey}
                name={tool.name}
                url={tool.url}
                logoUrl={tool.logoUrl}
                size="md"
                className="w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {tool.category}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            id={`bookmark-btn-${tool.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(tool.id);
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
            className={`p-2 rounded-lg transition-colors border ${
              isBookmarked 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'text-slate-400 hover:text-slate-700 bg-slate-50/80 hover:bg-slate-100 border-slate-200/60'
            }`}
            title={isBookmarked ? 'Saved to your perks' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 min-h-[2.75rem]">
          {tool.description}
        </p>

        {/* Badges & Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70">
            {tool.category}
          </span>
          {tool.badge && (
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>
              {tool.badge}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          id={`learn-more-btn-${tool.id}`}
          onClick={() => onOpenDetails(tool)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-2.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          Learn more
        </button>

        <a
          id={`cta-btn-${tool.id}`}
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg shadow-xs hover:shadow transition-all duration-150 group/btn"
        >
          <span>{tool.ctaText || 'Get access →'}</span>
          <ExternalLink className="w-3 h-3 opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

