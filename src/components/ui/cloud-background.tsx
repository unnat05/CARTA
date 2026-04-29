'use client';

import { motion } from 'framer-motion';

export const CloudBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Dynamic Ambient Glow 1 */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] -left-[10%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[150px] opacity-40"
      />
      
      {/* Dynamic Ambient Glow 2 */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] -right-[15%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-emerald-500/5 to-transparent blur-[150px] opacity-30"
      />

      {/* Dynamic Ambient Glow 3 */}
      <motion.div
        animate={{
          x: [100, 0, 100],
          y: [50, 0, 50],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[15%] left-[10%] h-[75%] w-[75%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-[150px] opacity-20"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
