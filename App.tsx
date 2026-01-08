
import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import Loader from './components/Loader';
import { Section } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HERO);
  const [loading, setLoading] = useState(true);

  const sections = [
    Section.HERO, 
    Section.ABOUT, 
    Section.SKILLS, 
    Section.PROJECTS, 
    Section.EXPERIENCE, 
    Section.ACHIEVEMENTS,
    Section.CONTACT
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const index = sections.indexOf(currentSection);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = sections[(index + 1) % sections.length];
        setCurrentSection(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = sections[(index - 1 + sections.length) % sections.length];
        setCurrentSection(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, sections]);

  // Handle scroll (throttled)
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThreshold = 1000; // ms

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) return;

      const index = sections.indexOf(currentSection);
      
      if (e.deltaY > 50) { // Scrolling down
        if (index < sections.length - 1) {
          setCurrentSection(sections[index + 1]);
          lastScrollTime = now;
        }
      } else if (e.deltaY < -50) { // Scrolling up
        if (index > 0) {
          setCurrentSection(sections[index - 1]);
          lastScrollTime = now;
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, sections]);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Scene currentSection={currentSection} />
            <Overlay 
              currentSection={currentSection} 
              setSection={setCurrentSection} 
              loading={loading}
            />
            
            {/* Ambient VFX - Scanlines with Pink Tint */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,128,0.1),rgba(0,0,0,0.02),rgba(255,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            
            {/* Vignette for depth */}
            <div className="fixed inset-0 pointer-events-none z-[101] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
