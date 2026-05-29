import { useState, useCallback } from 'react';

export function useMagnetic(damping = 0.25) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e, ref) => {
    if (!ref || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * damping, y: middleY * damping });
  }, [damping]);

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    x: position.x,
    y: position.y,
    handleMouseMove,
    reset
  };
}
