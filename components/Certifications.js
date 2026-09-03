import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certifications({ certificationsData = [], achievementsData = [] }) {
  const hasCerts = certificationsData && certificationsData.length > 0;
  const hasAchievements = achievementsData && achievementsData.length > 0;

  if (!hasCerts && !hasAchievements) return null;

  return (
    <section id="certifications" className="section animate-fade-in">
      <h2 className="section-title">Certificates & Achievements</h2>
      
      {/* Certifications Grid */}
      {hasCerts && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {certificationsData.map((cert, idx) => (
            <div key={idx} className="glass-card cert-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '12px' }}>
                    <Award size={26} color="var(--accent-color)" />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cert.Duration}</span>
                </div>
                
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: '#fff' }}>{cert.Title}</h3>
                <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '500' }}>
                  {cert.Subtitle}
                </p>

                {cert.ParsedDescription?.description && cert.ParsedDescription.description.length > 0 && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {cert.ParsedDescription.description.join(', ')}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {(cert.Stack || []).map((s, sIdx) => (
                    <span key={sIdx} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {cert.ProofLink && cert.ProofLink !== '#' && (
                  <a href={cert.ProofLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                    Verify <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements (if any) */}
      {hasAchievements && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Key Honors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {achievementsData.map((ach, idx) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
                <ShieldCheck size={24} color="#34d399" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{ach.Title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ach.Subtitle} • {ach.Duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
