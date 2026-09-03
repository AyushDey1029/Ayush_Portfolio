import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function Experience({ experienceData = [] }) {
  const hasExperience = experienceData && experienceData.length > 0;

  return (
    <section id="experience" className="section animate-fade-in">
      <h2 className="section-title">Professional Experience</h2>
      {hasExperience ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experienceData.map((exp, idx) => (
            <div key={idx} className="glass-card experience-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.8rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '12px' }}>
                    <Briefcase size={24} color="var(--accent-color)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{exp.Role}</h3>
                    <p style={{ color: 'var(--accent-color)', fontWeight: '500' }}>{exp.Company}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{exp.Duration}</span>
              </div>
              {exp.Details && <p style={{ color: 'var(--text-primary)', marginTop: '0.5rem' }}>{exp.Details}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Briefcase size={36} color="var(--accent-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Open to Opportunities</h3>
          <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto', color: 'var(--text-secondary)' }}>
            Currently expanding technical horizons with production-grade AI & Full-Stack engineering projects. Available for high-impact software engineering and AI/ML internships and full-time roles.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#34d399" /> Full-Stack Development
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#34d399" /> Generative AI & LLMs
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#34d399" /> Deep Learning (PyTorch)
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
