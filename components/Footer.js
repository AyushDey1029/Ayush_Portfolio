'use client';
import React from 'react';
import { ArrowUp, Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import SpecularButton from './SpecularButton';

export default function Footer({ aboutData = [] }) {
  const contacts = aboutData.filter(item => item.Category === 'Contact');
  const email = contacts.find(c => c.Key === 'email')?.Value || 'deyayush1029@gmail.com';
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  const github = contacts.find(c => c.Key === 'github')?.Value || 'github.com/AyushDey1029';
  const linkedin = contacts.find(c => c.Key === 'linkedin')?.Value || 'linkedin.com/in/ayush--dey';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Training', href: '#training' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' }
  ];

  return (
    <footer className="portfolio-footer-section">
      <div className="footer-glass-card">
        {/* Top Tier: Identity & Status */}
        <div className="footer-header-row">
          <div>
            <div className="footer-status-pill">
              <span className="footer-status-dot" />
              <span>Available for SWE & AI Opportunities</span>
            </div>
            <h3 className="footer-name">Ayush Dey</h3>
            <p className="footer-role">Software Engineer & AI Researcher</p>
          </div>

          <div className="footer-actions">
            <SpecularButton
              as="a"
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              radius={8}
              gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
            >
              <Mail size={15} />
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </SpecularButton>

            <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Middle Tier: Navigation & Social */}
        <div className="footer-nav-row">
          <nav className="footer-links" aria-label="Footer navigation">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="footer-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="footer-social-links">
            <a
              href={`https://${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Send Email via Gmail"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Tier: Sub-credits & Copyright */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            © {new Date().getFullYear()} Ayush Dey. All rights reserved.
          </p>
          <p className="footer-stack-info">
            Built with Next.js, Three.js, Rapier Physics & WebGL
          </p>
        </div>
      </div>

      <style jsx>{`
        .portfolio-footer-section {
          width: 100%;
          padding: 4rem 0 6rem;
          position: relative;
          z-index: 20;
        }

        .footer-glass-card {
          background: rgba(17, 20, 26, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 24px;
          padding: 3rem 2.5rem 2rem;
          box-shadow: 0 -12px 36px rgba(0, 0, 0, 0.45), 0 20px 40px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
        }

        .footer-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
          padding-bottom: 2.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #86efac;
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          padding: 0.28rem 0.75rem;
          border-radius: 9999px;
          margin-bottom: 0.85rem;
        }

        .footer-status-dot {
          width: 6px;
          height: 6px;
          background-color: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .footer-name {
          font-size: 1.85rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 0.2rem;
        }

        .footer-role {
          color: var(--text-secondary, #94a3b8);
          font-size: 0.95rem;
        }

        .footer-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary, #94a3b8);
          padding: 0.45rem 0.95rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-to-top-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer-nav-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 1.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .footer-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-link {
          color: var(--text-secondary, #94a3b8);
          font-size: 0.88rem;
          font-family: var(--font-mono, monospace);
          transition: color 0.15s ease;
        }

        .footer-link:hover {
          color: #38bdf8;
        }

        .footer-social-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary, #94a3b8);
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          color: #fff;
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(30, 41, 59, 0.7);
          transform: translateY(-2px);
        }

        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1.5rem;
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
        }

        .footer-stack-info {
          font-family: var(--font-mono, monospace);
        }

        @media (max-width: 768px) {
          .portfolio-footer-section {
            padding: 3rem 0 5rem;
          }
          .footer-glass-card {
            padding: 2rem 1.5rem 1.5rem;
          }
          .footer-header-row {
            flex-direction: column;
            align-items: stretch;
          }
          .footer-actions {
            justify-content: flex-start;
          }
          .footer-nav-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
