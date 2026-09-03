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

export default function PortfolioClient({ data }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Immersive Ambient Glow Orbs */}
      <div className="ambient-glow orb-1" />
      <div className="ambient-glow orb-2" />
      <div className="ambient-glow orb-3" />

      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      <div className="portfolio-content">
        <div id="about">
          <RevealOnScroll threshold={0.1}>
            <Hero aboutData={data.About} />
          </RevealOnScroll>
        </div>

        <div id="skills">
          <RevealOnScroll threshold={0.15}>
            <Skills skillsData={data.Skills} />
          </RevealOnScroll>
        </div>

        <div id="projects">
          <RevealOnScroll threshold={0.1}>
            <Projects projectsData={data.Projects} />
          </RevealOnScroll>
        </div>

        <div id="training">
          <RevealOnScroll threshold={0.15}>
            <Training trainingData={data.Training} />
          </RevealOnScroll>
        </div>

        <div id="certifications">
          <RevealOnScroll threshold={0.15}>
            <Certifications 
              certificationsData={data.Certifications} 
              achievementsData={data.Achievements} 
            />
          </RevealOnScroll>
        </div>

        <div id="education">
          <RevealOnScroll threshold={0.15}>
            <Education educationData={data.Education} />
          </RevealOnScroll>
        </div>

        <div id="experience">
          <RevealOnScroll threshold={0.15}>
            <Experience experienceData={data.Experience} />
          </RevealOnScroll>
        </div>

        <footer style={{
          textAlign: 'center',
          padding: '3rem 0 5rem 0',
          borderTop: '1px solid var(--border-color)',
          marginTop: '4rem',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Built with Next.js, Vanilla CSS & Google Gemini RAG
          </p>
          <p>© {new Date().getFullYear()} Ayush Dey. All rights reserved.</p>
        </footer>
      </div>

      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <style jsx>{`
        .ambient-glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.25;
        }
        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #2563eb, transparent 70%);
          top: 10%;
          left: -100px;
        }
        .orb-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #7c3aed, transparent 70%);
          top: 45%;
          right: -150px;
        }
        .orb-3 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #0ea5e9, transparent 70%);
          bottom: 10%;
          left: 10%;
        }
        .portfolio-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
