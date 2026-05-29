import { useState, useCallback } from 'react';

export function useTilt(maxTilt = 15) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e, ref) => {
    if (!ref || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setTilt({
      rotateX: -y * maxTilt * 2,
      rotateY: x * maxTilt * 2
    });
  }, [maxTilt]);

  const reset = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return {
    rotateX: tilt.rotateX,
    rotateY: tilt.rotateY,
    handleMouseMove,
    reset
  };
}
