import React, { useRef, useState } from 'react';

export function GlossCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  transitionSpeed = '0.3s',
  glossOpacity = 0.15,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    setCoords({
      rotateX: -py * maxTilt * 2,
      rotateY: px * maxTilt * 2,
      x: x,
      y: y,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setCoords(prev => ({ ...prev, rotateX: 0, rotateY: 0, isHovered: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`gloss-card ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `perspective(${perspective}px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99,
          background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, ${coords.isHovered ? glossOpacity : 0}) 0%, transparent 60%)`,
          transition: 'background 0.1s ease'
        }}
      />
    </div>
  );
}
