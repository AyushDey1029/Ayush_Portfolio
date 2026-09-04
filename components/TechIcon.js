'use client';
import React from 'react';

/**
 * TechIcon Component
 * Provides clean, lightweight, official SVG vector icons for tech stack tags
 * with subtle brand-color hover transitions.
 */
export default function TechIcon({ name = '', size = 14, className = '' }) {
  const norm = name.trim().toLowerCase();

  // Normalize aliases
  const getIconData = () => {
    if (norm === 'python') {
      return {
        brand: '#387eb8',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 6 4.5 6 4.5V7h6v1H4.5S2 8.5 2 13.5c0 5 2.5 5 2.5 5H6v-2.5C6 13.5 8 13 8 13h4s2.5 0 2.5-2.5V4.5S15 2 12 2z" />
            <circle cx="8" cy="5" r="0.75" fill="currentColor" />
            <path d="M12 22c5.52 0 6-2.5 6-2.5V17h-6v-1h7.5s2.5-.5 2.5-5.5c0-5-2.5-5-2.5-5H18v2.5c0 2.5-2 3-2 3h-4s-2.5 0-2.5 2.5v6S9 22 12 22z" />
            <circle cx="16" cy="19" r="0.75" fill="currentColor" />
          </svg>
        )
      };
    }

    if (norm === 'react') {
      return {
        brand: '#61dafb',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        )
      };
    }

    if (norm === 'node.js' || norm === 'node') {
      return {
        brand: '#68a063',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" />
            <path d="M12 7.5v9M8 9.5l4 2.5 4-2.5" />
          </svg>
        )
      };
    }

    if (norm === 'express.js' || norm === 'express') {
      return {
        brand: '#ffffff',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7h6l-3 10h6" />
            <path d="M13 10l3.5 3.5L13 17" />
            <path d="M20 10l-3.5 3.5L20 17" />
          </svg>
        )
      };
    }

    if (norm === 'pytorch') {
      return {
        brand: '#ee4c2c',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 3l-1.5 3.5a5 5 0 106.5 6.5L21 11" />
            <circle cx="15.5" cy="5.5" r="1" fill="currentColor" />
          </svg>
        )
      };
    }

    if (norm === 'mongodb') {
      return {
        brand: '#13aa52',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2s-6 5.5-6 11.5c0 4.5 3.5 7.5 6 8.5 2.5-1 6-4 6-8.5C18 7.5 12 2 12 2z" />
            <path d="M12 2v20" />
          </svg>
        )
      };
    }

    if (norm === 'fastapi') {
      return {
        brand: '#059669',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M13 6l-5 7h4l-2 5 6-7h-4l1-5z" fill="currentColor" stroke="none" />
          </svg>
        )
      };
    }

    if (norm === 'opencv') {
      return {
        brand: '#5c3ee8',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="12" cy="7" r="3.5" />
            <circle cx="7.5" cy="16" r="3.5" />
            <circle cx="16.5" cy="16" r="3.5" />
          </svg>
        )
      };
    }

    if (norm === 'numpy') {
      return {
        brand: '#4dabcf',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 6h16v12H4z" />
            <path d="M4 12h16M10 6v12M16 6v12" />
          </svg>
        )
      };
    }

    if (norm === 'pandas') {
      return {
        brand: '#e70488',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M6 4v16M12 7v10M18 10v4" strokeLinecap="round" />
          </svg>
        )
      };
    }

    if (norm === 'matplotlib' || norm === 'recharts') {
      return {
        brand: '#38bdf8',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h18M5 16l4-6 4 4 6-9" />
          </svg>
        )
      };
    }

    if (norm === 'scikit-learn' || norm === 'scikit-image') {
      return {
        brand: '#f89939',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="9" cy="9" r="4.5" />
            <circle cx="15" cy="15" r="4.5" />
            <path d="M12.5 12.5L16 9" />
          </svg>
        )
      };
    }

    if (norm === 'c') {
      return {
        brand: '#00599c',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 3l8 4.6v8.8L12 21l-8-4.6V7.6L12 3z" />
            <path d="M15 9.5a3.5 3.5 0 100 5" />
          </svg>
        )
      };
    }

    if (norm === 'c++') {
      return {
        brand: '#00599c',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 3l8 4.6v8.8L12 21l-8-4.6V7.6L12 3z" />
            <path d="M13 10a2.5 2.5 0 100 4M16 12h2M17 11v2M19 12h2M20 11v2" />
          </svg>
        )
      };
    }

    if (norm === 'java') {
      return {
        brand: '#f89820',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M5 14h12a3 3 0 010 6H5a3 3 0 010-6z" />
            <path d="M17 16h2a2 2 0 010 4h-2M8 10c0-2 2-3 2-5M12 10c0-2 2-3 2-5" />
          </svg>
        )
      };
    }

    if (norm === 'git') {
      return {
        brand: '#f05032',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" transform="rotate(45 12 12)" />
            <circle cx="12" cy="8" r="1.5" fill="currentColor" />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            <circle cx="16" cy="12" r="1.5" fill="currentColor" />
            <path d="M12 9.5v5M12 12l4 0" />
          </svg>
        )
      };
    }

    if (norm === 'github') {
      return {
        brand: '#f0f6fc',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        )
      };
    }

    if (norm === 'vs code' || norm === 'vscode') {
      return {
        brand: '#007acc',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3l4 2v14l-4 2L8 15.5 3 19l-1-1 3.5-6L2 6l1-1 5 3.5L17 3z" />
            <path d="M17 7v10" />
          </svg>
        )
      };
    }

    if (norm === 'vercel') {
      return {
        brand: '#ffffff',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
            <path d="M12 2L2 20h20L12 2z" />
          </svg>
        )
      };
    }

    if (norm === 'kaggle') {
      return {
        brand: '#20beff',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 4v16M17 5l-8 7 8 7" />
          </svg>
        )
      };
    }

    if (norm === 'jira') {
      return {
        brand: '#2684ff',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l4 4-4 4-4-4 4-4zM7 8l4 4-4 4-4-4 4-4z" />
          </svg>
        )
      };
    }

    if (norm === 'openai') {
      return {
        brand: '#10a37f',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6a3 3 0 013 3v6a3 3 0 01-3 3M9 9a3 3 0 016 0" />
          </svg>
        )
      };
    }

    if (norm === 'groq') {
      return {
        brand: '#f55036',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        )
      };
    }

    if (norm === 'cloudinary') {
      return {
        brand: '#3448c5',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M7 16a4 4 0 01-.8-7.9A5 5 0 0116 7a4.5 4.5 0 013.5 7.5H7z" />
          </svg>
        )
      };
    }

    if (norm === 'razorpay') {
      return {
        brand: '#3395ff',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3L7 21h4l2.5-5.5H17a4 4 0 000-8h-5" />
          </svg>
        )
      };
    }

    if (norm.includes('jwt') || norm.includes('auth')) {
      return {
        brand: '#d63aff',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        )
      };
    }

    if (norm.includes('api') || norm.includes('restful') || norm.includes('llm') || norm.includes('nlp')) {
      return {
        brand: '#38bdf8',
        svg: (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 17l6-6-6-6M12 19h8" />
          </svg>
        )
      };
    }

    // Default tech icon
    return {
      brand: '#818cf8',
      svg: (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    };
  };

  const { brand, svg } = getIconData();

  return (
    <span
      className={`tech-icon-inline ${className}`.trim()}
      style={{ '--tech-brand': brand }}
      aria-hidden="true"
    >
      {svg}
      <style jsx>{`
        .tech-icon-inline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: currentColor;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        :global(.skill-pill:hover) .tech-icon-inline,
        :global(.mono-tag:hover) .tech-icon-inline {
          color: var(--tech-brand, #38bdf8) !important;
          transform: scale(1.1);
        }
      `}</style>
    </span>
  );
}
