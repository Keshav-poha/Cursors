import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function GhostCursor({
  radius = 12,
  ghosts = 4,
  color = '#ffffff',
  zIndex = 9999
}) {
  const [positions, setPositions] = useState(Array(ghosts).fill({ x: -radius * 2, y: -radius * 2 }));
  const targetPos = useRef({ x: -radius * 2, y: -radius * 2 });
  const currentPositions = useRef(Array(ghosts).fill({ x: -radius * 2, y: -radius * 2 }));
  const requestRef = useRef();
  
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateLoop = () => {
      const newPositions = currentPositions.current.map((pos, index) => {
        // Decreasing damping for older ghosts (creates the trailing effect)
        // e.g., Ghost 0 has damping 0.3, Ghost 1 has 0.2, Ghost 2 has 0.15...
        const damping = 0.3 * Math.pow(0.7, index);
        
        return {
          x: pos.x + (targetPos.current.x - pos.x) * damping,
          y: pos.y + (targetPos.current.y - pos.y) * damping
        };
      });

      currentPositions.current = newPositions;
      setPositions(newPositions);
      
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReducedMotion, ghosts]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {!prefersReducedMotion && positions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            backgroundColor: color,
            pointerEvents: 'none',
            transform: `translate3d(${pos.x - radius}px, ${pos.y - radius}px, 0) scale(${1 - (index * (0.8 / ghosts))})`,
            zIndex: zIndex - index,
            opacity: 1 - (index / ghosts),
          }}
        />
      ))}
    </>
  );
}
