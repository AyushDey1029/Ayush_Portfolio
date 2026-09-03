export default function Skills({ skillsData = [] }) {
  if (!skillsData || skillsData.length === 0) return null;

  return (
    <section className="section animate-fade-in delay-200">
      <h2 className="section-title">Technical Expertise</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {skillsData.map((category, idx) => (
          <div key={idx} className="glass-card skill-card">
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              {category.Category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(category.ItemsList || []).map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  style={{
                    padding: '0.4rem 0.8rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                  className="skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .skill-tag:hover {
          background: rgba(88, 166, 255, 0.1) !important;
          border-color: var(--accent-color) !important;
          color: #fff;
        }
      `}</style>
    </section>
  );
}
