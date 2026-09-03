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
import { Heart } from 'lucide-react';

export default function PortfolioClient({ data }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      <div className="portfolio-content">
        <div id="about">
          <Hero aboutData={data.About} />
        </div>

        <div id="skills">
          <Skills skillsData={data.Skills} />
        </div>

        <div id="projects">
          <Projects projectsData={data.Projects} />
        </div>

        <div id="training">
          <Training trainingData={data.Training} />
        </div>

        <div id="certifications">
          <Certifications 
            certificationsData={data.Certifications} 
            achievementsData={data.Achievements} 
          />
        </div>

        <div id="education">
          <Education educationData={data.Education} />
        </div>

        <div id="experience">
          <Experience experienceData={data.Experience} />
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
    </>
  );
}
