import React from 'react';
import BorderGlow from './BorderGlow';

export default function Education({ educationData = [] }) {
  if (!educationData || educationData.length === 0) return null;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Academics</span>
        <h2 className="section-title">Education</h2>
      </div>

      <div className="education-list">
        {educationData.map((edu, idx) => (
          <BorderGlow
            key={idx}
            borderRadius={12}
            backgroundColor="#11141a"
            glowColor="215 80 60"
            colors={['#38bdf8', '#818cf8', '#c084fc']}
            edgeSensitivity={30}
            glowRadius={32}
            glowIntensity={0.85}
            coneSpread={25}
          >
            <div className="edu-card-content">
              <div className="edu-top">
                <div>
                  <h3 className="edu-degree">{edu.Degree}</h3>
                  <p className="edu-major">
                    {edu.Major} {edu.Specialization ? `• ${edu.Specialization}` : ''}
                  </p>
                  <p className="edu-inst">{edu.Institution}</p>
                </div>

                <div className="edu-meta">
                  <span className="edu-duration">{edu.Duration}</span>
                  {edu.GPA && (
                    <span className="gpa-tag">CGPA: {edu.GPA}</span>
                  )}
                </div>
              </div>

              {edu.FocusAreas && edu.FocusAreas.length > 0 && (
                <div className="focus-block">
                  <span className="block-label">Focus Areas:</span>
                  <div className="tag-group">
                    {edu.FocusAreas.map((area, aIdx) => (
                      <span key={aIdx} className="mono-tag">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.Coursework && edu.Coursework.length > 0 && (
                <div className="focus-block">
                  <span className="block-label">Coursework:</span>
                  <div className="tag-group">
                    {edu.Coursework.map((course, cIdx) => (
                      <span key={cIdx} className="mono-tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </BorderGlow>
        ))}
      </div>

      <style jsx>{`
        .education-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .edu-card-content {
          padding: 1.75rem;
          width: 100%;
        }
        .edu-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .edu-degree {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .edu-major {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 0.15rem;
        }
        .edu-inst {
          color: var(--accent-text);
          font-size: 0.9rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }
        .edu-meta {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.4rem;
        }
        .edu-duration {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .gpa-tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #34d399;
          border-radius: 6px;
          font-weight: 600;
        }
        .focus-block {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 0.75rem;
        }
        .block-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .tag-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
      `}</style>
    </div>
  );
}
