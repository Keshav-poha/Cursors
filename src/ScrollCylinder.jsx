import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function ScrollCylinder({
  items = [],
  renderItem,
  mode = 'cylinder', // 'cylinder' | 'helix'
  radius = 200,
  scrollSensitivity = 0.1, // Adjusted default for wheel delta
  gap = 40,
  damping = 0.1, // Damping factor for smooth scroll (0.1 = smooth, 1.0 = instant)
  containerHeight = '250vh', // height of the scrollable area for window/container mode
  viewportHeight = '100vh', // height of the visible sticky area
  scrollTarget = 'window', // 'window' | 'container' | 'wheel'
  className = '',
  zIndex = 10
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const requestRef = useRef();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateLoop = () => {
      // Lerp current rotation to target rotation
      const diff = targetRotation.current - currentRotation.current;
      currentRotation.current += diff * damping;
      
      setRotation(currentRotation.current);
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);

    if (scrollTarget === 'window') {
      const handleScroll = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        targetRotation.current = scrollProgress * scrollSensitivity;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    } else if (scrollTarget === 'wheel') {
      const handleWheel = (e) => {
        if (!containerRef.current) return;
        
        // Prevent default page scroll
        e.preventDefault();
        
        // Increment target rotation
        targetRotation.current += e.deltaY * scrollSensitivity;
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
      }
      return () => {
        if (container) {
          container.removeEventListener('wheel', handleWheel);
        }
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReducedMotion, scrollSensitivity, scrollTarget, damping]);

  const handleContainerScroll = (e) => {
    if (scrollTarget === 'container') {
      const scrollProgress = e.target.scrollTop;
      targetRotation.current = scrollProgress * scrollSensitivity;
    }
  };

  const N = items.length;
  const angleStep = 360 / N;

  const isWheel = scrollTarget === 'wheel';

  return (
    <div
      className={className}
      ref={containerRef}
      onScroll={handleContainerScroll}
      style={{
        position: 'relative',
        width: '100%',
        height: isWheel ? '100%' : (scrollTarget === 'container' ? viewportHeight : (prefersReducedMotion ? 'auto' : containerHeight)),
        overflowY: scrollTarget === 'container' ? 'auto' : 'hidden',
        overflowX: 'hidden',
        zIndex: zIndex
      }}
    >
      {/* Spacer to create scrollable height inside the container if needed */}
      {!isWheel && <div style={{ height: scrollTarget === 'container' ? containerHeight : '100%' }}>
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
              transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`
            }}
          >
            {items.map((item, index) => {
              const itemAngle = index * angleStep;
              const ty = mode === 'helix' ? (index - (N - 1) / 2) * gap : 0;
              
              const currentAbsoluteAngle = (rotation + itemAngle) % 360;
              let normalizedAngle = currentAbsoluteAngle;
              if (normalizedAngle > 180) normalizedAngle -= 360;
              if (normalizedAngle < -180) normalizedAngle += 360;
              const absDistance = Math.abs(normalizedAngle);

              const opacity = Math.max(0.1, 1 - (absDistance / 180));
              const isBehind = absDistance > 90;

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
                    pointerEvents: isBehind ? 'none' : 'auto',
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
      </div>}

      {isWheel && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
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
              transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`
            }}
          >
            {items.map((item, index) => {
              const itemAngle = index * angleStep;
              const ty = mode === 'helix' ? (index - (N - 1) / 2) * gap : 0;
              
              const currentAbsoluteAngle = (rotation + itemAngle) % 360;
              let normalizedAngle = currentAbsoluteAngle;
              if (normalizedAngle > 180) normalizedAngle -= 360;
              if (normalizedAngle < -180) normalizedAngle += 360;
              const absDistance = Math.abs(normalizedAngle);

              const opacity = Math.max(0.1, 1 - (absDistance / 180));
              const isBehind = absDistance > 90;

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translateY(${ty}px)`,
                    opacity: opacity,
                    pointerEvents: isBehind ? 'none' : 'auto',
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
      )}
    </div>
  );
}
