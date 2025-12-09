import React, { useRef, useEffect, useCallback, useState } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  hue: number; // Store the hue for each spark
}

// Convert hex to HSL - handles both 3-digit (#fff) and 6-digit (#ffffff) formats
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Normalize hex to 6 digits
  let normalizedHex = hex;
  if (hex.length === 4) {
    // Convert #fff to #ffffff
    normalizedHex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  
  const r = parseInt(normalizedHex.slice(1, 3), 16) / 255;
  const g = parseInt(normalizedHex.slice(3, 5), 16) / 255;
  const b = parseInt(normalizedHex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#A8FFDC',
  sparkSize = 20,
  sparkRadius = 30,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      // Since canvas is fixed, use viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Extract HSL from the base color once
    const baseHsl = hexToHsl(sparkColor);
    // If saturation is 0% (grayscale), use a default saturation so colors are visible
    const effectiveSaturation = baseHsl.s === 0 ? 80 : baseHsl.s;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Use the stored random hue for this spark, keep saturation and lightness from base color
        // For #fff (s=0%, l=100%), we use effectiveSaturation so colors are visible
        const sparkColorHsl = `hsl(${spark.hue}, ${effectiveSaturation}%, ${baseHsl.l}%)`;
        
        ctx.strokeStyle = sparkColorHsl;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Only trigger on clickable elements
    const target = e.target as HTMLElement;
    
    // Check if the click is on an actual clickable element (button, link, etc.)
    // or an element with cursor-pointer class (but not the work-card container itself)
    const clickableElement = target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
    const cursorPointerElement = target.closest('.cursor-pointer');
    const isWorkCard = target.closest('.work-card');
    
    // Only trigger if it's a clickable element (button, link, etc.)
    // or has cursor-pointer class (which we now only apply to actual buttons, not the card)
    const isClickable = clickableElement !== null || 
                       (cursorPointerElement !== null && cursorPointerElement !== isWorkCard);
    
    if (!isClickable) {
      return;
    }

    // Prevent triggering on canvas itself
    if (target.tagName === 'CANVAS') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate cursor tip offset
    // Cursor is centered at mouse position with translate(-50%, -50%) and scaled by 1.7
    // We need to offset from the center to the tip
    // Pointer cursor (7x7): tip is at top-left, roughly (2px, 2px) from top-left
    //   Center is at (3.5px, 3.5px), so tip offset from center is (-1.5px, -1.5px), scaled = (-2.55px, -2.55px)
    // Hand cursor (8x8): finger tip is at top-center, roughly (4px, 2px) from top-left  
    //   Center is at (4px, 4px), so tip offset from center is (0px, -2px), scaled = (0px, -3.4px)
    const cursorScale = 1.7;
    let offsetX = 0;
    let offsetY = 0;
    
    // Check if it's a hand cursor (pointer) or arrow cursor
    const isHandCursor = isClickable;
    
    if (isHandCursor) {
      // Hand cursor: finger tip offset from center (0px, -2px) scaled
      offsetX = 0;
      offsetY = -2 * cursorScale; // -3.4px
    } else {
      // Arrow cursor: tip offset from center (-1.5px, -1.5px) scaled
      offsetX = -1.5 * cursorScale; // -2.55px
      offsetY = -1.5 * cursorScale; // -2.55px
    }
    
    // Apply offset to click position to center spark at cursor tip
    const x = e.clientX - rect.left + offsetX;
    const y = e.clientY - rect.top + offsetY;

    const now = performance.now();
    
    // Generate random hue for each spark
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
      hue: Math.floor(Math.random() * 360) // Random hue for each spark
    }));

    sparksRef.current.push(...newSparks);
  };

  return (
    <div className="relative" onClick={handleClick} style={{ minHeight: '100vh' }}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />
      {children}
    </div>
  );
};

export default ClickSpark;

