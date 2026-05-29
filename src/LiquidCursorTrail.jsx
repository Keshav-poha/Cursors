import React, { useEffect, useRef, useMemo } from 'react';

export function LiquidCursorTrail({
  color,
  color1,
  color2,
  colorStops,
  blurDeviation = "15",
  buoyancy = 0.5,
  turbulence = 1.0
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const stops = useMemo(() => {
    if (colorStops) return colorStops;
    if (color1 && color2) {
      return [
        { offset: 0, color: color1 },
        { offset: 1, color: color2 }
      ];
    }
    if (color) {
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return [
          { offset: 0, color: `rgba(${r}, ${g}, ${b}, 0.3)` },
          { offset: 0.5, color: `rgba(${r}, ${g}, ${b}, 0.7)` },
          { offset: 1, color: `rgba(${r}, ${g}, ${b}, 1)` }
        ];
      }
      if (color.startsWith('rgb')) {
        const match = color.match(/\d+(\.\d+)?/g);
        if (match && match.length >= 3) {
          const r = match[0];
          const g = match[1];
          const b = match[2];
          return [
            { offset: 0, color: `rgba(${r}, ${g}, ${b}, 0.3)` },
            { offset: 0.5, color: `rgba(${r}, ${g}, ${b}, 0.7)` },
            { offset: 1, color: `rgba(${r}, ${g}, ${b}, 1)` }
          ];
        }
      }
      return [
        { offset: 0, color: color },
        { offset: 1, color: color }
      ];
    }
    return [
      { offset: 0, color: '#4A0008' },
      { offset: 0.5, color: '#8A041A' },
      { offset: 1, color: '#D90429' }
    ];
  }, [color, color1, color2, colorStops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = wrapperRef.current;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: -1000, y: -1000 };
    let trackedMouse = { x: -1000, y: -1000 };
    let isMoving = false;
    let idleTimer = null;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      if (!isMoving) {
        trackedMouse.x = mouse.x;
        trackedMouse.y = mouse.y;
      }
      isMoving = true;
      
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 50);
    };
    window.addEventListener('pointermove', onPointerMove);

    const particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 45; 
        this.vx = (Math.random() - 0.5) * turbulence * 2;
        this.vy = (Math.random() - 0.5) * turbulence * 2 - buoyancy;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.r -= 0.6; 
      }
      draw(ctx, gradient) {
        if (this.r <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient; 
        ctx.fill();
      }
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const t = performance.now() * 0.0005;
      const x1 = width * 0.5 + Math.cos(t) * width * 0.5;
      const y1 = height * 0.5 + Math.sin(t) * height * 0.5;
      const x2 = width * 0.5 + Math.cos(t + Math.PI) * width * 0.5;
      const y2 = height * 0.5 + Math.sin(t + Math.PI) * height * 0.5;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      stops.forEach(stop => {
        gradient.addColorStop(stop.offset, stop.color);
      });

      if (isMoving) {
        const dx = mouse.x - trackedMouse.x;
        const dy = mouse.y - trackedMouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          const steps = Math.max(1, Math.ceil(dist / 8));
          for (let i = 0; i < steps; i++) {
            const px = trackedMouse.x + (dx * i) / steps;
            const py = trackedMouse.y + (dy * i) / steps;
            particles.push(new Particle(px, py));
          }
          trackedMouse.x = mouse.x;
          trackedMouse.y = mouse.y;
        }
      } else if (mouse.x > 0) {
        particles.push(new Particle(mouse.x, mouse.y));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx, gradient);
        if (particles[i].r <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stops, buoyancy, turbulence]);

  return (
    <div 
      ref={wrapperRef}
      style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden' }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blurDeviation} result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 35 -15" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'url(#goo)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
