'use client';
import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight } from 'lucide-react';
import SpecularButton from './SpecularButton';
import PillNav from './PillNav';

export default function Navbar({ onOpenChat }) {
  const [activeSection, setActiveSection] = useState('#about');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Training', href: '#training' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['education', 'certifications', 'training', 'projects', 'skills', 'about'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sectionId}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="nav-header">
      <div className="nav-container">
        <a href="#" className="brand">
          <span className="brand-name">Ayush Dey</span>
          <span className="brand-role">Software Engineer</span>
        </a>

        {/* Center Pill Navigation */}
        <div className="nav-center">
          <PillNav
            logo="/icon.png"
            logoAlt="AD"
            items={navLinks}
            activeHref={activeSection}
            baseColor="rgba(17, 20, 26, 0.85)"
            pillColor="rgba(255, 255, 255, 0.04)"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#94a3b8"
            hoverCircleColor="#2563eb"
            initialLoadAnimation={false}
          />
        </div>

        {/* Right Action: Resume */}
        <div className="nav-actions">
          <SpecularButton
            as="a"
            href="/assets/Ayush_Dey_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            radius={8}
            gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
            aria-label="View and Download Resume"
            title="View & Download Resume (PDF)"
          >
            <FileText size={15} />
            <span className="resume-text">Resume</span>
            <ArrowUpRight size={12} />
          </SpecularButton>
        </div>
      </div>

      <style jsx>{`
        .nav-header {
          position: relative;
          width: 100%;
          z-index: 100;
          background: rgba(9, 10, 13, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0.65rem 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .brand {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-shrink: 0;
          text-decoration: none;
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
        .nav-center {
          display: flex;
          justify-content: center;
          flex: 1;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .brand-role {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0.6rem 1rem;
          }
          .nav-center {
            justify-content: flex-end;
          }
          .resume-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
