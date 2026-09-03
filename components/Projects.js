import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import BorderGlow from './BorderGlow';
import SpecularButton from './SpecularButton';

export default function Projects({ projectsData = [] }) {
  if (!projectsData || projectsData.length === 0) return null;

  return (
    <div>
      <div className="section-header">
        <span className="section-label">Selected Work</span>
        <h2 className="section-title">Engineering Projects</h2>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, idx) => (
          <BorderGlow
            key={idx}
            borderRadius={12}
            backgroundColor="#11141a"
            colors={['#38bdf8', '#818cf8', '#c084fc']}
            edgeSensitivity={30}
            glowRadius={35}
            glowIntensity={0.9}
            coneSpread={25}
          >
            <article className="project-card-content">
              {/* Top Bar */}
              <div className="project-top">
                <div>
                  <div className="title-row">
                    <h3 className="project-name">{project.Title}</h3>
                    <span className="project-date">{project.Duration}</span>
                  </div>
                  <p className="project-subtitle">{project.Subtitle}</p>
                </div>

                <div className="project-links">
                  {project.GithubLink && (
                    <SpecularButton
                      as="a"
                      href={project.GithubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="xs"
                      radius={6}
                      gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
                      aria-label="View Source Code"
                    >
                      <Github size={14} />
                      <span>Source</span>
                      <ArrowUpRight size={12} />
                    </SpecularButton>
                  )}
                  {project.LiveLink && (
                    <SpecularButton
                      as="a"
                      href={project.LiveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="xs"
                      radius={6}
                      gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
                      aria-label="View Live Project"
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </SpecularButton>
                  )}
                </div>
              </div>

              {/* Bullets */}
              {project.ParsedDescription?.description?.length > 0 && (
                <ul className="details-list">
                  {project.ParsedDescription.description.map((point, pIdx) => (
                    <li key={pIdx} className="detail-item">
                      <span className="bullet">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Learnings */}
              {project.ParsedDescription?.learning?.length > 0 && (
                <div className="learning-box">
                  <span className="learning-label">Technical Takeaways:</span>
                  <span className="learning-content">
                    {project.ParsedDescription.learning.join(' • ')}
                  </span>
                </div>
              )}

              {/* Tech Stack */}
              <div className="stack-wrap">
                {(project.Stack || []).map((tech, tIdx) => (
                  <span key={tIdx} className="mono-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </BorderGlow>
        ))}
      </div>

      <style jsx>{`
        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .project-card-content {
          padding: 2rem;
          width: 100%;
        }
        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .title-row {
          display: flex;
          align-items: baseline;
          gap: 0.85rem;
          margin-bottom: 0.3rem;
        }
        .project-name {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .project-date {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .project-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .project-links {
          display: flex;
          gap: 0.6rem;
        }
        .icon-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          background: var(--surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.15s ease;
        }
        .icon-link:hover {
          color: #fff;
          border-color: var(--border-active);
        }
        .details-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .bullet {
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .learning-box {
          background: rgba(255, 255, 255, 0.02);
          border-left: 2px solid var(--border-strong);
          padding: 0.65rem 1rem;
          border-radius: 0 6px 6px 0;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
        }
        .learning-label {
          font-weight: 600;
          color: var(--text-primary);
          margin-right: 0.5rem;
        }
        .learning-content {
          color: var(--text-secondary);
        }
        .stack-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
      `}</style>
    </div>
  );
}
