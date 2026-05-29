import React, { useRef, useState } from 'react';

export function SliceCard({
  children,
  className = '',
  maxTilt = 15,
  sliceSpacing = 20, 
  perspective = 1000,
  transitionSpeed = '0.4s',
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  const handleMouseMove = (e) => {
    const card = containerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    const y = (e.clientY - rect.top) / rect.height - 0.5; 

    setCoords({
      rotateX: -y * maxTilt * 2,
      rotateY: x * maxTilt * 2,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  const sliceStyles = [
    { clipPath: 'inset(0 0 66.66% 0)', zOffset: -sliceSpacing }, 
    { clipPath: 'inset(33.33% 0 33.33% 0)', zOffset: 0 },         
    { clipPath: 'inset(66.66% 0 0 0)', zOffset: sliceSpacing }    
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`slice-card-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `perspective(${perspective}px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.165, 0.84, 0.44, 1)`,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    >
      {/* Renders the slices */}
      {sliceStyles.map((slice, index) => (
        <div
          key={index}
          style={{
            position: index === 0 ? 'relative' : 'absolute',
            inset: 0,
            clipPath: slice.clipPath,
            WebkitClipPath: slice.clipPath,
            transform: coords.isHovered 
              ? `translateZ(${slice.zOffset}px)` 
              : 'translateZ(0px)',
            transition: `transform ${transitionSpeed} cubic-bezier(0.165, 0.84, 0.44, 1)`,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none'
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
