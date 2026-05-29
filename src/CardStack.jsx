import React, { useState } from 'react';

export function CardStack({
  children,
  className = '',
  fanSpacing = 45, 
  liftSpacing = 15, 
  depthSpacing = 20, 
  perspective = 1000,
  transitionSpeed = '0.5s',
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardCount = React.Children.count(children);

  const renderedCards = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    
    const midIndex = (cardCount - 1) / 2;
    const offsetFromCenter = index - midIndex;

    
    const defaultTx = offsetFromCenter * 2;
    const defaultTy = index * 2;
    const defaultTz = index * -4;
    const defaultRotate = offsetFromCenter * 1;

    
    const hoverTx = offsetFromCenter * fanSpacing;
    const hoverTy = Math.abs(offsetFromCenter) * -liftSpacing;
    const hoverTz = index * depthSpacing;
    const hoverRotate = offsetFromCenter * 6; 

    const tx = isHovered ? hoverTx : defaultTx;
    const ty = isHovered ? hoverTy : defaultTy;
    const tz = isHovered ? hoverTz : defaultTz;
    const rotate = isHovered ? hoverRotate : defaultRotate;

    return React.cloneElement(child, {
      style: {
        position: index === 0 ? 'relative' : 'absolute',
        inset: index === 0 ? 'auto' : 0,
        transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotate(${rotate}deg)`,
        transition: `transform ${transitionSpeed} cubic-bezier(0.175, 0.885, 0.32, 1.15)`,
        transformStyle: 'preserve-3d',
        zIndex: index,
        ...child.props.style
      }
    });
  });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`card-stack-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {renderedCards}
    </div>
  );
}
