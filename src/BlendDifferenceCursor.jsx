import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function BlendDifferenceCursor({
  radius = 20,
  damping = 0.2,
  zIndex = 9999
}) {
  const [position, setPosition] = useState({ x: -radius * 2, y: -radius * 2 });
  const targetPos = useRef({ x: -radius * 2, y: -radius * 2 });
  const currentPos = useRef({ x: -radius * 2, y: -radius * 2 });
  const requestRef = useRef();
  
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateLoop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * damping;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * damping;
      
      setPosition({ x: currentPos.current.x, y: currentPos.current.y });
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReducedMotion, damping]);

  if (typeof window === 'undefined') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        transform: `translate3d(${position.x - radius}px, ${position.y - radius}px, 0)`,
        zIndex: zIndex
      }}
    />
  );
}
