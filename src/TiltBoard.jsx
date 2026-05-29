import React, { useRef, useState } from 'react';

export function TiltBoard({
  children,
  className = '',
  maxTilt = 10,
  boardRotationX = 20, 
  perspective = 1000,
  transitionSpeed = '0.3s',
  columns = 'repeat(3, 1fr)',
  gap = '1.25rem',
  style = {},
  ...props
}) {
  const boardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: boardRotationX, rotateY: 0 });

  const handleMouseMove = (e) => {
    const board = boardRef.current;
    if (!board) return;

    const rect = board.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; 
    const y = (e.clientY - rect.top) / rect.height - 0.5; 

    
    setCoords({
      rotateX: boardRotationX - (y * maxTilt),
      rotateY: x * maxTilt
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: boardRotationX, rotateY: 0 });
  };

  return (
    <div
      ref={boardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-board-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: gap,
        width: '100%',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: `perspective(${perspective}px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.2, 0.8, 0.2, 1)`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function TiltBoardItem({
  children,
  className = '',
  liftAmount = 20,
  activeBg = 'rgba(255, 255, 255, 0.08)',
  transitionSpeed = '0.25s',
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`tilt-board-item ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `translateZ(${liftAmount}px)` 
          : 'translateZ(0px)',
        backgroundColor: isHovered ? activeBg : 'transparent',
        transition: `transform ${transitionSpeed} cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.2s`,
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: isHovered ? '0 15px 30px rgba(0,0,0,0.4)' : 'none',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
