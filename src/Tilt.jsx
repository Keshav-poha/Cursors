import React, { useRef } from 'react';
import { useTilt } from './hooks/useTilt';

export function Tilt({
  children,
  className = '',
  maxTilt = 15,
  transitionSpeed = '0.4s',
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const { rotateX, rotateY, handleMouseMove, reset } = useTilt(maxTilt);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => handleMouseMove(e, ref)}
      onMouseLeave={reset}
      className={`tilt-target ${className}`}
      style={{
        display: 'inline-block',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
