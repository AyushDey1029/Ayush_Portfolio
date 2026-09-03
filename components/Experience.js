import React from 'react';
import { Briefcase } from 'lucide-react';

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
            <div key={idx} className="exp-item">
              <div className="exp-top">
                <div>
                  <h3 className="exp-role">{exp.Role}</h3>
                  <p className="exp-company">{exp.Company}</p>
                </div>
                <span className="exp-duration">{exp.Duration}</span>
              </div>
              {exp.Details && <p className="exp-details">{exp.Details}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="open-box">
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
            <span className="mono-tag">Full-Stack Development (React, Node.js, Express, MongoDB)</span>
            <span className="mono-tag">Machine Learning & Deep Learning (PyTorch, OpenCV)</span>
            <span className="mono-tag">Generative AI & LLM Systems</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .exp-item {
          background: var(--surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 1.5rem;
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
        .open-box {
          background: var(--surface-1);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 2.25rem;
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
      `}</style>
    </div>
  );
}
