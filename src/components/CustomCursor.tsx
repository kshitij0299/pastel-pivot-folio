import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  children: React.ReactNode;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const rotationVelocityRef = useRef(0);
  const rotationRef = useRef(0);
  const smoothPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initialize position
    const initMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      smoothPosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
      window.removeEventListener('mousemove', initMouseMove);
    };
    window.addEventListener('mousemove', initMouseMove);

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastTimeRef.current) / 1000, 0.1); // Cap at 100ms
      
      // Calculate velocity
      const deltaX = e.clientX - lastPosRef.current.x;
      const deltaY = e.clientY - lastPosRef.current.y;
      
      // Update velocity with smoothing (inertia)
      velocityRef.current.x = velocityRef.current.x * 0.7 + (deltaX / deltaTime) * 0.3;
      velocityRef.current.y = velocityRef.current.y * 0.7 + (deltaY / deltaTime) * 0.3;
      
      // Calculate rotation based on velocity direction (tilt effect)
      // Use perpendicular direction for opposite tilt (rotate 90 degrees)
      const movementAngle = Math.atan2(velocityRef.current.y, velocityRef.current.x);
      // Reverse direction: tilt opposite to movement (add 180 degrees)
      const targetRotation = (movementAngle + Math.PI) * (180 / Math.PI);
      
      // Calculate rotation amount based on velocity magnitude (more subtle)
      const velocityMagnitude = Math.sqrt(
        velocityRef.current.x * velocityRef.current.x + 
        velocityRef.current.y * velocityRef.current.y
      );
      
      // Limit max velocity and make rotation more subtle
      const limitedMagnitude = Math.min(velocityMagnitude, 500);
      const rotationAmount = Math.min(limitedMagnitude * 0.008, 8); // Max 8 degrees, more subtle
      
      // Update rotation velocity with physics
      const currentRot = rotationRef.current || 0;
      let rotationDiff = targetRotation - currentRot;
      
      // Normalize angle difference to -180 to 180
      while (rotationDiff > 180) rotationDiff -= 360;
      while (rotationDiff < -180) rotationDiff += 360;
      
      rotationVelocityRef.current = rotationVelocityRef.current * 0.9 + rotationDiff * 0.1 * (rotationAmount / 8);
      rotationRef.current = currentRot + rotationVelocityRef.current * 0.3;
      
      // Clamp rotation to prevent upside down (-15 to 15 degrees)
      rotationRef.current = Math.max(-15, Math.min(15, rotationRef.current));
      setRotation(rotationRef.current);
      
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, [role="button"], .cursor-pointer, .cursor-hover, [onclick], input[type="button"], input[type="submit"], .work-card');
      setIsPointer(!!isClickable);
    };

    // Smooth animation loop for physics damping and position interpolation
    const animate = () => {
      // Smooth position interpolation
      smoothPosRef.current.x += (lastPosRef.current.x - smoothPosRef.current.x) * 0.15;
      smoothPosRef.current.y += (lastPosRef.current.y - smoothPosRef.current.y) * 0.15;
      setMousePos({ x: smoothPosRef.current.x, y: smoothPosRef.current.y });
      
      // Apply damping to rotation velocity
      rotationVelocityRef.current *= 0.95;
      
      // Update rotation with damping
      rotationRef.current += rotationVelocityRef.current * 0.2;
      rotationRef.current *= 0.99; // Stronger damping for subtlety
      
      // Clamp rotation to prevent upside down (-15 to 15 degrees)
      rotationRef.current = Math.max(-15, Math.min(15, rotationRef.current));
      setRotation(rotationRef.current);
      
      requestAnimationFrame(animate);
    };
    
    // Initialize smooth position
    smoothPosRef.current = { x: lastPosRef.current.x, y: lastPosRef.current.y };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    const animationId = requestAnimationFrame(animate);

    // Initialize position
    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = '1';
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
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
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(1.7)`,
          transformOrigin: 'center center',
          willChange: 'transform',
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

