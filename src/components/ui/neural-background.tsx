'use client';

import { motion } from 'framer-motion';

export const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* SVG Filters for Gooey/Blur effects */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Morphing Blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-multiply filter blur-[80px]">
        <motion.div
           animate={{
             x: [0, 100, -50, 0],
             y: [0, -100, 50, 0],
             scale: [1, 1.2, 1, 0.9, 1],
           }}
           transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-500/40 rounded-full blur-3xl"
        />
        <motion.div
           animate={{
             x: [0, -150, 100, 0],
             y: [0, 100, -50, 0],
             scale: [1, 0.9, 1.1, 1],
           }}
           transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
           className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/30 rounded-full blur-3xl"
        />
        <motion.div
           animate={{
             x: [0, 80, -120, 0],
             y: [0, 150, -100, 0],
             scale: [1, 1.15, 0.85, 1],
           }}
           transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-[10%] left-[20%] w-[55%] h-[55%] bg-violet-500/30 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      {/* Neural Lines (Static dots for now, we'll animate them in the main hero if needed) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
    </div>
  );
};
