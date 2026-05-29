import React, { useState } from 'react';

export function HingeReveal({
  coverContent,
  revealContent,
  className = '',
  hingeSide = 'left', 
  perspective = 1200,
  revealAngle = 115,
  transitionSpeed = '0.6s',
  width = '300px',
  height = '200px',
  style = {},
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  
  let origin = 'center left';
  let openTransform = `rotateY(-${revealAngle}deg)`;

  if (hingeSide === 'right') {
    origin = 'center right';
    openTransform = `rotateY(${revealAngle}deg)`;
  } else if (hingeSide === 'top') {
    origin = 'top center';
    openTransform = `rotateX(${revealAngle}deg)`;
  } else if (hingeSide === 'bottom') {
    origin = 'bottom center';
    openTransform = `rotateX(-${revealAngle}deg)`;
  }

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`hinge-reveal-container ${className}`}
      style={{
        position: 'relative',
        width: width,
        height: height,
        perspective: `${perspective}px`,
        overflow: 'visible',
        ...style
      }}
      {...props}
    >
      {/* Background Reveal Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      >
        {revealContent}
      </div>

      {/* Foreground Cover Content (Swings Open) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          transformOrigin: origin,
          transform: isOpen ? openTransform : 'rotateX(0deg) rotateY(0deg)',
          transition: `transform ${transitionSpeed} cubic-bezier(0.25, 0.8, 0.25, 1)`,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.2)'
        }}
      >
        {coverContent}
      </div>
    </div>
  );
}
