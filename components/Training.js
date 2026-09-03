import React from 'react';
import BorderGlow from './BorderGlow';

export default function Training({ trainingData = [] }) {
  if (!trainingData || trainingData.length === 0) return null;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Professional Development</span>
        <h2 className="section-title">Specialized Bootcamps</h2>
      </div>

      <div className="training-list">
        {trainingData.map((item, idx) => (
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
            <div className="training-card-content">
              <div className="training-header">
                <div>
                  <h3 className="training-title">{item.Title}</h3>
                  <p className="training-subtitle">{item.Subtitle}</p>
                </div>
                <span className="training-duration">{item.Duration}</span>
              </div>

              {item.ParsedDescription?.description && item.ParsedDescription.description.length > 0 && (
                <ul className="points-list">
                  {item.ParsedDescription.description.map((point, pIdx) => (
                    <li key={pIdx} className="point-item">
                      <span className="dash">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.ParsedDescription?.learning && item.ParsedDescription.learning.length > 0 && (
                <div className="competencies-block">
                  <span className="comp-label">Competencies Mastered:</span>
                  <span className="comp-text">
                    {item.ParsedDescription.learning.join(' • ')}
                  </span>
                </div>
              )}

              {item.Stack && item.Stack.length > 0 && (
                <div className="stack-row">
                  {item.Stack.map((tech, tIdx) => (
                    <span key={tIdx} className="mono-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </BorderGlow>
        ))}
      </div>

      <style jsx>{`
        .training-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .training-card-content {
          padding: 1.75rem;
          width: 100%;
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
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .training-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .training-duration {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .points-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .point-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .dash {
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .competencies-block {
          background: rgba(255, 255, 255, 0.02);
          border-left: 2px solid var(--border-strong);
          padding: 0.6rem 1rem;
          border-radius: 0 6px 6px 0;
          margin-bottom: 1.25rem;
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
        .stack-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
      `}</style>
    </div>
  );
}
