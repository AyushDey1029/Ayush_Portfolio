import React from 'react';

export default function Skills({ skillsData = [] }) {
  if (!skillsData || skillsData.length === 0) return null;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Capabilities</span>
        <h2 className="section-title">Technical Expertise</h2>
      </div>

      <div className="skills-grid">
        {skillsData.map((category, idx) => (
          <div key={idx} className="skill-block">
            <h3 className="skill-cat-title">{category.Category}</h3>
            <div className="tags-container">
              {(category.ItemsList || []).map((skill, sIdx) => (
                <span key={sIdx} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 1.5rem;
        }
        .skill-block {
          background: var(--surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 1.5rem;
          transition: border-color 0.2s ease;
        }
        .skill-block:hover {
          border-color: var(--border-strong);
        }
        .skill-cat-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .skill-pill {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          padding: 0.25rem 0.65rem;
          background: var(--surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }
        .skill-pill:hover {
          color: #fff;
          border-color: var(--border-active);
          background: var(--surface-elevated);
        }
      `}</style>
    </div>
  );
}
