
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const messages = [
    "Establishing Nexus Connection...",
    "Calibrating Neural Sync...",
    "Deploying Creative Modules...",
    "Synchronizing Persona...",
    "Rendering Digital Space...",
    "Nexus Active."
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      } else {
        setProgress(currentProgress);
      }
    }, 120);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-black to-black opacity-50"></div>
      
      <div className="w-full max-w-sm md:max-w-xl relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <span className="text-pink-500 font-orbitron text-[11px] font-black tracking-[0.6em] uppercase mb-2">System Authority</span>
            <div className="text-white font-orbitron text-lg md:text-2xl font-black italic tracking-tighter h-10">
              {messages[textIndex]}
            </div>
          </div>
          <div className="text-pink-400 font-orbitron text-4xl font-black italic">
            {Math.round(progress)}<span className="text-sm not-italic opacity-50">%</span>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5 p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-700 to-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.8)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-pink-500/20 rounded-full border border-pink-500/30"
              animate={{ 
                scale: [1, 1.8, 1],
                backgroundColor: ["#db2777", "#ff0080", "#db2777"],
                boxShadow: ["0 0 0px rgba(255,0,128,0)", "0 0 15px rgba(255,0,128,0.8)", "0 0 0px rgba(255,0,128,0)"]
              }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 text-[10px] text-zinc-800 font-orbitron font-black tracking-[0.8em] uppercase opacity-40">
        Protocol S_SHARMA // Global Environment // v2.1.0
      </div>
    </motion.div>
  );
};

export default Loader;
