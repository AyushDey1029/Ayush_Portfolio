import { Briefcase, MessageCircle, Cpu, ExternalLink } from 'lucide-react';
import { Github } from './Icons';

const iconMap = {
  'briefcase': Briefcase,
  'message-circle': MessageCircle,
  'cpu': Cpu,
};

export default function Projects({ projectsData = [] }) {
  if (!projectsData || projectsData.length === 0) return null;

  return (
    <section className="section animate-fade-in delay-300">
      <h2 className="section-title">Featured Projects</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {projectsData.map((project, idx) => {
          const IconComponent = iconMap[project.Icon] || Briefcase;
          
          return (
            <div key={idx} className="glass-card project-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(88, 166, 255, 0.1)', borderRadius: '12px' }}>
                    <IconComponent size={32} color="var(--accent-color)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{project.Title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{project.Subtitle} | {project.Duration}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {project.GithubLink && (
                    <a href={project.GithubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={20} /> Code
                    </a>
                  )}
                  {project.LiveLink && (
                    <a href={project.LiveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={20} /> Live
                    </a>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                {project.ParsedDescription?.description?.length > 0 && (
                  <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                    {project.ParsedDescription.description.map((point, pIdx) => (
                      <li key={pIdx} style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{point}</li>
                    ))}
                  </ul>
                )}
                
                {project.ParsedDescription?.learning?.length > 0 && (
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Key Outcomes & Learnings:</strong>
                    <ul style={{ paddingLeft: '1.2rem', listStyleType: 'circle', color: 'var(--text-secondary)' }}>
                      {project.ParsedDescription.learning.map((point, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: '0.2rem' }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {(project.Stack || []).map((tech, tIdx) => (
                  <span key={tIdx} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(88, 166, 255, 0.1)', color: 'var(--accent-color)', borderRadius: '12px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        .project-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .project-link:hover {
          background: rgba(88, 166, 255, 0.2);
          color: #fff;
        }
      `}</style>
    </section>
  );
}
