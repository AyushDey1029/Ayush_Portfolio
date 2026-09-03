'use client';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Training from './Training';
import Certifications from './Certifications';
import Education from './Education';
import Experience from './Experience';
import Chatbot from './Chatbot';
import RevealOnScroll from './RevealOnScroll';
import UnifiedLanyard from './UnifiedLanyard';

export default function PortfolioClient({ data }) {
  const [contentVisible, setContentVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* The single full-page 3D Lanyard component */}
      <UnifiedLanyard onSlideStart={() => setContentVisible(true)} />

      <Navbar onOpenChat={() => setIsChatOpen(true)} />

      <main className="container">
        <section id="about">
          <Hero aboutData={data.About} contentVisible={contentVisible} />
        </section>

        <section id="skills" className="section">
          <RevealOnScroll threshold={0.1}>
            <Skills skillsData={data.Skills} />
          </RevealOnScroll>
        </section>

        <section id="projects" className="section">
          <RevealOnScroll threshold={0.08}>
            <Projects projectsData={data.Projects} />
          </RevealOnScroll>
        </section>

        <section id="training" className="section">
          <RevealOnScroll threshold={0.1}>
            <Training trainingData={data.Training} />
          </RevealOnScroll>
        </section>

        <section id="certifications" className="section">
          <RevealOnScroll threshold={0.1}>
            <Certifications
              certificationsData={data.Certifications}
              achievementsData={data.Achievements}
            />
          </RevealOnScroll>
        </section>

        <section id="education" className="section">
          <RevealOnScroll threshold={0.1}>
            <Education educationData={data.Education} />
          </RevealOnScroll>
        </section>

        <section id="experience" className="section">
          <RevealOnScroll threshold={0.1}>
            <Experience experienceData={data.Experience} />
          </RevealOnScroll>
        </section>

        <footer style={{
          padding: '4rem 0',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Ayush Dey</p>
            <p>Full-Stack Engineer & AI Researcher</p>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)' }}>Data-driven via Excel & Next.js</p>
        </footer>
      </main>

      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </>
  );
}
