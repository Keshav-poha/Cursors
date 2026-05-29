import React, { useRef, useState, useEffect } from 'react';

export function PerspectiveGrid({
  children,
  className = '',
  columns = 'repeat(auto-fit, minmax(80px, 1fr))',
  gap = '1rem',
  style = {},
  ...props
}) {
  return (
    <div
      className={`perspective-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: gap,
        width: '100%',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function PerspectiveGridItem({
  children,
  className = '',
  maxTilt = 20,
  activeRadius = 300,
  liftAmount = 15,
  style = {},
  ...props
}) {
  const itemRef = useRef(null);
  const [transformState, setTransformState] = useState({ rotateX: 0, rotateY: 0, z: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = itemRef.current;
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
        const lift = liftAmount * factor;

        setTransformState({
          rotateX: angleX,
          rotateY: angleY,
          z: lift
        });
      } else {
        setTransformState({ rotateX: 0, rotateY: 0, z: 0 });
      }
    };

    const handleMouseLeave = () => {
      setTransformState({ rotateX: 0, rotateY: 0, z: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, activeRadius, liftAmount]);

  return (
    <div
      ref={itemRef}
      className={`perspective-grid-item ${className}`}
      style={{
        transform: `translateZ(${transformState.z}px) rotateX(${transformState.rotateX}deg) rotateY(${transformState.rotateY}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1)',
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
