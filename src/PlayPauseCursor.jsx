import React, { useEffect, useRef, useState } from 'react';

const lerp = (start, end, factor) => start + (end - start) * factor;

export function PlayPauseCursor({
  selector = '.video-hover-target',
  videoColor = '#F4F4F5',
  videoBgColor = 'rgba(255, 255, 255, 0.05)',
  videoBorderColor = 'rgba(255, 255, 255, 0.15)',
  defaultBgColor = 'rgba(255, 255, 255, 1)',
  defaultSize = 20,
  pillWidth = 105,
  pillHeight = 44,
  damping = 0.15
}) {
  const cursorRef = useRef(null);
  const [hoverState, setHoverState] = useState({
    isVideo: false,
    isPlaying: false,
    width: defaultSize,
    height: defaultSize,
    borderRadius: defaultSize / 2,
    text: ""
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

      const videoEl = target.closest(selector);

      if (videoEl) {
        const isPlaying = videoEl.getAttribute('data-playing') === 'true';
        const w = pillWidth;
        const h = pillHeight;

        mouseRef.current.x = e.clientX - w / 2;
        mouseRef.current.y = e.clientY - h / 2;

        setHoverState({
          isVideo: true,
          isPlaying: isPlaying,
          width: w,
          height: h,
          borderRadius: h / 2,
          text: isPlaying ? "PAUSE" : "PLAY"
        });
      } else {
        mouseRef.current.x = e.clientX - defaultSize / 2;
        mouseRef.current.y = e.clientY - defaultSize / 2;
        setHoverState({
          isVideo: false,
          isPlaying: false,
          width: defaultSize,
          height: defaultSize,
          borderRadius: defaultSize / 2,
          text: ""
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

    const handleVideoToggle = (e) => {
      setHoverState(prev => {
        if (prev.isVideo) {
          return {
            ...prev,
            text: e.detail.isPlaying ? "PAUSE" : "PLAY",
            isPlaying: e.detail.isPlaying
          };
        }
        return prev;
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', moveCursor, { passive: true });
    window.addEventListener('video-play-toggle', handleVideoToggle);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', moveCursor);
      window.removeEventListener('video-play-toggle', handleVideoToggle);
      cancelAnimationFrame(requestRef.current);
    };
  }, [selector, defaultSize, pillWidth, pillHeight, damping]);

  if (isTouchDevice) return null;

  let border = '0px solid transparent';
  let bg = defaultBgColor;

  if (hoverState.isVideo) {
    border = `1px solid ${videoBorderColor}`;
    bg = videoBgColor;
  }

  return (
    <>
      <style>{`
        @keyframes playPauseFadeIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="play-pause-cursor-dot"
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
          backdropFilter: hoverState.isVideo ? 'blur(12px)' : 'blur(0px)',
          boxShadow: hoverState.isVideo ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
          transform: `scale(${isClicking ? 0.9 : 1})`,
          transition: 'width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-radius 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s, border 0.2s'
        }}
      >
        {hoverState.text && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              animation: 'playPauseFadeIn 0.2s ease-out forwards',
              color: videoColor
            }}
          >
            {!hoverState.isPlaying ? (
              <svg width="10" height="12" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9804 6.26795C14.3137 7.03775 14.3137 8.96225 12.9804 9.73205L2.48039 15.7942C1.14705 16.564 1.14156e-06 15.6018 1.25368e-06 14.0622L1.78368e-06 1.93782C1.8958e-06 0.398224 1.14705 -0.564026 2.48039 0.205775L12.9804 6.26795Z" fill={videoColor} />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="3" height="14" rx="1.5" fill={videoColor} />
                <rect x="7" width="3" height="14" rx="1.5" fill={videoColor} />
              </svg>
            )}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '1px',
                marginTop: '1px'
              }}
            >
              {hoverState.text}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
