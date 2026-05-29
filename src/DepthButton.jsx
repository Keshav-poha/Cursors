import React, { useRef, useState } from 'react';

export function DepthButton({
  children,
  className = '',
  maxTilt = 10,
  buttonBg = '#d90429',
  buttonDepthBg = '#8a041a',
  textColor = '#ffffff',
  depth = 8,
  onClick,
  style = {},
  ...props
}) {
  const btnRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, isPressed: false });

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    const y = (e.clientY - rect.top) / rect.height - 0.5; 

    setCoords(prev => ({
      ...prev,
      rotateX: -y * maxTilt * 2,
      rotateY: x * maxTilt * 2
    }));
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, isPressed: false });
  };

  const handleMouseDown = () => {
    setCoords(prev => ({ ...prev, isPressed: true }));
  };

  const handleMouseUp = () => {
    setCoords(prev => ({ ...prev, isPressed: false }));
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      className={`depth-button-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        transform: `perspective(800px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d',
        userSelect: 'none',
        ...style
      }}
      {...props}
    >
      {/* 3D Depth Face */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: buttonDepthBg,
          borderRadius: '12px',
          transform: `translate3d(0, ${depth}px, -${depth}px)`,
          transition: 'transform 0.15s ease'
        }}
      />
      {/* Interactive Top Face */}
      <div
        style={{
          backgroundColor: buttonBg,
          color: textColor,
          padding: '0.8rem 2.2rem',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          transform: `translate3d(0, ${coords.isPressed ? depth : 0}px, -${coords.isPressed ? depth : 0}px)`,
          transition: 'transform 0.1s ease, background-color 0.2s',
          boxShadow: coords.isPressed ? 'none' : '0 10px 20px -5px rgba(0,0,0,0.3)'
        }}
      >
        {children}
      </div>
    </div>
  );
}
