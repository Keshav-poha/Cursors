import React, { useState } from 'react';

export function IsometricElevator({
  children,
  className = '',
  columns = 'repeat(3, 1fr)',
  gap = '1.5rem',
  perspective = 1000,
  style = {},
  ...props
}) {
  return (
    <div
      className={`isometric-elevator-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: gap,
        width: '100%',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: 'rotateX(55deg) rotateZ(-45deg)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function IsometricElevatorItem({
  children,
  className = '',
  liftAmount = 24,
  transitionSpeed = '0.35s',
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`isometric-elevator-item ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `translateZ(${liftAmount}px)` 
          : 'translateZ(0px)',
        transition: `transform ${transitionSpeed} cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow ${transitionSpeed} ease`,
        boxShadow: isHovered 
          ? '-10px 10px 30px rgba(0,0,0,0.5)' 
          : '-2px 2px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
