import React from 'react';
import { BookOpen, CheckCircle, ExternalLink } from 'lucide-react';
import { Github } from './Icons';

export default function Training({ trainingData = [] }) {
  if (!trainingData || trainingData.length === 0) return null;

  return (
    <section id="training" className="section animate-fade-in">
      <h2 className="section-title">Specialized Training & Bootcamps</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {trainingData.map((item, idx) => (
          <div key={idx} className="glass-card training-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.8rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '12px' }}>
                  <BookOpen size={28} color="var(--accent-color)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>{item.Title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.Subtitle}</p>
                </div>
              </div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.Duration}</span>
            </div>

            {item.ParsedDescription?.description && item.ParsedDescription.description.length > 0 && (
              <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                {item.ParsedDescription.description.map((point, pIdx) => (
                  <li key={pIdx} style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {item.ParsedDescription?.learning && item.ParsedDescription.learning.length > 0 && (
              <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)', marginBottom: '1rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--accent-color)', fontSize: '0.95rem' }}>
                  Core Competencies Mastered:
                </strong>
                <ul style={{ paddingLeft: '1.2rem', listStyleType: 'circle', color: 'var(--text-secondary)' }}>
                  {item.ParsedDescription.learning.map((point, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: '0.2rem' }}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.Stack && item.Stack.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {item.Stack.map((tech, tIdx) => (
                  <span key={tIdx} style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem', background: 'rgba(88, 166, 255, 0.1)', color: 'var(--accent-color)', borderRadius: '12px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
