'use client';
import React, { useState, useEffect } from 'react';
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
import GhostFibers from './GhostFibers';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import Footer from './Footer';

export default function PortfolioClient({ data }) {
  const [contentVisible, setContentVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {/* GhostFibers dynamic fiber background */}
      <div className="ghost-fibers-bg" aria-hidden="true">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
        />
      </div>

      {/* The single full-page 3D Lanyard component */}
      <UnifiedLanyard onSlideStart={() => setContentVisible(true)} />

      {/* Top Sticky Navbar at z-index: 100 so 3D band passes cleanly behind it */}
      <div className={`portfolio-navbar-wrap ${contentVisible ? 'visible' : 'hidden-during-intro'}`}>
        <Navbar onOpenChat={() => setIsChatOpen(true)} />
      </div>

      <div className={`portfolio-content-wrap ${contentVisible ? 'visible' : 'hidden-during-intro'}`}>
        <main className="container">
        <section id="about">
          <Hero aboutData={data.About} contentVisible={contentVisible} />
        </section>

        <ScrollStack
          useWindowScroll={true}
          stackPosition="12%"
          scaleEndPosition="5%"
          baseScale={0.92}
          itemScale={0.012}
          itemStackDistance={20}
          itemDistance={45}
          blurAmount={0.6}
        >
          <ScrollStackItem>
            <section id="skills" className="section">
              <RevealOnScroll threshold={0.1}>
                <Skills skillsData={data.Skills} />
              </RevealOnScroll>
            </section>
          </ScrollStackItem>

          <ScrollStackItem>
            <section id="projects" className="section">
              <RevealOnScroll threshold={0.08}>
                <Projects projectsData={data.Projects} />
              </RevealOnScroll>
            </section>
          </ScrollStackItem>

          <ScrollStackItem>
            <section id="training" className="section">
              <RevealOnScroll threshold={0.1}>
                <Training trainingData={data.Training} />
              </RevealOnScroll>
            </section>
          </ScrollStackItem>

          <ScrollStackItem>
            <section id="certifications" className="section">
              <RevealOnScroll threshold={0.1}>
                <Certifications
                  certificationsData={data.Certifications}
                  achievementsData={data.Achievements}
                />
              </RevealOnScroll>
            </section>
          </ScrollStackItem>

          <ScrollStackItem>
            <section id="education" className="section">
              <RevealOnScroll threshold={0.1}>
                <Education educationData={data.Education} />
              </RevealOnScroll>
            </section>
          </ScrollStackItem>

          <ScrollStackItem>
            <section id="experience" className="section">
              <RevealOnScroll threshold={0.1}>
                <Experience experienceData={data.Experience} />
              </RevealOnScroll>
            </section>
          </ScrollStackItem>
        </ScrollStack>

        <Footer aboutData={data.About} />
      </main>
      </div>

      {contentVisible && (
        <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} contentVisible={contentVisible} />
      )}
    </>
  );
}
