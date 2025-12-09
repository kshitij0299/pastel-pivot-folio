import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  children: React.ReactNode;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only check for actual clickable elements, not the work-card container itself
      const clickableElement = target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
      const cursorPointerElement = target.closest('.cursor-pointer');
      const isWorkCard = target.closest('.work-card');
      // Only show pointer cursor on actual clickable elements, not the card container
      const isClickable = clickableElement !== null || 
                         (cursorPointerElement !== null && cursorPointerElement !== isWorkCard);
      setIsPointer(!!isClickable);
    };

    // Initialize position
    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] transition-opacity duration-200"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(1.7)`,
          transformOrigin: 'center center',
        }}
      >
        {/* macOS-style pointer cursor */}
        {!isPointer ? (
          <img
            src="/cursor-pointer.svg"
            alt="Cursor"
            className="w-7 h-7"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
          />
        ) : (
          /* macOS-style hand cursor (pointing hand) */
          <img
            src="/cursor-hand.svg"
            alt="Hand cursor"
            className="w-8 h-8"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
          />
        )}
      </div>
      {children}
    </>
  );
};

export default CustomCursor;

