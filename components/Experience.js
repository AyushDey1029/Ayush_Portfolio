import React from 'react';
import SpotlightCard from './SpotlightCard';
import TechIcon from './TechIcon';

export default function Experience({ experienceData = [] }) {
  const hasExperience = experienceData && experienceData.length > 0;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Trajectory</span>
        <h2 className="section-title">Experience</h2>
      </div>

      {hasExperience ? (
        <div className="exp-list">
          {experienceData.map((exp, idx) => (
            <SpotlightCard
              key={idx}
              borderRadius={14}
              spotlightColor="rgba(56, 189, 248, 0.16)"
              className="exp-item-card"
            >
              <div className="exp-item-content">
                <div className="exp-top">
                  <div>
                    <h3 className="exp-role">{exp.Role}</h3>
                    <p className="exp-company">{exp.Company}</p>
                  </div>
                  <span className="exp-duration">{exp.Duration}</span>
                </div>
                {exp.Details && <p className="exp-details">{exp.Details}</p>}
              </div>
            </SpotlightCard>
          ))}
        </div>
      ) : (
        <SpotlightCard
          borderRadius={16}
          spotlightColor="rgba(56, 189, 248, 0.18)"
          className="open-roles-card"
        >
          <div className="open-box-content">
            <div className="open-header">
              <span className="status-pill">
                <span className="status-dot" />
                Open to Roles
              </span>
            </div>
            <h3 className="open-title">Seeking Full-Stack & Machine Learning Engineering Roles</h3>
            <p className="open-desc">
              Equipped with end-to-end production experience architecting crowdfunding platforms with automated LLM trust scoring, building multilingual NLP advisory pipelines, and training deep autoencoders in PyTorch. Actively seeking software engineering and AI/ML internships and full-time opportunities.
            </p>
            <div className="focus-pills">
              <span className="mono-tag">
                <TechIcon name="React" size={13} />
                <span>Full-Stack Development (React, Node.js, Express, MongoDB)</span>
              </span>
              <span className="mono-tag">
                <TechIcon name="PyTorch" size={13} />
                <span>Machine Learning & Deep Learning (PyTorch, OpenCV)</span>
              </span>
              <span className="mono-tag">
                <TechIcon name="OpenAI" size={13} />
                <span>Generative AI & LLM Systems</span>
              </span>
            </div>
          </div>
        </SpotlightCard>
      )}

      <style jsx>{`
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .exp-item-content {
          padding: 1.5rem;
          width: 100%;
        }
        .exp-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        .exp-role {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .exp-company {
          color: var(--accent-text);
          font-size: 0.9rem;
        }
        .exp-duration {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .exp-details {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
        }
        .open-box-content {
          padding: 2.25rem;
          width: 100%;
        }
        .open-header {
          margin-bottom: 1rem;
        }
        .open-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }
        .open-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.5rem;
          max-width: 800px;
        }
        .focus-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .mono-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 0.35rem 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }
        .mono-tag:hover {
          color: #fff;
          border-color: rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.08);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
