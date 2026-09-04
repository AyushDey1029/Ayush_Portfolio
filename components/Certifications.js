'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Eye, Maximize2, X } from 'lucide-react';
import BorderGlow from './BorderGlow';
import SpecularButton from './SpecularButton';

const getCertImage = (cert) => {
  if (cert.CertificateImage) return cert.CertificateImage;
  const title = cert.Title?.toLowerCase() || '';
  const subtitle = cert.Subtitle?.toLowerCase() || '';
  if (title.includes('react') || subtitle.includes('techveda')) {
    return '/assets/certificates/react-techveda-cert.png';
  }
  if (title.includes('python') || subtitle.includes('cse pathshala')) {
    return '/assets/certificates/python-csepathshala-cert.png';
  }
  if (title.includes('linux') || title.includes('shell') || subtitle.includes('skillera')) {
    return '/assets/certificates/linux-skillera-cert.png';
  }
  return null;
};

export default function Certifications({ certificationsData = [], achievementsData = [] }) {
  const [selectedCert, setSelectedCert] = useState(null);

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

  const hasCerts = certificationsData && certificationsData.length > 0;
  const hasAchievements = achievementsData && achievementsData.length > 0;

  if (!hasCerts && !hasAchievements) return null;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Credentials</span>
        <h2 className="section-title">Certifications</h2>
      </div>

      {hasCerts && (
        <div className="certs-grid">
          {certificationsData.map((cert, idx) => {
            const certImage = getCertImage(cert);

            return (
              <BorderGlow
                key={idx}
                borderRadius={16}
                backgroundColor="#11141a"
                colors={['#38bdf8', '#818cf8', '#c084fc']}
                edgeSensitivity={30}
                glowRadius={30}
                glowIntensity={0.8}
                coneSpread={25}
              >
                <div className="cert-card-layout">
                  {/* Foreground Content */}
                  <div className="cert-card-content">
                    <div>
                      <div className="cert-top">
                        <div>
                          <h3 className="cert-title">{cert.Title}</h3>
                          <p className="cert-issuer">{cert.Subtitle}</p>
                        </div>
                        <span className="cert-date">{cert.Duration}</span>
                      </div>

                      {cert.ParsedDescription?.description && cert.ParsedDescription.description.length > 0 && (
                        <p className="cert-desc">{cert.ParsedDescription.description.join(', ')}</p>
                      )}
                    </div>

                    <div className="cert-bottom">
                      <div className="stack-tags">
                        {(cert.Stack || []).map((s, sIdx) => (
                          <span key={sIdx} className="mono-tag">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="cert-actions">
                        {certImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCert({
                                title: cert.Title,
                                subtitle: cert.Subtitle,
                                image: certImage,
                                duration: cert.Duration,
                              })
                            }
                            className="cert-view-btn"
                            title="View Certificate"
                            aria-label={`View certificate for ${cert.Title}`}
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                        )}

                        {cert.ProofLink && cert.ProofLink !== '#' && (
                          <SpecularButton
                            as="a"
                            href={cert.ProofLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="xs"
                            radius={6}
                            gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
                          >
                            <span>Verify</span>
                            <ArrowUpRight size={12} />
                          </SpecularButton>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Background: Embedded Certificate Preview (Revealed on Hover with feathered blending) */}
                  {certImage && (
                    <div
                      className="cert-preview-dock"
                      onClick={() =>
                        setSelectedCert({
                          title: cert.Title,
                          subtitle: cert.Subtitle,
                          image: certImage,
                          duration: cert.Duration,
                        })
                      }
                      role="button"
                      tabIndex={0}
                      title="Click to view full certificate"
                      aria-label={`View full certificate for ${cert.Title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedCert({
                            title: cert.Title,
                            subtitle: cert.Subtitle,
                            image: certImage,
                            duration: cert.Duration,
                          });
                        }
                      }}
                    >
                      <img
                        src={certImage}
                        alt={`Certificate for ${cert.Title}`}
                        className="cert-preview-img"
                      />
                      <div className="cert-gradient-mask" />
                    </div>
                  )}
                </div>
              </BorderGlow>
            );
          })}
        </div>
      )}

      {hasAchievements && (
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Honors & Achievements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {achievementsData.map((ach, idx) => (
              <BorderGlow
                key={idx}
                borderRadius={8}
                backgroundColor="#11141a"
                glowColor="215 80 60"
                colors={['#38bdf8', '#2563eb', '#64748b']}
                edgeSensitivity={30}
                glowRadius={25}
                glowIntensity={0.8}
              >
                <div className="achievement-row-content">
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>{ach.Title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ach.Subtitle}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {ach.Duration}
                  </span>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      )}

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
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .cert-card-layout {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 230px;
          overflow: hidden;
          border-radius: 16px;
          background: #11141a;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          isolation: isolate;
          display: flex;
        }

        .cert-card-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 1.6rem 1.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: auto;
        }

        .cert-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .cert-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .cert-issuer {
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin-top: 0.2rem;
        }

        .cert-date {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
        }

        .cert-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.55;
          max-width: 90%;
        }

        .cert-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .stack-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .cert-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cert-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          color: #38bdf8;
          padding: 0.35rem 0.75rem;
          border-radius: 7px;
          font-size: 0.78rem;
          font-weight: 550;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cert-view-btn:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: rgba(56, 189, 248, 0.55);
          color: #fff;
        }

        /* ── Embedded Certificate Background Preview (Hover-Only with Feathered Blending) ── */
        .cert-preview-dock {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 74%;
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
          transition: opacity 0.45s ease, visibility 0.45s ease;
          pointer-events: none;
        }

        .cert-card-layout:hover .cert-preview-dock {
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
          opacity: 0.94;
          filter: contrast(1.02) brightness(0.98);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            transparent 12%,
            rgba(0, 0, 0, 0.45) 36%,
            rgba(0, 0, 0, 0.92) 65%,
            #000 85%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            transparent 12%,
            rgba(0, 0, 0, 0.45) 36%,
            rgba(0, 0, 0, 0.92) 65%,
            #000 85%
          );
          transform: scale(1);
          transform-origin: center right;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.4s ease,
                      opacity 0.4s ease;
        }

        .cert-card-layout:hover .cert-preview-img {
          transform: scale(1.03);
          opacity: 1;
          filter: contrast(1.04) brightness(1.02);
        }

        /* Soft feathered gradient mask blending certificate smoothly into the dark card */
        .cert-gradient-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #11141a 0%,
            #11141a 15%,
            rgba(17, 20, 26, 0.88) 35%,
            rgba(17, 20, 26, 0.42) 60%,
            rgba(17, 20, 26, 0.08) 82%,
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

        .achievement-row-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          width: 100%;
        }

        @media (max-width: 768px) {
          .cert-preview-dock {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
