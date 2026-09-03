'use client';
import React, { useState } from 'react';
import { Bot, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenChat }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Training', href: '#training' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <header className="nav-header">
      <div className="nav-container">
        <a href="#" className="brand">
          <span className="brand-name">Ayush Dey</span>
          <span className="brand-role">Software Engineer</span>
        </a>

        {/* Desktop Links */}
        <nav className="desktop-nav">
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-anchor">
                {link.name}
              </a>
            ))}
          </div>

          <button onClick={onOpenChat} className="copilot-btn" aria-label="Open AI Copilot">
            <Bot size={15} />
            <span>AI Copilot</span>
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="mobile-actions">
          <button onClick={onOpenChat} className="copilot-btn-icon" aria-label="Open AI Copilot">
            <Bot size={16} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn" aria-label="Toggle menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .nav-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(9, 10, 13, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0.9rem 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
        }
        .brand-name {
          font-weight: 700;
          font-size: 1.05rem;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .brand-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-anchor {
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 450;
          transition: color 0.15s ease;
        }
        .nav-anchor:hover {
          color: #fff;
        }
        .copilot-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--surface-1);
          border: 1px solid var(--border-strong);
          color: var(--text-primary);
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .copilot-btn:hover {
          background: var(--surface-2);
          border-color: var(--border-active);
          color: #fff;
        }
        .mobile-actions {
          display: none;
        }
        .copilot-btn-icon {
          background: var(--surface-1);
          border: 1px solid var(--border-strong);
          color: var(--text-primary);
          padding: 0.45rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .menu-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .mobile-drawer {
          display: flex;
          flex-direction: column;
          padding: 1rem 1.75rem 1.5rem;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-color);
          gap: 0.85rem;
        }
        .mobile-link {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </header>
  );
}
