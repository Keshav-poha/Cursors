import React, { useRef, useState } from 'react';

export function LayerScatter({
  children,
  className = '',
  maxTilt = 15,
  scatterDepth = 40, 
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

  
  
  const renderedLayers = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const zIndexOffset = index * 10;
    const zTranslation = coords.isHovered ? (index + 1) * scatterDepth : 0;

    return React.cloneElement(child, {
      style: {
        position: index === 0 ? 'relative' : 'absolute',
        inset: index === 0 ? 'auto' : 0,
        transform: `translateZ(${zTranslation}px)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.165, 0.84, 0.44, 1)`,
        transformStyle: 'preserve-3d',
        zIndex: zIndexOffset,
        pointerEvents: index === 0 ? 'auto' : 'none',
        ...child.props.style
      }
    });
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`layer-scatter-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `perspective(${perspective}px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.165, 0.84, 0.44, 1)`,
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {renderedLayers}
    </div>
  );
}
