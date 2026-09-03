'use client';
import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenChat }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Training', href: '#training' },
    { name: 'Certificates', href: '#certifications' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo gradient-text">
          Ayush.dev
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-item">
              {link.name}
            </a>
          ))}
          <button onClick={onOpenChat} className="ai-chat-btn">
            <Sparkles size={16} />
            <span>Ask AI</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-toggle">
          <button onClick={onOpenChat} className="ai-chat-btn mobile-ai-btn">
            <Sparkles size={16} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-item"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(13, 17, 23, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 2rem;
          padding: 0.75rem 1.5rem;
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .navbar-logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-item {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-item:hover {
          color: var(--accent-color);
        }
        .ai-chat-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ai-chat-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
        }
        .mobile-toggle {
          display: none;
        }
        .menu-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-color);
          margin-top: 0.75rem;
        }
        .mobile-nav-item {
          color: var(--text-primary);
          font-size: 1.1rem;
          padding: 0.5rem 0;
        }
        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
          .mobile-toggle {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </nav>
  );
}
