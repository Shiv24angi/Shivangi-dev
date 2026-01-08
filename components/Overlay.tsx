
import React, { useState } from 'react';
import { Section, Project } from '../types';
import { PROJECTS, EXPERIENCES, ACHIEVEMENTS, SKILLS_CATEGORIES } from '../constants';
import { Github, Linkedin, Mail, Download, ExternalLink, ChevronRight, Menu, X, ArrowUpRight, Award, Briefcase, Code2, Layout, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OverlayProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  loading: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ currentSection, setSection, loading }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (loading) return null;

  const NavItem = ({ section, label }: { section: Section; label: string }) => (
    <button
      onClick={() => {
        setSection(section);
        setMobileMenuOpen(false);
      }}
      className={`transition-all duration-300 font-orbitron text-[9px] md:text-[10px] tracking-[0.2em] uppercase hover:text-pink-400 ${
        currentSection === section ? 'text-pink-500 font-bold border-b border-pink-500 pb-0.5' : 'text-gray-400'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff0080;
          border-radius: 10px;
        }
      `}</style>

      {/* Slim Navbar */}
      <header className="h-16 md:h-20 flex-shrink-0 flex justify-between items-center px-6 md:px-10 pointer-events-auto bg-gradient-to-b from-black/90 to-transparent z-[70]">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSection(Section.HERO)}>
          <div className="w-9 h-9 bg-pink-600 rounded-lg flex items-center justify-center font-orbitron font-bold text-lg shadow-[0_0_15px_rgba(255,0,128,0.4)] group-hover:scale-105 transition-all duration-300">
            S
          </div>
          <span className="font-orbitron tracking-tight text-xs hidden sm:block text-white font-black uppercase">Shivangi Sharma</span>
        </div>

        <div className="hidden lg:flex gap-6 xl:gap-10">
          <NavItem section={Section.HERO} label="Nexus" />
          <NavItem section={Section.ABOUT} label="Bio" />
          <NavItem section={Section.SKILLS} label="Tech" />
          <NavItem section={Section.PROJECTS} label="Work" />
          <NavItem section={Section.EXPERIENCE} label="Journey" />
          <NavItem section={Section.ACHIEVEMENTS} label="Glory" />
          <NavItem section={Section.CONTACT} label="Connect" />
        </div>

        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-pink-500 transition-colors pointer-events-auto p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 pointer-events-auto z-[80]"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white">
              <X size={32} />
            </button>
            <NavItem section={Section.HERO} label="Nexus" />
            <NavItem section={Section.ABOUT} label="Bio" />
            <NavItem section={Section.SKILLS} label="Tech" />
            <NavItem section={Section.PROJECTS} label="Work" />
            <NavItem section={Section.EXPERIENCE} label="Journey" />
            <NavItem section={Section.ACHIEVEMENTS} label="Glory" />
            <NavItem section={Section.CONTACT} label="Connect" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8 pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-zinc-950/95 border border-pink-500/20 w-full max-w-6xl h-[85vh] md:h-[80vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-3 bg-black/80 hover:bg-pink-600/30 rounded-full text-white transition-all border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-3/5 h-[35%] md:h-full relative overflow-hidden">
                {selectedProject.image ? (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <Code2 size={80} className="text-white/5" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-3xl md:text-5xl font-black font-orbitron mb-4 text-white uppercase italic leading-none">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-pink-600/20 border border-pink-500/30 rounded-full text-[9px] font-black uppercase text-pink-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-black text-[9px] uppercase shadow-xl hover:bg-pink-500 hover:text-white transition-all">
                        <Github size={14} /> Code
                      </a>
                    )}
                    {selectedProject.link && (
                      <a href={selectedProject.link} target="_blank" className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white rounded-full font-black text-[9px] uppercase shadow-xl hover:bg-pink-700 transition-all">
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col bg-zinc-900/10">
                <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light italic">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>
                {selectedProject.features && (
                  <ul className="space-y-3">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-gray-400 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-1 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - Constrained to fit between slim header/footer */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden z-[10]">
        <AnimatePresence mode="wait">
          {currentSection === Section.HERO && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              className="max-w-4xl text-center pointer-events-auto"
            >
              <h1 className="text-4xl md:text-[6.5rem] lg:text-[8.5rem] font-black mb-4 md:mb-6 tracking-tight font-orbitron bg-gradient-to-b from-white via-white to-pink-500 bg-clip-text text-transparent leading-[0.9] italic px-4">
                SHIVANGI<br/>SHARMA
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-gray-400 font-light tracking-[0.2em] mb-8 md:mb-10 max-w-3xl mx-auto uppercase">
                <span className="text-white font-black border-b border-pink-500/50 pb-0.5">CS Engineer</span> // Developer // AI
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
                <button 
                  onClick={() => setSection(Section.PROJECTS)}
                  className="px-8 py-3.5 bg-pink-600 hover:bg-pink-700 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all group shadow-lg"
                >
                  Explore Work
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <a 
                  href="resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
                >
                  <Download size={18} /> Resume
                </a>
              </div>
            </motion.div>
          )}

          {currentSection === Section.ABOUT && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-5xl w-full pointer-events-auto bg-zinc-950/60 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-pink-500/10 shadow-2xl overflow-y-auto max-h-[72vh] custom-scrollbar"
            >
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                  <div className="w-full aspect-[3/4] bg-zinc-900 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group shadow-[0_0_30px_rgba(255,0,128,0.3)] border border-pink-500/20">
                     <img 
                       src="shivangi.jpg" 
                       alt="Shivangi Sharma"
                       className="w-full h-full object-cover object-top filter brightness-90 group-hover:brightness-100 transition-all duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 font-orbitron uppercase tracking-tighter italic">MY <span className="text-pink-500">STORY</span></h2>
                  <div className="space-y-4 text-gray-200 leading-relaxed text-sm md:text-base font-light">
                    <p>
                      Hello, I’m <span className="text-white font-black italic border-b border-pink-500">Shivangi Sharma</span>, a B.Tech CS student at <span className="text-pink-400 font-bold">Amity University</span>.
                    </p>
                    <p>
                      Specializing in <span className="text-white font-bold">Full-Stack Architecture</span> and AI/ML, I have a proven track record of developing scalable applications that bridge data and user interaction.
                    </p>
                    <p>
                      My core focus is on creating software that isn't just functional, but high-impact and visually superior.
                    </p>
                    <div className="pt-4 flex flex-wrap gap-3">
                       <div className="flex items-center gap-2 px-4 py-2 bg-pink-600/10 border border-pink-500/20 rounded-xl text-[9px] font-black text-pink-400 uppercase tracking-widest">
                          <Code2 size={14} /> Developer
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 bg-pink-600/10 border border-pink-500/20 rounded-xl text-[9px] font-black text-pink-400 uppercase tracking-widest">
                          <Cpu size={14} /> AI/ML
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === Section.SKILLS && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pointer-events-auto max-w-6xl w-full h-[62vh] overflow-y-auto custom-scrollbar p-2"
            >
              {SKILLS_CATEGORIES.map((cat, idx) => (
                <div key={cat.name} className="p-8 bg-zinc-950/80 border border-pink-500/10 rounded-[2.5rem] backdrop-blur-3xl hover:border-pink-500/40 transition-all duration-500 group">
                  <h3 className="text-pink-500 font-orbitron text-[9px] font-black tracking-[0.3em] uppercase mb-6 italic">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 hover:text-white hover:bg-pink-600/20 hover:border-pink-500/30 transition-all cursor-default uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {currentSection === Section.PROJECTS && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-[95vw] pointer-events-auto overflow-x-auto pt-16 pb-8 flex gap-8 scrollbar-hide px-8 items-start h-[75vh]"
            >
              {PROJECTS.map((proj) => (
                <div 
                  key={proj.id} 
                  className="min-w-[280px] md:min-w-[420px] bg-zinc-950/70 backdrop-blur-3xl border border-pink-500/10 rounded-[2.5rem] flex flex-col hover:border-pink-500/40 transition-all duration-500 group overflow-hidden shadow-xl transform hover:-translate-y-4"
                >
                  <div className="h-56 overflow-hidden relative">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        <Code2 size={40} className="text-pink-500/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 backdrop-blur-xs">
                       <button 
                         onClick={() => setSelectedProject(proj)}
                         className="px-8 py-3 bg-white text-black rounded-full font-black text-[9px] uppercase tracking-[0.2em] shadow-xl hover:bg-pink-500 hover:text-white transition-all"
                       >
                         Case Study
                       </button>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-lg font-black font-orbitron mb-2 text-white uppercase italic tracking-tighter group-hover:text-pink-500 transition-colors">{proj.title}</h3>
                    <p className="text-gray-400 text-xs mb-6 flex-1 line-clamp-2 leading-relaxed font-light">
                      {proj.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-pink-500/10 pt-4">
                      <div className="flex gap-2">
                        {proj.tech.slice(0, 3).map(t => (
                          <span key={t} className="w-2 h-2 rounded-full bg-pink-500/30" title={t}></span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {proj.github && <a href={proj.github} target="_blank" className="text-gray-500 hover:text-white transition-colors"><Github size={16} /></a>}
                        {proj.link && <a href={proj.link} target="_blank" className="text-gray-500 hover:text-pink-500 transition-colors"><ExternalLink size={16} /></a>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {currentSection === Section.EXPERIENCE && (
            <motion.div
              key="exp"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl w-full pointer-events-auto h-[65vh] overflow-y-auto custom-scrollbar p-2"
            >
              <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase italic mb-10">JOURNEY</h2>
              <div className="space-y-8">
                {EXPERIENCES.map((item) => (
                  <div key={item.id} className="relative pl-10 border-l-2 border-pink-500/20 bg-zinc-950/60 p-8 rounded-[2.5rem] border border-pink-500/10 backdrop-blur-3xl group hover:border-pink-500/40 transition-all">
                    <div className="absolute left-[-9px] top-8 w-4 h-4 rounded-full bg-black border-2 border-pink-600 shadow-[0_0_10px_#ff0080]"></div>
                    <div className="mb-1 text-pink-500 font-orbitron text-[9px] font-black tracking-[0.3em] uppercase">{item.date}</div>
                    <h3 className="text-xl font-black text-white mb-1 uppercase italic">{item.title}</h3>
                    <p className="text-gray-400 font-bold mb-6 text-xs tracking-[0.2em] uppercase italic opacity-70">{item.company}</p>
                    <ul className="space-y-3">
                      {item.details.map((d, i) => (
                        <li key={i} className="text-xs text-gray-200 flex items-start gap-3">
                          <span className="text-pink-500">»</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentSection === Section.ACHIEVEMENTS && (
            <motion.div
              key="ach"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-5xl w-full pointer-events-auto h-[65vh] overflow-y-auto custom-scrollbar p-2"
            >
              <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase italic mb-10">GLORY</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ACHIEVEMENTS.map((item) => (
                  <div key={item.id} className="p-8 bg-zinc-950/80 border border-pink-500/10 rounded-[2.5rem] hover:bg-pink-600/5 transition-all group shadow-lg">
                    <div className="text-[9px] font-orbitron text-pink-500 mb-3 font-black tracking-[0.3em] uppercase">{item.date}</div>
                    <h3 className="text-lg font-black text-white mb-2 uppercase italic tracking-tighter leading-tight">{item.title}</h3>
                    <div className="text-xs text-pink-500/70 font-black uppercase mb-4 opacity-90">{item.event}</div>
                    <p className="text-[12px] text-gray-400 font-light italic border-l border-pink-500/40 pl-4">{item.result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentSection === Section.CONTACT && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-xl w-full pointer-events-auto bg-zinc-950/80 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-pink-500/20 shadow-2xl text-center relative overflow-hidden group"
            >
              <h2 className="text-4xl font-black font-orbitron mb-4 uppercase italic">SYNC</h2>
              <p className="text-gray-400 mb-10 text-[9px] uppercase tracking-[0.4em] font-black opacity-60">Professional Terminal v2.5</p>
              
              <div className="flex flex-col gap-3 text-left">
                {[
                  { icon: Mail, label: 'Secure Terminal', val: 'shivangidps40@gmail.com', href: 'mailto:shivangidps40@gmail.com' },
                  { icon: Linkedin, label: 'Neural Network', val: 'shivangi-sharma2405', href: 'https://linkedin.com/in/shivangi-sharma2405/' },
                  { icon: Github, label: 'Open Protocol', val: 'Shiv24angi', href: 'https://github.com/Shiv24angi' }
                ].map(item => (
                  <a key={item.label} href={item.href} target="_blank" className="flex items-center gap-5 p-5 bg-white/5 hover:bg-pink-600/10 border border-pink-500/10 rounded-[2rem] transition-all duration-500 group/link relative overflow-hidden">
                    <div className="w-10 h-10 bg-pink-500/15 flex items-center justify-center rounded-xl text-pink-500 group-hover/link:bg-pink-500 group-hover/link:text-white transition-all">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="text-[8px] text-gray-500 uppercase font-black tracking-[0.3em] mb-1">{item.label}</div>
                      <div className="text-sm font-black text-gray-100 uppercase tracking-tighter">{item.val}</div>
                    </div>
                    <ArrowUpRight size={20} className="absolute right-6 opacity-0 group-hover/link:opacity-100 transition-opacity text-pink-500" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Slim Footer */}
      <footer className="h-16 md:h-20 flex-shrink-0 flex justify-between items-center px-6 md:px-10 pointer-events-none bg-gradient-to-t from-black/80 to-transparent z-[70]">
        <div className="pointer-events-auto flex items-center gap-6">
          <div className="flex gap-4 text-zinc-600">
            <a href="https://github.com/Shiv24angi" target="_blank" className="hover:text-pink-500 transition-all transform hover:scale-125"><Github size={18} /></a>
            <a href="https://linkedin.com/in/shivangi-sharma2405/" target="_blank" className="hover:text-pink-500 transition-all transform hover:scale-125"><Linkedin size={18} /></a>
          </div>
          <p className="text-[8px] font-orbitron tracking-[0.4em] text-zinc-800 uppercase font-black hidden md:block">Architecture // Shivangi Sharma © 2025</p>
        </div>

        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex gap-2 h-6 items-center">
            {Object.values(Section).map((s) => (
              <div 
                key={s}
                className={`w-1 transition-all duration-700 rounded-full cursor-pointer ${currentSection === s ? 'bg-pink-500 h-6 shadow-[0_0_15px_#ff0080]' : 'bg-zinc-900 h-2 hover:bg-zinc-700'}`}
                onClick={() => setSection(s)}
              ></div>
            ))}
          </div>
          <span className="text-[9px] font-orbitron font-black text-zinc-900 uppercase tracking-[0.3em] hidden sm:block">Core Status</span>
        </div>
      </footer>
    </div>
  );
};

export default Overlay;
