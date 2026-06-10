import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function TextRingCursor({
  text = "LITE CURSOR EFFECTS • SCROLL DOWN • ",
  radius = 50,
  color = "#ffffff",
  damping = 0.15,
  rotationSpeed = 8,
  fontSize = 12,
  fontWeight = 600,
  letterSpacing = "0.15em",
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

  // Unique ID so multiple instances don't clash
  const instanceId = useRef(Math.random().toString(36).substr(2, 9)).current;
  const pathId = `text-ring-path-${instanceId}`;

  // Calculate sizing
  const svgPadding = fontSize * 2;
  const size = (radius * 2) + svgPadding;
  const center = size / 2;
  
  // SVG path for a perfect circle
  const pathData = `M ${center}, ${center} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  if (typeof window === 'undefined') return null;

  return (
    <>
      {!prefersReducedMotion && (
        <style>
          {`
            @keyframes spin-${instanceId} {
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: size,
          height: size,
          pointerEvents: 'none',
          transform: `translate3d(${position.x - center}px, ${position.y - center}px, 0)`,
          zIndex: zIndex,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            overflow: 'visible',
            animation: prefersReducedMotion ? 'none' : `spin-${instanceId} ${rotationSpeed}s linear infinite`
          }}
        >
          <path id={pathId} d={pathData} fill="none" />
          <text
            fill={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            letterSpacing={letterSpacing}
            style={{ textTransform: 'uppercase' }}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
    </>
  );
}
