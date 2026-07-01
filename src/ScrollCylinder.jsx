import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function ScrollCylinder({
  items = [],
  renderItem,
  mode = 'cylinder', // 'cylinder' | 'helix'
  radius = 200,
  scrollSensitivity = 0.5,
  gap = 40,
  containerHeight = '200vh',
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
      // When rect.top === 0, the container is exactly at the top of the viewport.
      const scrollProgress = -rect.top;
      
      // We only rotate if the container is currently in or above the viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setRotation(scrollProgress * scrollSensitivity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion, scrollSensitivity]);

  const N = items.length;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: prefersReducedMotion ? 'auto' : containerHeight,
        zIndex: zIndex
      }}
    >
      <div
        style={{
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: 0,
          height: prefersReducedMotion ? 'auto' : '100vh',
          width: '100%',
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
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d'
          }}
        >
          {items.map((item, index) => {
            const itemAngle = (index * (360 / N));
            const currentAngleRad = ((rotation + itemAngle) * Math.PI) / 180;
            
            const tx = Math.sin(currentAngleRad) * radius;
            const tz = Math.cos(currentAngleRad) * radius;
            const ty = mode === 'helix' ? (index - (N - 1) / 2) * gap : 0;
            
            // Calculate z-depth for scaling and opacity fading
            const relativeZ = tz / radius; // ranges from -1 to 1
            const scale = 0.7 + (relativeZ + 1) * 0.15; // scales down items in back
            const opacity = 0.3 + (relativeZ + 1) * 0.35; // fades items in back
            const isBehind = tz < 0;

            // Reduce motion fallback: display as a normal list
            if (prefersReducedMotion) {
              return (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  {renderItem ? renderItem(item, index) : null}
                </div>
              );
            }

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  transform: `translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale})`,
                  opacity: opacity,
                  pointerEvents: isBehind ? 'none' : 'auto', // only front items are clickable
                  transition: 'opacity 0.1s ease, transform 0.1s ease',
                  transformOrigin: 'center center',
                  zIndex: isBehind ? 1 : 10
                }}
              >
                {renderItem ? renderItem(item, index, { isBehind, relativeZ }) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
