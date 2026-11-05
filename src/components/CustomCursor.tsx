import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const clickable = !!target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      setIsPointer(clickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing animation loop
    let animId = 0;
    const loop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [pos.x, pos.y]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="cursor-dot w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />

      {/* Outer Cyber Reticle Ring */}
      <div
        className={`cursor-dot rounded-full border border-emerald-500/60 transition-transform duration-150 ${
          isPointer
            ? 'w-10 h-10 border-teal-400 bg-emerald-500/15 scale-110'
            : isClicked
            ? 'w-6 h-6 border-emerald-300 scale-90'
            : 'w-7 h-7'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />
    </>
  );
};
