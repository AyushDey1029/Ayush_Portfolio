import { Mail, Phone, GraduationCap, Book, Star, Calendar } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const iconMap = {
  'mail': Mail,
  'linkedin': Linkedin,
  'github': Github,
  'phone': Phone,
  'graduation-cap': GraduationCap,
  'book': Book,
  'star': Star,
  'calendar': Calendar,
};

export default function Hero({ aboutData = [] }) {
  const introTexts = aboutData.filter(item => item.Category === 'Narrative').map(i => i.Value);
  const contacts = aboutData.filter(item => item.Category === 'Contact');
  const systemInfo = aboutData.filter(item => item.Category === 'SystemInfo');

  return (
    <section className="section hero-section animate-fade-in delay-100">
      <div className="glass-card" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <h1 className="section-title gradient-text" style={{ marginBottom: '1rem', fontSize: '3.5rem' }}>
          Ayush Dey
        </h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {contacts.map((contact, idx) => {
            const IconComponent = iconMap[contact.Icon];
            return (
              <a 
                key={idx} 
                href={contact.Href} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', transition: 'all 0.3s' }}
                className="contact-pill"
              >
                {IconComponent && <IconComponent size={18} />}
                <span>{contact.Value.replace('linkedin.com/in/', '').replace('github.com/', '')}</span>
              </a>
            );
          })}
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          {introTexts.map((text, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{text}</p>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
          {systemInfo.map((info, idx) => {
            const IconComponent = iconMap[info.Icon];
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                {IconComponent && <IconComponent size={24} color="var(--accent-color)" />}
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {info.Key}
                </span>
                <span style={{ fontWeight: '600' }}>{info.Value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .contact-pill:hover {
          background: rgba(88, 166, 255, 0.15) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(88, 166, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
