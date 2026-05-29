import React, { useState } from 'react';

export function FlipCard({
  frontContent,
  backContent,
  className = '',
  axis = 'y', 
  trigger = 'hover', 
  perspective = 1000,
  transitionSpeed = '0.6s',
  width = '300px',
  height = '200px',
  style = {},
  ...props
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (trigger === 'click') {
      setIsFlipped(prev => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsFlipped(false);
    }
  };

  const flipTransform = isFlipped
    ? (axis === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)')
    : 'rotateX(0deg) rotateY(0deg)';

  const backTransform = axis === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)';

  return (
    <div
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flip-card-container ${className}`}
      style={{
        width: width,
        height: height,
        perspective: `${perspective}px`,
        cursor: trigger === 'click' ? 'pointer' : 'default',
        ...style
      }}
      {...props}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: flipTransform,
          transition: `transform ${transitionSpeed} cubic-bezier(0.4, 0, 0.2, 1)`
        }}
      >
        {/* Front Face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(0deg) rotateY(0deg)',
            zIndex: 2
          }}
        >
          {frontContent}
        </div>

        {/* Back Face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: backTransform,
            zIndex: 1
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
