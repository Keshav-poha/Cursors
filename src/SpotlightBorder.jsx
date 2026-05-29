import React, { useRef, useState } from 'react';

export function SpotlightBorder({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  spotlightColor = 'rgba(217, 4, 41, 0.6)',
  borderWidth = '1px',
  borderRadius = '16px',
  cardBg = '#0f0f11',
  transitionSpeed = '0.3s',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, x: -1000, y: -1000, isHovered: false });

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
      className={`spotlight-border-card ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: borderWidth,
        borderRadius: borderRadius,
        background: coords.isHovered
          ? `radial-gradient(circle at ${coords.x}px ${coords.y}px, ${spotlightColor} 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.04) 100%)`
          : 'rgba(255, 255, 255, 0.08)',
        transform: `perspective(${perspective}px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: cardBg,
          borderRadius: `calc(${borderRadius} - ${borderWidth})`,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(10px)' 
        }}
      >
        {children}
      </div>
    </div>
  );
}
