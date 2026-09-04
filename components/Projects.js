import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import TiltedCard from './TiltedCard';
import TechIcon from './TechIcon';
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
        {projectsData.map((project, idx) => {
          const liveUrl =
            project.LiveLink ||
            (project.Title?.toLowerCase().includes('fundconnect')
              ? 'https://fund-connect-ai-ux96.vercel.app/'
              : project.Title?.toLowerCase().includes('vernacular')
              ? 'https://vernacular-fd-advisor-revised-1029.vercel.app/'
              : null);

          const githubUrl =
            (project.GithubLink && !project.GithubLink.endsWith('AyushDey1029')
              ? project.GithubLink
              : null) ||
            (project.Title?.toLowerCase().includes('fundconnect')
              ? 'https://github.com/AyushDey1029/FundConnect_AI'
              : project.Title?.toLowerCase().includes('vernacular')
              ? 'https://github.com/AyushDey1029/vernacular_fd_advisor_revised_1029'
              : project.Title?.toLowerCase().includes('iot') || project.Title?.toLowerCase().includes('sensor') || project.Title?.toLowerCase().includes('autoencoder')
              ? 'https://github.com/AyushDey1029/iot-sensor-data-compression-autoencoder'
              : project.GithubLink);

          return (
            <TiltedCard
              key={idx}
              maxTilt={7}
              scale={1.01}
              borderRadius={16}
              glare={true}
              className="project-tilted-item"
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
                    {githubUrl && (
                      <SpecularButton
                        as="a"
                        href={githubUrl}
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
                    {liveUrl && (
                      <SpecularButton
                        as="a"
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="xs"
                        radius={6}
                        gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
                        aria-label={`View Live Demo for ${project.Title}`}
                      >
                        <ExternalLink size={13} />
                        <span>Live</span>
                        <ArrowUpRight size={12} />
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
                      <TechIcon name={tech} size={13} />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </article>
            </TiltedCard>
          );
        })}
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
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
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
          gap: 0.5rem;
        }
        .mono-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          padding: 0.3rem 0.68rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 7px;
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
