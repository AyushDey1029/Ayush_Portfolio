'use client';
import React, { useState, useEffect } from 'react';
import { Eye, Maximize2, X, ExternalLink } from 'lucide-react';
import BorderGlow from './BorderGlow';

export default function Training({ trainingData = [] }) {
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  if (!trainingData || trainingData.length === 0) return null;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Professional Development</span>
        <h2 className="section-title">Specialized Bootcamps</h2>
      </div>

      <div className="training-list">
        {trainingData.map((item, idx) => {
          // Resolve certificate image path for training items
          const certImage =
            item.CertificateImage ||
            (item.ID === 'T1' || item.Title?.toLowerCase().includes('mern')
              ? '/assets/certificates/mern-bootcamp-cert.png'
              : null);

          return (
            <BorderGlow
              key={idx}
              borderRadius={16}
              backgroundColor="#11141a"
              glowColor="215 80 60"
              colors={['#38bdf8', '#818cf8', '#c084fc']}
              edgeSensitivity={30}
              glowRadius={32}
              glowIntensity={0.85}
              coneSpread={25}
            >
              <div className="training-card-layout">
                {/* Foreground: Structured Text Content */}
                <div className="training-card-content">
                  <div className="card-accent-marker" aria-hidden="true" />
                  
                  <div className="training-header">
                    <div>
                      <h3 className="training-title">{item.Title}</h3>
                      <p className="training-subtitle">{item.Subtitle}</p>
                    </div>
                    <span className="training-duration">{item.Duration}</span>
                  </div>

                  {item.ParsedDescription?.description && item.ParsedDescription.description.length > 0 && (
                    <div className="desc-section">
                      <span className="desc-label">DESCRIPTION</span>
                      <ul className="points-list">
                        {item.ParsedDescription.description.map((point, pIdx) => (
                          <li key={pIdx} className="point-item">
                            <span className="bullet-square" aria-hidden="true">▪</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.ParsedDescription?.learning && item.ParsedDescription.learning.length > 0 && (
                    <div className="competencies-block">
                      <span className="comp-label">Competencies Mastered:</span>
                      <span className="comp-text">
                        {item.ParsedDescription.learning.join(' • ')}
                      </span>
                    </div>
                  )}

                  <div className="bottom-row">
                    {item.Stack && item.Stack.length > 0 && (
                      <div className="stack-row">
                        {item.Stack.map((tech, tIdx) => (
                          <span key={tIdx} className="mono-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {certImage && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCert({
                            title: item.Title,
                            subtitle: item.Subtitle,
                            image: certImage,
                            duration: item.Duration,
                          })
                        }
                        className="mobile-view-cert-btn"
                        aria-label="View full certificate"
                      >
                        <Eye size={14} />
                        <span>View Certificate</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Background: Embedded Certificate Preview, revealed only on hover with natural feathered gradient blending */}
                {certImage && (
                  <div
                    className="cert-preview-dock"
                    onClick={() =>
                      setSelectedCert({
                        title: item.Title,
                        subtitle: item.Subtitle,
                        image: certImage,
                        duration: item.Duration,
                      })
                    }
                    role="button"
                    tabIndex={0}
                    title="Click to view full certificate"
                    aria-label={`View full certificate for ${item.Title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedCert({
                          title: item.Title,
                          subtitle: item.Subtitle,
                          image: certImage,
                          duration: item.Duration,
                        });
                      }
                    }}
                  >
                    <img
                      src={certImage}
                      alt={`Certificate for ${item.Title}`}
                      className="cert-preview-img"
                    />
                    <div className="cert-gradient-mask" />
                    <div className="cert-hover-indicator">
                      <Maximize2 size={13} />
                      <span>View Full Certificate</span>
                    </div>
                  </div>
                )}
              </div>
            </BorderGlow>
          );
        })}
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="cert-lightbox-overlay"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview modal"
        >
          <div className="cert-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="cert-lightbox-header">
              <div>
                <h3 className="lightbox-title">{selectedCert.title}</h3>
                <p className="lightbox-subtitle">{selectedCert.subtitle}</p>
              </div>
              <button
                className="lightbox-close-btn"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cert-lightbox-body">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="lightbox-img"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .training-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .training-card-layout {
          display: flex;
          position: relative;
          width: 100%;
          min-height: 300px;
          overflow: hidden;
          border-radius: 16px;
          background: #11141a;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          isolation: isolate;
        }

        .training-card-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 68%;
          padding: 2.25rem 2.25rem 2rem;
          pointer-events: auto;
        }

        .card-accent-marker {
          width: 9px;
          height: 9px;
          background: #38bdf8;
          border-radius: 2px;
          margin-bottom: 0.9rem;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.7);
        }

        .training-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .training-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .training-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .training-duration {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
        }

        .desc-section {
          margin-bottom: 1.25rem;
        }

        .desc-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .points-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .point-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .bullet-square {
          color: #38bdf8;
          font-size: 0.82rem;
          line-height: 1.6;
          flex-shrink: 0;
          user-select: none;
        }

        .competencies-block {
          background: rgba(255, 255, 255, 0.02);
          border-left: 2px solid #38bdf8;
          padding: 0.65rem 1rem;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.35rem;
          font-size: 0.85rem;
        }

        .comp-label {
          font-weight: 600;
          color: var(--text-primary);
          margin-right: 0.5rem;
        }

        .comp-text {
          color: var(--text-secondary);
        }

        .bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .mobile-view-cert-btn {
          display: none;
          align-items: center;
          gap: 0.4rem;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 550;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-view-cert-btn:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: rgba(56, 189, 248, 0.5);
          color: #fff;
        }

        /* ── Embedded Certificate Background Preview (Hover-Only with Feathered Blending) ── */
        .cert-preview-dock {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 64%;
          z-index: 1;
          cursor: pointer;
          overflow: hidden;
          background: transparent;
          opacity: 0;
          visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: opacity 0.45s ease,
                      visibility 0.45s ease;
          pointer-events: none;
        }

        .training-card-layout:hover .cert-preview-dock {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .cert-preview-img {
          position: absolute;
          right: 0;
          top: -2%;
          bottom: -2%;
          width: 104%;
          height: 104%;
          object-fit: cover;
          object-position: center right;
          opacity: 0.92;
          filter: contrast(1.02) brightness(0.98);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            transparent 10%,
            rgba(0, 0, 0, 0.35) 28%,
            rgba(0, 0, 0, 0.85) 55%,
            #000 85%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            transparent 10%,
            rgba(0, 0, 0, 0.35) 28%,
            rgba(0, 0, 0, 0.85) 55%,
            #000 85%
          );
          transform: scale(1);
          transform-origin: center right;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.4s ease,
                      opacity 0.4s ease;
        }

        .training-card-layout:hover .cert-preview-img {
          transform: scale(1.03);
          opacity: 0.98;
          filter: contrast(1.04) brightness(1.01);
        }

        /* Soft feathered gradient mask blending certificate smoothly into the dark card */
        .cert-gradient-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #11141a 0%,
            #11141a 14%,
            rgba(17, 20, 26, 0.94) 30%,
            rgba(17, 20, 26, 0.55) 55%,
            rgba(17, 20, 26, 0.12) 80%,
            transparent 100%
          ),
          linear-gradient(
            to top,
            #11141a 0%,
            rgba(17, 20, 26, 0.7) 6%,
            transparent 22%
          ),
          linear-gradient(
            to bottom,
            #11141a 0%,
            rgba(17, 20, 26, 0.7) 6%,
            transparent 22%
          ),
          linear-gradient(
            to left,
            #11141a 0%,
            rgba(17, 20, 26, 0.5) 4%,
            transparent 15%
          );
          pointer-events: none;
        }

        .cert-hover-indicator {
          position: absolute;
          bottom: 1.25rem;
          right: 1.5rem;
          z-index: 3;
          background: rgba(17, 20, 26, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #f1f5f9;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 550;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.1s,
                      transform 0.3s ease 0.1s,
                      border-color 0.2s ease,
                      color 0.2s ease;
        }

        .training-card-layout:hover .cert-hover-indicator {
          opacity: 0.95;
          transform: translateY(0);
        }

        .cert-hover-indicator:hover {
          opacity: 1;
          border-color: rgba(56, 189, 248, 0.6);
          color: #38bdf8;
          transform: translateY(-2px);
        }

        /* ── Lightbox Modal ── */
        .cert-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(5, 6, 8, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeInOverlay 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .cert-lightbox-dialog {
          background: #11141a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.85);
          max-width: 960px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scaleUpDialog 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .cert-lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(22, 27, 34, 0.7);
        }

        .lightbox-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
        }

        .lightbox-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .lightbox-close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-close-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .cert-lightbox-body {
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #090a0d;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 72vh;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUpDialog {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 900px) {
          .training-card-layout {
            flex-direction: column;
            min-height: auto;
          }
          .training-card-content {
            max-width: 100%;
            padding: 1.75rem 1.5rem;
          }
          .cert-preview-dock {
            display: none;
          }
          .mobile-view-cert-btn {
            display: inline-flex;
          }
        }
      `}</style>
    </div>
  );
}
