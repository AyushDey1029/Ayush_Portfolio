import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import SpecularButton from './SpecularButton';

export default function Hero({ aboutData = [], contentVisible = false }) {
  const introTexts = aboutData.filter(item => item.Category === 'Narrative').map(i => i.Value);
  const contacts = aboutData.filter(item => item.Category === 'Contact');
  const systemInfo = aboutData.filter(item => item.Category === 'SystemInfo');

  const gpa = systemInfo.find(s => s.Key === 'gpa')?.Value || '8.4';
  const university = systemInfo.find(s => s.Key === 'university')?.Value || 'Lovely Professional University';
  const degree = systemInfo.find(s => s.Key === 'degree')?.Value || 'B.Tech - Computer Science and Engineering';

  const emailItem = contacts.find(c => c.Key === 'email');
  const githubItem = contacts.find(c => c.Key === 'github');
  const linkedinItem = contacts.find(c => c.Key === 'linkedin');

  const email = emailItem?.Value || 'deyayush1029@gmail.com';
  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  const githubHref = githubItem?.Href || (githubItem?.Value ? (githubItem.Value.startsWith('http') ? githubItem.Value : `https://${githubItem.Value}`) : 'https://github.com/AyushDey1029');
  const linkedinHref = linkedinItem?.Href || (linkedinItem?.Value ? (linkedinItem.Value.startsWith('http') ? linkedinItem.Value : `https://${linkedinItem.Value}`) : 'https://linkedin.com/in/ayush--dey');

  return (
    <section className="hero-wrap">
      <div className="hero-grid">
        {/* Left Column: Information with dynamic pop-out */}
        <div className={`hero-left-content ${contentVisible ? 'popping-out' : 'pre-pop'}`}>
          {/* Status indicator */}
          <div className="status-container">
            <span className="status-pill">
              <span className="status-dot" />
              Available for SWE & AI Opportunities
            </span>
          </div>

          {/* Main Title */}
          <div className="hero-main">
            <h1 className="hero-name">Ayush Dey</h1>
            <p className="hero-title">
              Full-Stack Software Engineer & Machine Learning Developer
            </p>
          </div>

          {/* Narrative Bio */}
          <div className="hero-bio">
            {introTexts.length > 0 ? (
              introTexts.map((text, idx) => (
                <p key={idx} className="bio-paragraph">{text}</p>
              ))
            ) : (
              <p className="bio-paragraph">
                Computer Science undergraduate with rigorous focus on building scalable full-stack applications, deep learning autoencoder architectures in PyTorch, and production-grade LLM integrations.
              </p>
            )}
          </div>

          {/* Academic Highlights */}
          <div className="academic-strip">
            <div className="academic-item">
              <span className="academic-label">Institution</span>
              <span className="academic-value">{university}</span>
            </div>
            <div className="academic-divider" />
            <div className="academic-item">
              <span className="academic-label">Program</span>
              <span className="academic-value">{degree}</span>
            </div>
            <div className="academic-divider" />
            <div className="academic-item">
              <span className="academic-label">Academic Standing</span>
              <span className="academic-value highlight-val">CGPA: {gpa}</span>
            </div>
          </div>

          {/* Contact Links with Specular Buttons */}
          <div className="contact-row">
            <SpecularButton
              as="a"
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              radius={8}
              gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
            >
              <Mail size={16} />
              <span>Email Me</span>
            </SpecularButton>

            <SpecularButton
              as="a"
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              radius={8}
              gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
            >
              <Github size={16} />
              <span>GitHub</span>
              <ArrowUpRight size={14} className="arrow-icon" />
            </SpecularButton>

            <SpecularButton
              as="a"
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              radius={8}
              gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
              <ArrowUpRight size={14} className="arrow-icon" />
            </SpecularButton>
          </div>
        </div>

        {/* Right Column Grid Placeholder: Reserved for docked card */}
        <div className="hero-right-space" aria-hidden="true" />
      </div>

      <style jsx>{`
        .hero-wrap {
          padding: 3.5rem 0 3rem;
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2.5rem;
          align-items: center;
        }
        .hero-left-content {
          position: relative;
          z-index: 20;
        }
        .hero-right-space {
          pointer-events: none;
        }
        .hero-left-content.pre-pop {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-40px);
        }
        .hero-left-content.popping-out {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }
        .hero-left-content.popping-out > * {
          animation: popOutContent 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, opacity;
        }
        .hero-left-content.popping-out > *:nth-child(1) { animation-delay: 0.05s; }
        .hero-left-content.popping-out > *:nth-child(2) { animation-delay: 0.15s; }
        .hero-left-content.popping-out > *:nth-child(3) { animation-delay: 0.25s; }
        .hero-left-content.popping-out > *:nth-child(4) { animation-delay: 0.35s; }
        .hero-left-content.popping-out > *:nth-child(5) { animation-delay: 0.45s; }

        @keyframes popOutContent {
          0% {
            opacity: 0;
            transform: translateX(-35px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .status-container {
          margin-bottom: 1.5rem;
        }
        .hero-name {
          font-size: 3.25rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }
        .hero-title {
          font-size: 1.25rem;
          color: var(--text-secondary);
          font-weight: 450;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .hero-bio {
          margin-bottom: 2rem;
        }
        .bio-paragraph {
          font-size: 1.02rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        .academic-strip {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding: 1rem 1.25rem;
          background: var(--surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          margin-bottom: 2rem;
        }
        .academic-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .academic-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .academic-value {
          font-size: 0.9rem;
          font-weight: 550;
          color: var(--text-primary);
        }
        .highlight-val {
          color: #34d399;
          font-family: var(--font-mono);
        }
        .academic-divider {
          width: 1px;
          height: 28px;
          background: var(--border-subtle);
        }
        .contact-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          position: relative;
          z-index: 30;
          pointer-events: auto;
        }
        .hero-right-space {
          min-height: 520px;
          pointer-events: none;
        }
        .arrow-icon {
          color: var(--text-muted);
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-left-content {
            margin-top: 410px;
          }
          .hero-right-space {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.5rem;
          }
          .academic-divider {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-left-content.pre-pop {
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
          .hero-left-content.popping-out > * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
