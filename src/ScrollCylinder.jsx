import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function ScrollCylinder({
  items = [],
  renderItem,
  mode = 'cylinder', // 'cylinder' | 'helix'
  radius = 200,
  scrollSensitivity = 0.5,
  gap = 40,
  containerHeight = '250vh', // height of the scrollable area
  viewportHeight = '100vh', // height of the visible sticky area when scrollTarget is 'container'
  scrollTarget = 'window', // 'window' | 'container'
  className = '',
  zIndex = 10
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || scrollTarget !== 'window') return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top;
      setRotation(scrollProgress * scrollSensitivity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion, scrollSensitivity, scrollTarget]);

  const handleContainerScroll = (e) => {
    if (scrollTarget === 'container') {
      const scrollProgress = e.target.scrollTop;
      setRotation(scrollProgress * scrollSensitivity);
    }
  };

  const N = items.length;
  const angleStep = 360 / N;

  return (
    <div
      className={className}
      ref={containerRef}
      onScroll={handleContainerScroll}
      style={{
        position: 'relative',
        width: '100%',
        height: scrollTarget === 'container' ? viewportHeight : (prefersReducedMotion ? 'auto' : containerHeight),
        overflowY: scrollTarget === 'container' ? 'auto' : 'visible',
        overflowX: 'hidden',
        zIndex: zIndex
      }}
    >
      {/* Spacer to create scrollable height inside the container if needed */}
      <div style={{ height: scrollTarget === 'container' ? containerHeight : '100%' }}>
        <div
          style={{
            position: prefersReducedMotion ? 'relative' : 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: prefersReducedMotion ? 'auto' : (scrollTarget === 'container' ? viewportHeight : '100vh'),
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
    </div>
  );
}
