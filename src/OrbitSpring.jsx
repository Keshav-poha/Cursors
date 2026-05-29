import React, { useRef, useState, useEffect } from 'react';

export function OrbitSpring({
  children,
  className = '',
  maxTilt = 20,
  activeRadius = 250,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [orbitStyle, setOrbitStyle] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < activeRadius) {
        const factor = (activeRadius - distance) / activeRadius;
        const angleX = -(dy / (distance || 1)) * maxTilt * factor;
        const angleY = (dx / (distance || 1)) * maxTilt * factor;

        setCoords({
          rotateX: angleX,
          rotateY: angleY,
          isHovered: true
        });
      } else {
        setCoords(prev => ({ ...prev, isHovered: false }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxTilt, activeRadius]);

  return (
    <>
      <style>{`
        @keyframes orbitFloating {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`orbit-spring-container ${className}`}
        style={{
          display: 'inline-block',
          transform: coords.isHovered
            ? `perspective(800px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale(1.05)`
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
          animation: coords.isHovered ? 'none' : 'orbitFloating 6s ease-in-out infinite',
          transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transformStyle: 'preserve-3d',
          ...style
        }}
        {...props}
      >
        <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </>
  );
}
