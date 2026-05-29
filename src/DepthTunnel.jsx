import React, { useRef, useState } from 'react';

export function DepthTunnel({
  children,
  className = '',
  layersCount = 5,
  maxOffset = 25,
  perspective = 1000,
  transitionSpeed = '0.2s',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  style = {},
  ...props
}) {
  const tunnelRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = tunnelRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    const y = (e.clientY - rect.top) / rect.height - 0.5; 

    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  
  const renderLayers = () => {
    const layers = [];
    for (let i = 0; i < layersCount; i++) {
      const scale = 1 - (i / layersCount) * 0.4; 
      const offsetFactor = (i / (layersCount - 1)) * maxOffset; 
      const tx = coords.x * offsetFactor;
      const ty = coords.y * offsetFactor;

      layers.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: `${(i * 12)}px`,
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            transform: `translate3d(${tx}px, ${ty}px, -${i * 30}px) scale(${scale})`,
            transition: `transform ${transitionSpeed} cubic-bezier(0.165, 0.84, 0.44, 1)`,
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: i
          }}
        >
          {i === layersCount - 1 && children}
        </div>
      );
    }
    return layers;
  };

  return (
    <div
      ref={tunnelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`depth-tunnel-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {renderLayers()}
    </div>
  );
}
