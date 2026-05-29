import React, { useRef, useState } from 'react';

export function ParallaxCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  transitionSpeed = '0.3s',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, mx: 0, my: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    const y = (e.clientY - rect.top) / rect.height - 0.5; 

    setCoords({
      rotateX: -y * maxTilt * 2,
      rotateY: x * maxTilt * 2,
      mx: x,
      my: y
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, mx: 0, my: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`parallax-card ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `perspective(${perspective}px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        transformStyle: 'preserve-3d',
        '--mx': coords.mx,
        '--my': coords.my,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
