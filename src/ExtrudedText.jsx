import React, { useRef, useState } from 'react';

export function ExtrudedText({
  text,
  className = '',
  maxTilt = 20,
  extrusionLength = 8,
  extrusionColor = '#d90429',
  textColor = '#ffffff',
  fontSize = '2.5rem',
  fontWeight = '800',
  style = {},
  ...props
}) {
  const textRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });

  const handleMouseMove = (e) => {
    const el = textRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    const y = (e.clientY - rect.top) / rect.height - 0.5; 

    setCoords({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
      shadowX: -x * extrusionLength,
      shadowY: -y * extrusionLength
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });
  };

  
  const buildTextShadow = () => {
    const shadows = [];
    const layers = 6;
    for (let i = 1; i <= layers; i++) {
      const factor = i / layers;
      shadows.push(`${coords.shadowX * factor}px ${coords.shadowY * factor}px 0px ${extrusionColor}`);
    }
    return shadows.join(', ');
  };

  return (
    <div
      ref={textRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`extruded-text ${className}`}
      style={{
        display: 'inline-block',
        fontFamily: "'Outfit', sans-serif",
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: textColor,
        cursor: 'default',
        transform: `perspective(800px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translateZ(20px)`,
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), text-shadow 0.2s ease',
        textShadow: buildTextShadow(),
        transformStyle: 'preserve-3d',
        userSelect: 'none',
        ...style
      }}
      {...props}
    >
      {text}
    </div>
  );
}
