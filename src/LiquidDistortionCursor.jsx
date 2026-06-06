import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function LiquidDistortionCursor({
  radius = 200,
  distortionAmount = 25,
  baseFrequency = 0.015,
  speed = 8,
  zIndex = 9999
}) {
  const [position, setPosition] = useState({ x: -radius, y: -radius });
  const prefersReducedMotion = usePrefersReducedMotion();
  const requestRef = useRef();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      // Store latest coordinates
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReducedMotion]);

  // Unique ID so multiple instances don't clash
  const filterId = `liquid-distortion-filter-${Math.random().toString(36).substr(2, 9)}`;

  if (typeof window === 'undefined') return null;

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <filter id={filterId}>
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency={baseFrequency} 
            numOctaves="3" 
            result="noise"
          >
            {!prefersReducedMotion && (
              <animate 
                attributeName="baseFrequency" 
                dur={`${speed}s`} 
                values={`${baseFrequency};${baseFrequency * 1.5};${baseFrequency}`} 
                repeatCount="indefinite" 
              />
            )}
          </feTurbulence>
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={distortionAmount} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: radius,
          height: radius,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: `translate3d(${position.x - radius / 2}px, ${position.y - radius / 2}px, 0)`,
          backdropFilter: `url(#${filterId})`,
          WebkitBackdropFilter: `url(#${filterId})`,
          zIndex: zIndex,
          // Add a subtle border or glass tint so the boundary is slightly visible
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)'
        }}
      />
    </>
  );
}
