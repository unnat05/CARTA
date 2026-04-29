'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const PremiumCard = ({ children, className, glowColor = "rgba(16, 185, 129, 0.1)" }: PremiumCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative mouse position for 3D tilt
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);

    // Absolute mouse position for glow effect
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-3xl bg-white/40 backdrop-blur-md border border-primary/5 overflow-hidden transition-all duration-500",
        isHovered ? "shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-primary/20" : "shadow-sm",
        className
      )}
    >
      {/* Dynamic Glow Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) => `radial-gradient(600px circle at ${mx}px ${my}px, ${glowColor}, transparent 40%)`
          ),
        }}
      />

      {/* Decorative Border Beam */}
      {isHovered && (
        <div className="absolute inset-0 border-beam opacity-50" />
      )}

      {/* Content Layer (elevated for 3D effect) */}
      <div className="relative z-10 translate-z-10">
        {children}
      </div>
    </motion.div>
  );
};
