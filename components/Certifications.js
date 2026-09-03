import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Certifications({ certificationsData = [], achievementsData = [] }) {
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
          {certificationsData.map((cert, idx) => (
            <div key={idx} className="cert-card">
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

              <div className="cert-bottom">
                <div className="stack-tags">
                  {(cert.Stack || []).map((s, sIdx) => (
                    <span key={sIdx} className="mono-tag">
                      {s}
                    </span>
                  ))}
                </div>

                {cert.ProofLink && cert.ProofLink !== '#' && (
                  <a
                    href={cert.ProofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    <span>Verify</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {hasAchievements && (
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Honors & Achievements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {achievementsData.map((ach, idx) => (
              <div key={idx} className="achievement-row">
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>{ach.Title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ach.Subtitle}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {ach.Duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 1.5rem;
        }
        .cert-card {
          background: var(--surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.2s ease;
        }
        .cert-card:hover {
          border-color: var(--border-strong);
        }
        .cert-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .cert-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .cert-issuer {
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin-top: 0.15rem;
        }
        .cert-date {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .cert-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .cert-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
        }
        .stack-tags {
          display: flex;
          gap: 0.4rem;
        }
        .verify-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .verify-link:hover {
          color: var(--accent-text);
        }
        .achievement-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: var(--surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
