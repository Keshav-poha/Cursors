import React, { useRef } from 'react';
import { useMagnetic } from './hooks/useMagnetic';

export function Magnetic({
  children,
  className = '',
  damping = 0.25,
  transitionSpeed = '0.4s',
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const { x, y, handleMouseMove, reset } = useMagnetic(damping);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => handleMouseMove(e, ref)}
      onMouseLeave={reset}
      className={`magnetic-target ${className}`}
      style={{
        display: 'inline-block',
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
