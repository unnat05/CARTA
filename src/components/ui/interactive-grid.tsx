'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {/* Animated Grid Lines */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"
        style={{
          x: useSpring(useMotionValue(0), { stiffness: 50 }),
          y: useSpring(useMotionValue(0), { stiffness: 50 }),
        }}
      />

      {/* Reactive Spotlight Glow */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full blur-[120px] opacity-10"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        }}
      />

      {/* Ambient Mesh Glows */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-emerald-600/5 blur-[150px]" />
    </div>
  );
};
