import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

const DEFAULT_ITEMS = [
  { name: 'ORANGUTAN', logo: '/content/LOGOs/OG.png' },
  { name: 'VALORANT', logo: '/content/LOGOs/Riot_Games-Logo.wine.png' },
  { name: 'VADILAL', logo: '/content/LOGOs/Vadilal_Logo.svg' },
  { name: 'iQOO', logo: '/content/LOGOs/iqoo.png' },
  { name: 'CLOUD9', logo: '/content/LOGOs/Cloud9 Energy Drink Logo.png' },
  { name: 'CYBERPOWER', logo: '/content/LOGOs/image.png' },
  { name: 'AMAZON', logo: '/content/LOGOs/Amazon_miniTV_Logo.png' },
  { name: 'MOK', logo: '/content/LOGOs/Mic On Kar.png' },
  { name: 'APECITY', logo: '/content/LOGOs/ApeCity_Logo_PNG_Stroke.png' },
  { name: 'BTL', logo: '/content/LOGOs/Bombaytimes.png' }
];

export function CylinderHelixCursor({
  items = DEFAULT_ITEMS,
  mode = 'cylinder', // 'cylinder' | 'helix'
  radius = 80,
  rotationSpeed = 1.5,
  gap = 22,
  itemSize = 38,
  damping = 0.12,
  interactive = true,
  glowColor = 'rgba(217, 4, 41, 0.4)',
  showCenterDot = true,
  centerDotSize = 6,
  zIndex = 99999
}) {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isClicking, setIsClicking] = useState(false);
  
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  
  // Animation state refs for zero-render loop updates
  const rotationAngle = useRef(0);
  const currentRadius = useRef(radius);
  const currentSpeed = useRef(rotationSpeed);
  const currentGap = useRef(gap);
  
  const requestRef = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Track image load errors to fall back to text
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (name) => {
    setFailedImages(prev => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial positioning on first move
    const handleFirstMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      currentPos.current = { x: e.clientX, y: e.clientY };
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    const updateLoop = () => {
      // Lerp custom cursor coordinates
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * damping;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * damping;

      // Handle interactive expansions
      const radiusTarget = isClicking && interactive ? radius * 1.4 : radius;
      const speedTarget = isClicking && interactive ? rotationSpeed * 2.8 : rotationSpeed;
      const gapTarget = isClicking && interactive ? gap * 1.5 : gap;

      currentRadius.current += (radiusTarget - currentRadius.current) * 0.15;
      currentSpeed.current += (speedTarget - currentSpeed.current) * 0.15;
      currentGap.current += (gapTarget - currentGap.current) * 0.15;

      // Increment rotation
      rotationAngle.current += currentSpeed.current;

      setPosition({ x: currentPos.current.x, y: currentPos.current.y });
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleFirstMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [prefersReducedMotion, damping, radius, rotationSpeed, gap, isClicking, interactive]);

  if (typeof window === 'undefined' || prefersReducedMotion) return null;

  const N = items.length;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: zIndex,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Center Anchor Pointer Dot */}
      {showCenterDot && (
        <div
          style={{
            width: centerDotSize,
            height: centerDotSize,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
            transform: 'translate3d(-50%, -50%, 0)',
            position: 'absolute'
          }}
        />
      )}

      {/* Orbiting Cylinder/Helix Items */}
      {items.map((item, index) => {
        const itemAngle = (index * (360 / N));
        
        // Compute transforms for 3D depth and rotation
        const currentAngleRad = ((rotationAngle.current + itemAngle) * Math.PI) / 180;
        
        const tx = Math.sin(currentAngleRad) * currentRadius.current;
        const tz = Math.cos(currentAngleRad) * currentRadius.current;
        const ty = mode === 'helix' ? (index - (N - 1) / 2) * currentGap.current : 0;

        // Front depth maps (tz goes from -radius to +radius)
        // Nearer items are larger and fully visible, farther items fade away
        const relativeZ = tz / radius; // -1 to 1
        const scale = 0.7 + (relativeZ + 1) * 0.25; // ranges ~0.7 to ~1.2
        const opacity = 0.2 + (relativeZ + 1) * 0.35; // ranges ~0.2 to ~0.9
        const isBehind = tz < 0;

        // Visual fallback for missing image
        const hasFailedImg = failedImages[item.name] || !item.logo;
        const firstLetter = item.name ? item.name.charAt(0).toUpperCase() : '?';

        return (
          <div
            key={`${item.name || index}-${index}`}
            style={{
              position: 'absolute',
              width: itemSize,
              height: itemSize,
              borderRadius: '50%',
              backgroundColor: 'rgba(12, 12, 12, 0.75)',
              border: isBehind 
                ? '1px solid rgba(255, 255, 255, 0.05)'
                : `1px solid ${glowColor}`,
              boxShadow: isBehind 
                ? 'none' 
                : `0 4px 12px rgba(0,0,0,0.5), 0 0 15px ${glowColor}`,
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transform: `translate3d(${tx - itemSize/2}px, ${ty - itemSize/2}px, ${tz}px) scale(${scale})`,
              opacity: opacity,
              transition: 'opacity 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              transformOrigin: 'center center'
            }}
          >
            {!hasFailedImg ? (
              <img
                src={item.logo}
                alt={item.name}
                onError={() => handleImageError(item.name)}
                style={{
                  width: '70%',
                  height: '70%',
                  objectFit: 'contain',
                  filter: isBehind ? 'brightness(0.5) grayscale(0.5)' : 'none',
                  transition: 'filter 0.2s ease'
                }}
              />
            ) : (
              <span
                style={{
                  color: isBehind ? '#666' : '#ffffff',
                  fontFamily: 'sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textShadow: isBehind ? 'none' : `0 0 6px ${glowColor}`
                }}
              >
                {firstLetter}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
