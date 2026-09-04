import React from 'react';
import SpotlightCard from './SpotlightCard';
import TechIcon from './TechIcon';

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
          <SpotlightCard
            key={idx}
            borderRadius={14}
            spotlightColor="rgba(56, 189, 248, 0.16)"
            className="skill-card-item"
          >
            <div className="skill-block-content">
              <h3 className="skill-cat-title">{category.Category}</h3>
              <div className="tags-container">
                {(category.ItemsList || []).map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    <TechIcon name={skill} size={13} />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 1.5rem;
        }
        .skill-block-content {
          padding: 1.65rem;
          width: 100%;
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
          gap: 0.5rem;
        }
        .skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          padding: 0.32rem 0.7rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }
        .skill-pill:hover {
          color: #fff;
          border-color: rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.08);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
