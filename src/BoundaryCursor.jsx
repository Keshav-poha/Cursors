import React, { useEffect, useRef, useState } from 'react';

const lerp = (start, end, factor) => start + (end - start) * factor;

export function BoundaryCursor({
  selector = 'a, button, .boundary-target',
  hoverColor = 'rgba(217, 4, 41, 0.4)',
  hoverBgColor = 'rgba(217, 4, 41, 0.1)',
  defaultBgColor = 'rgba(255, 255, 255, 1)',
  defaultSize = 20,
  boundaryPadding = 16,
  damping = 0.15
}) {
  const cursorRef = useRef(null);
  const [hoverState, setHoverState] = useState({
    isHovering: false,
    width: defaultSize,
    height: defaultSize,
    borderRadius: defaultSize / 2
  });
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const interactable = target.closest(selector);

      if (interactable) {
        const rect = interactable.getBoundingClientRect();
        const w = rect.width + boundaryPadding;
        const h = rect.height + boundaryPadding;

        
        mouseRef.current.x = rect.left + rect.width / 2 - w / 2;
        mouseRef.current.y = rect.top + rect.height / 2 - h / 2;

        const computedStyle = window.getComputedStyle(interactable);
        let br = parseInt(computedStyle.borderRadius) || 0;

        setHoverState({
          isHovering: true,
          width: w,
          height: h,
          borderRadius: br + (boundaryPadding / 2)
        });
      } else {
        mouseRef.current.x = e.clientX - defaultSize / 2;
        mouseRef.current.y = e.clientY - defaultSize / 2;
        setHoverState({
          isHovering: false,
          width: defaultSize,
          height: defaultSize,
          borderRadius: defaultSize / 2
        });
      }
    };

    const updatePosition = () => {
      posRef.current.x = lerp(posRef.current.x, mouseRef.current.x, damping);
      posRef.current.y = lerp(posRef.current.y, mouseRef.current.y, damping);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', moveCursor, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', moveCursor);
      cancelAnimationFrame(requestRef.current);
    };
  }, [selector, defaultSize, boundaryPadding, damping]);

  if (isTouchDevice) return null;

  let border = '0px solid transparent';
  let bg = defaultBgColor;

  if (hoverState.isHovering) {
    border = `1px solid ${hoverColor}`;
    bg = hoverBgColor;
  }

  return (
    <div
      ref={cursorRef}
      className="boundary-cursor-dot"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: hoverState.width,
        height: hoverState.height,
        borderRadius: hoverState.borderRadius,
        border: border,
        backgroundColor: bg,
        transform: `scale(${isClicking ? 0.9 : 1})`,
        transition: 'width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s, border 0.2s'
      }}
    />
  );
}
