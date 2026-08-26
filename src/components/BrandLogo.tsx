import React, { useState } from 'react';

interface BrandLogoProps {
  logoKey?: string;
  name?: string;
  url?: string;
  logoUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  logoKey,
  name = '',
  url = '',
  logoUrl,
  size = 'md',
  className = '',
  variant = 'auto',
}) => {
  const [imgError, setImgError] = useState(false);

  // Size mapping
  const sizeMap = {
    xs: 'w-4 h-4 text-xs',
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
    xl: 'w-12 h-12 text-xl',
  };

  const containerSize = sizeMap[size] || sizeMap.md;

  // Resolve logo key if not explicitly given
  const resolvedKey = (logoKey || resolveLogoKeyFromInfo(name, url)).toLowerCase();

  // If a custom image URL was provided and hasn't failed, render it
  if (logoUrl && !imgError) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${containerSize} ${className}`}>
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-full h-full object-contain rounded-md"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Render SVG Vector Logos
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${containerSize} ${className}`}>
      {renderVectorLogo(resolvedKey, name, variant)}
    </div>
  );
};

// Helper to determine the best logo key based on tool name or URL
export function resolveLogoKeyFromInfo(name: string, url: string): string {
  const n = name.toLowerCase();
  const u = url.toLowerCase();

  if (n.includes('copilot') || u.includes('copilot')) return 'github-copilot';
  if (n.includes('github') || u.includes('github.com')) return 'github';
  if (n.includes('gemini') || u.includes('gemini.google')) return 'gemini';
  if (n.includes('antigravity') || n.includes('ai studio') || u.includes('ai.studio')) return 'google';
  if (n.includes('google cloud') || (u.includes('cloud.google') && !u.includes('gemini'))) return 'google-cloud';
  if (n.includes('google') || u.includes('google.com')) return 'google';
  if (n.includes('kiro') || (u.includes('kiro.dev'))) return 'aws';
  if (n.includes('aws') || u.includes('aws.amazon.com') || u.includes('amazon.com')) return 'aws';
  if (n.includes('vercel') || u.includes('vercel.com')) return 'vercel';
  if (n.includes('hostinger') || u.includes('hostinger.com')) return 'hostinger';
  if (n.includes('namecheap') || u.includes('namecheap.com')) return 'namecheap';
  if (n.includes('microsoft') || n.includes('azure') || u.includes('microsoft.com') || u.includes('azure.com')) return 'microsoft';
  if (n.includes('jetbrains') || u.includes('jetbrains.com')) return 'jetbrains';
  if (n.includes('figma') || u.includes('figma.com')) return 'figma';
  if (n.includes('notion') || u.includes('notion.so')) return 'notion';
  if (n.includes('canva') || u.includes('canva.com')) return 'canva';
  if (n.includes('supabase') || u.includes('supabase.com')) return 'supabase';
  if (n.includes('digitalocean') || u.includes('digitalocean.com')) return 'digitalocean';
  if (n.includes('cloudflare') || u.includes('cloudflare.com')) return 'cloudflare';
  if (n.includes('postman') || u.includes('postman.com')) return 'postman';
  if (n.includes('replit') || u.includes('replit.com')) return 'replit';
  if (n.includes('mongodb') || u.includes('mongodb.com')) return 'mongodb';
  if (n.includes('opencode') || u.includes('opencode.ai')) return 'opencode';
  if (n.includes('cursor') || u.includes('cursor.com')) return 'cursor';
  if (n.includes('datadog') || u.includes('datadoghq.com')) return 'datadog';
  if (n.includes('sentry') || u.includes('sentry.io')) return 'sentry';

  return 'generic';
}

function renderVectorLogo(key: string, name: string, variant: string = 'auto') {
  switch (key) {
    case 'github-copilot':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#181717" />
          <path
            d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12c0 3.32 2.15 6.13 5.14 7.12.38.07.51-.16.51-.36 0-.18-.01-.78-.01-1.42-2.09.45-2.53-.88-2.53-.88-.34-.87-.83-1.1-.83-1.1-.68-.46.05-.45.05-.45.75.05 1.15.77 1.15.77.67 1.15 1.76.82 2.19.63.07-.49.26-.82.48-1.01-1.67-.19-3.42-.83-3.42-3.72 0-.82.29-1.49.77-2.02-.08-.19-.33-.95.07-1.99 0 0 .63-.2 2.07.77.6-.17 1.25-.25 1.89-.25.64 0 1.29.08 1.89.25 1.44-.97 2.07-.77 2.07-.77.4 1.04.15 1.8.07 1.99.48.53.77 1.2.77 2.02 0 2.9-1.76 3.53-3.44 3.71.27.24.52.7.52 1.41 0 1.02-.01 1.84-.01 2.09 0 .2.14.44.52.36 2.98-.99 5.13-3.8 5.13-7.12 0-4.14-3.36-7.5-7.5-7.5z"
            fill="#FFFFFF"
          />
          <circle cx="17.5" cy="6.5" r="3" fill="#8957E5" />
          <path d="M16.5 5.5L18.5 7.5M18.5 5.5L16.5 7.5" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#181717" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.5C7.3 3.5 3.5 7.3 3.5 12C3.5 15.76 5.94 18.95 9.32 20.08C9.75 20.16 9.9 19.89 9.9 19.67C9.9 19.47 9.89 18.79 9.89 18.06C7.52 18.58 7.02 17.07 7.02 17.07C6.63 16.08 6.08 15.82 6.08 15.82C5.31 15.29 6.14 15.3 6.14 15.3C6.99 15.36 7.44 16.18 7.44 16.18C8.2 17.48 9.43 17.11 9.92 16.89C9.99 16.34 10.22 15.96 10.46 15.74C8.57 15.53 6.58 14.8 6.58 11.52C6.58 10.59 6.91 9.82 7.46 9.22C7.37 9.01 7.08 8.14 7.54 6.96C7.54 6.96 8.26 6.73 9.89 7.83C10.57 7.64 11.3 7.55 12.02 7.54C12.75 7.55 13.48 7.64 14.16 7.83C15.79 6.73 16.51 6.96 16.51 6.96C16.97 8.14 16.68 9.01 16.59 9.22C17.14 9.82 17.47 10.59 17.47 11.52C17.47 14.81 15.47 15.52 13.58 15.73C13.88 16 14.16 16.52 14.16 17.32C14.16 18.47 14.15 19.4 14.15 19.67C14.15 19.89 14.3 20.17 14.73 20.08C18.11 18.95 20.55 15.76 20.55 12C20.55 7.3 16.7 3.5 12 3.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E3" />
              <stop offset="0.35" stopColor="#5B73E8" />
              <stop offset="0.7" stopColor="#9C52E5" />
              <stop offset="1" stopColor="#E94F8A" />
            </linearGradient>
            <linearGradient id="gemini-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EEF4FF" />
              <stop offset="1" stopColor="#F5F3FF" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#gemini-bg)" stroke="#E0E7FF" strokeWidth="0.8" />
          <path
            d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
            fill="url(#gemini-grad)"
          />
        </svg>
      );

    case 'google':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <path
            d="M19.6 12.23c0-.68-.06-1.34-.17-1.96H12v3.71h4.26a3.64 3.64 0 0 1-1.58 2.39v1.98h2.56c1.5-1.38 2.36-3.41 2.36-6.12z"
            fill="#4285F4"
          />
          <path
            d="M12 20c2.16 0 3.97-.72 5.3-1.94l-2.56-1.99c-.72.48-1.64.76-2.74.76-2.11 0-3.9-1.42-4.54-3.34H4.8v2.05A7.99 7.99 0 0 0 12 20z"
            fill="#34A853"
          />
          <path
            d="M7.46 13.49a4.8 4.8 0 0 1 0-2.98V8.46H4.8a8.01 8.01 0 0 0 0 7.08l2.66-2.05z"
            fill="#FBBC05"
          />
          <path
            d="M12 7.17c1.17 0 2.23.4 3.06 1.19l2.3-2.3C15.97 4.77 14.16 4 12 4a7.99 7.99 0 0 0-7.2 4.46l2.66 2.05c.64-1.92 2.43-3.34 4.54-3.34z"
            fill="#EA4335"
          />
        </svg>
      );

    case 'google-cloud':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <path
            d="M15.4 7.6a5.2 5.2 0 0 0-4.8 3.1A4.4 4.4 0 0 0 6.5 15a4.4 4.4 0 0 0 4.4 4.4h8.3a3.8 3.8 0 0 0 3.8-3.8 3.8 3.8 0 0 0-3.8-3.8c-.1 0-.2 0-.3.02A5.2 5.2 0 0 0 15.4 7.6z"
            fill="#4285F4"
          />
          <path
            d="M10.9 19.4H6.5a4.4 4.4 0 0 1-4.4-4.4c0-2.2 1.6-4 3.7-4.3a5.2 5.2 0 0 1 4.8-3.1c.3 0 .7 0 1 .1L10.9 19.4z"
            fill="#34A853"
            opacity="0.9"
          />
          <path
            d="M15.4 7.6c1.7 0 3.2.8 4.1 2.1l-4.1 9.7h-4.5l4.5-11.8z"
            fill="#FBBC05"
            opacity="0.85"
          />
          <path
            d="M19.2 11.8c2.1 0 3.8 1.7 3.8 3.8a3.8 3.8 0 0 1-3.8 3.8h-4.3l4.3-7.6z"
            fill="#EA4335"
            opacity="0.9"
          />
        </svg>
      );

    case 'aws':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#232F3E" />
          <path
            d="M6.3 11.2c-.3 0-.5.1-.6.4l-.8 2.2h-.9l1.8-4.6h1l1.8 4.6h-.9l-.8-2.2zm-.1-.7l-.5-1.5-.5 1.5h1zm3.8 2.9l-1.3-4.6h.9l.8 3.3.8-3.3h.8l.8 3.3.8-3.3h.9l-1.3 4.6h-.9l-.8-3.1-.8 3.1h-.9zm6.2-.3c-.4.3-.9.4-1.4.4-.7 0-1.2-.2-1.6-.6-.4-.4-.6-.9-.6-1.5 0-.7.2-1.2.6-1.6.4-.4 1-.6 1.7-.6.5 0 .9.1 1.3.3v.8c-.4-.3-.8-.4-1.2-.4-.5 0-.8.1-1.1.4-.3.3-.4.6-.4 1.1s.1.8.4 1.1c.3.3.7.4 1.2.4.4 0 .8-.1 1.1-.3v.9z"
            fill="#FFFFFF"
          />
          <path
            d="M5.5 16.5c3.2 1.8 7.3 1.8 10.5.1.4-.2.8.2.5.5-3.5 2-8 2-11.5-.1-.3-.2 0-.7.5-.5z"
            fill="#FF9900"
          />
          <path
            d="M16.5 15.6c.3.4.9.4 1.2.1.3-.3.3-.9 0-1.2l-.7-.4.2.9.3.6z"
            fill="#FF9900"
          />
        </svg>
      );

    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path d="M12 5L20 19H4L12 5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'hostinger':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#673DE6" />
          <path
            d="M7 6.5h3.2v4.2h3.6V6.5H17v11h-3.2v-4.3h-3.6v4.3H7V6.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'namecheap':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#DE3723" />
          <path
            d="M6 7.5L9.5 13L13 7.5h2.5L11 14.5l4.5 7h-2.5L9.5 16 6 21.5H3.5l4.5-7L3.5 7.5H6z"
            fill="#FFFFFF"
          />
          <circle cx="17.5" cy="14.5" r="2.5" fill="#FF8100" />
        </svg>
      );

    case 'microsoft':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <rect x="5" y="5" width="6.5" height="6.5" fill="#F25022" rx="0.5" />
          <rect x="12.5" y="5" width="6.5" height="6.5" fill="#7FBA00" rx="0.5" />
          <rect x="5" y="12.5" width="6.5" height="6.5" fill="#00A4EF" rx="0.5" />
          <rect x="12.5" y="12.5" width="6.5" height="6.5" fill="#FFB900" rx="0.5" />
        </svg>
      );

    case 'jetbrains':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jb-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F43E63" />
              <stop offset="0.5" stopColor="#8732E0" />
              <stop offset="1" stopColor="#21D789" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="#080808" />
          <path d="M4 20h16v2H4z" fill="url(#jb-grad)" />
          <path
            d="M6 7.5h2v6c0 1.2-.7 2-2 2H5v-1.5h1c.4 0 .7-.2.7-.7v-5.8zm5.5 0h4v1.5h-2.5v1.8h2.3v1.4h-2.3v1.8h2.6v1.5h-4.1V7.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'figma':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1E1E1E" />
          <path d="M8.5 6.5C8.5 5.12 9.62 4 11 4h2.5v5H11c-1.38 0-2.5-1.12-2.5-2.5z" fill="#F24E1E" />
          <path d="M13.5 4H16c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5h-2.5V4z" fill="#FF7262" />
          <path d="M13.5 9H16c1.38 0 2.5 1.12 2.5 2.5S17.38 14 16 14h-2.5V9z" fill="#1ABCFE" />
          <path d="M8.5 11.5C8.5 10.12 9.62 9 11 9h2.5v5H11c-1.38 0-2.5-1.12-2.5-2.5z" fill="#A259FF" />
          <path d="M8.5 16.5C8.5 15.12 9.62 14 11 14h2.5v2.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5z" fill="#0ACF83" />
        </svg>
      );

    case 'notion':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <path
            d="M5.5 5.5v13h2.6l6.4-8.8v8.8h3v-13h-2.6l-6.4 8.8V5.5H5.5z"
            fill="#000000"
          />
        </svg>
      );

    case 'canva':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canva-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="0.5" stopColor="#7D2AE8" />
              <stop offset="1" stopColor="#FF4F99" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#canva-grad)" />
          <path
            d="M15.5 9.5c-1-1.3-2.6-1.8-4.2-1.4-2 .5-3.3 2.3-3.3 4.4 0 2.4 1.7 4 4 4 1.5 0 2.9-.8 3.6-2l-1.6-.9c-.4.7-1.2 1.1-2 1.1-1.3 0-2.3-.9-2.3-2.2 0-1.3.8-2.3 2-2.6.9-.2 1.9.1 2.4.8l1.4-1.2z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1C1C1C" />
          <path
            d="M13.2 20.8c-.8.9-2.2.3-2.2-.9V13H5.2c-1.1 0-1.7-1.3-1-2.1L12.8 3.2c.8-.9 2.2-.3 2.2.9V11h5.8c1.1 0 1.7 1.3 1 2.1l-8.6 7.7z"
            fill="#3ECF8E"
          />
        </svg>
      );

    case 'digitalocean':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0080FF" />
          <path
            d="M12 4.5v3.4c4.1 0 7.5 3.4 7.5 7.5s-3.4 7.5-7.5 7.5c-4.1 0-7.5-3.4-7.5-7.5h3.4c0 2.3 1.8 4.1 4.1 4.1s4.1-1.8 4.1-4.1S14.3 11.3 12 11.3v-3.4C16 7.9 19.1 11 19.1 15s-3.1 7.1-7.1 7.1-7.1-3.1-7.1-7.1H2c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 4.5 12 4.5z"
            fill="#FFFFFF"
          />
          <rect x="5.5" y="15.5" width="2" height="2" fill="#FFFFFF" />
          <rect x="3.5" y="17.5" width="2" height="2" fill="#FFFFFF" />
        </svg>
      );

    case 'cloudflare':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#F38020" />
          <path
            d="M17.8 11.2c-.4-2.1-2.2-3.7-4.4-3.7-1.8 0-3.3 1-4 2.5-.3-.1-.7-.2-1.1-.2-1.8 0-3.3 1.5-3.3 3.3 0 .3 0 .5.1.8C3.8 14.1 3 15.1 3 16.3c0 1.5 1.2 2.7 2.7 2.7h12.5c1.7 0 3-1.3 3-3 0-1.4-.9-2.5-2.2-2.9-.1-.9-.5-1.6-1.2-1.9z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#001E2B" />
          <path
            d="M12 3.5s-4.5 4.5-4.5 9.5c0 3.3 2.2 6.5 4.5 7.5 2.3-1 4.5-4.2 4.5-7.5 0-5-4.5-9.5-4.5-9.5z"
            fill="#00ED64"
          />
          <path
            d="M12 3.5v17c.2 0 .4-.1.6-.2 2-1 3.9-4 3.9-6.8 0-4.5-3.8-8.7-4.5-10z"
            fill="#00684A"
          />
        </svg>
      );

    case 'postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FF6C37" />
          <circle cx="12" cy="9.5" r="3" fill="#FFFFFF" />
          <path
            d="M15.5 14.5l2.5 3h-2l-2-2.5-1 1V19H11v-4.5h1.5l2 2.5 1-2.5h1.5l-1.5 2.5z"
            fill="#FFFFFF"
          />
          <path d="M7 13.5l3.5 2-1 1-3.5-1.5z" fill="#FFFFFF" />
        </svg>
      );

    case 'replit':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#F26207" />
          <path
            d="M6 7.5h5v3.5H6zM13 11h5v3.5h-5zM6 14.5h5V18H6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'opencode':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="opencode-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="#0F172A" />
          <rect x="2" y="2" width="20" height="20" rx="4" stroke="url(#opencode-grad)" strokeWidth="1" />
          <path
            d="M7 8.5L11 12L7 15.5M12.5 16H17"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'cursor':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#18181B" />
          <path
            d="M7 6.5l10 5.5-5 1.5-2.5 4.5L7 6.5z"
            fill="#A855F7"
          />
        </svg>
      );

    case 'datadog':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#632CA6" />
          <circle cx="12" cy="11" r="5" fill="#FFFFFF" />
          <circle cx="10.5" cy="10" r="0.9" fill="#632CA6" />
          <circle cx="13.5" cy="10" r="0.9" fill="#632CA6" />
          <path d="M11 12.5h2l-1 1-1-1z" fill="#632CA6" />
        </svg>
      );

    case 'sentry':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#362D59" />
          <path
            d="M17.8 15.8c-1.4 1.8-3.6 2.7-5.8 2.7-4.1 0-7.5-3.4-7.5-7.5 0-3.3 2.1-6.1 5.2-7.1l.6 1.7C7.6 6.4 6 8.5 6 11c0 3.3 2.7 6 6 6 1.8 0 3.5-.8 4.6-2.1l1.2.9z"
            fill="#FFFFFF"
          />
          <circle cx="17.5" cy="8.5" r="2" fill="#E1567C" />
        </svg>
      );

    default:
      // Graceful fallback with tool initials
      const initials = name
        ? name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'FP';

      return (
        <div className="w-full h-full rounded-md bg-blue-600 text-white font-bold flex items-center justify-center tracking-tight select-none">
          {initials}
        </div>
      );
  }
}
