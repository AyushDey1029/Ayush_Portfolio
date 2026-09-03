import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function Education({ educationData = [] }) {
  if (!educationData || educationData.length === 0) return null;

  return (
    <section id="education" className="section animate-fade-in">
      <h2 className="section-title">Education & Academics</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {educationData.map((edu, idx) => (
          <div key={idx} className="glass-card education-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.8rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '12px' }}>
                  <GraduationCap size={28} color="var(--accent-color)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>{edu.Degree}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    {edu.Major} {edu.Specialization ? `• ${edu.Specialization}` : ''}
                  </p>
                  <p style={{ color: 'var(--accent-color)', fontSize: '0.95rem', fontWeight: '500' }}>
                    {edu.Institution}
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{edu.Duration}</span>
                {edu.GPA && (
                  <span style={{ 
                    padding: '0.3rem 0.8rem', 
                    background: 'rgba(16, 185, 129, 0.15)', 
                    color: '#34d399', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    CGPA: {edu.GPA}
                  </span>
                )}
              </div>
            </div>

            {edu.FocusAreas && edu.FocusAreas.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                  Focus Areas
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {edu.FocusAreas.map((area, aIdx) => (
                    <span key={aIdx} style={{
                      padding: '0.3rem 0.7rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {edu.Coursework && edu.Coursework.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                  Relevant Coursework
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {edu.Coursework.map((course, cIdx) => (
                    <span key={cIdx} style={{
                      padding: '0.3rem 0.7rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
