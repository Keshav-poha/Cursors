import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function ScrollCylinder({
  items = [],
  renderItem,
  mode = 'cylinder', // 'cylinder' | 'helix'
  radius = 200,
  scrollSensitivity = 0.5,
  gap = 40,
  containerHeight = '250vh',
  className = '',
  zIndex = 10
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate how far into the container we have scrolled.
      // When rect.top === 0, the container is at the top of the viewport.
      const scrollProgress = -rect.top;
      
      // Update rotation globally
      setRotation(scrollProgress * scrollSensitivity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion, scrollSensitivity]);

  const N = items.length;
  const angleStep = 360 / N;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: prefersReducedMotion ? 'auto' : containerHeight,
        zIndex: zIndex
      }}
    >
      <div
        style={{
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: prefersReducedMotion ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            // The entire cylinder rotates based on scroll
            transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * angleStep;
            const ty = mode === 'helix' ? (index - (N - 1) / 2) * gap : 0;
            
            // Calculate absolute angle to camera to compute fading and pointer-events
            const currentAbsoluteAngle = (rotation + itemAngle) % 360;
            let normalizedAngle = currentAbsoluteAngle;
            if (normalizedAngle > 180) normalizedAngle -= 360;
            if (normalizedAngle < -180) normalizedAngle += 360;
            const absDistance = Math.abs(normalizedAngle);

            // Hide cards that are rotated to the back
            const opacity = Math.max(0.1, 1 - (absDistance / 180));
            const isBehind = absDistance > 90;

            // Reduce motion fallback: display as a normal list
            if (prefersReducedMotion) {
              return (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  {renderItem ? renderItem(item, index, { isBehind: false, relativeZ: 1 }) : null}
                </div>
              );
            }

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translateY(${ty}px)`,
                  opacity: opacity,
                  pointerEvents: isBehind ? 'none' : 'auto', // only front items are clickable
                  transition: 'opacity 0.2s ease',
                  transformStyle: 'preserve-3d'
                }}
              >
                {renderItem ? renderItem(item, index, { isBehind, relativeZ: 1 - (absDistance / 180) }) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
