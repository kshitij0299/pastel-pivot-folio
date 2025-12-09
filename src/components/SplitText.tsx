import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; y?: number; x?: number; scale?: number; [key: string]: any };
  to?: { opacity?: number; y?: number; x?: number; scale?: number; [key: string]: any };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const container = containerRef.current;
    const chars = container.querySelectorAll('.split-char');

    if (chars.length === 0) return;

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateChars();
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(container);

    const animateChars = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
      });

      chars.forEach((char, index) => {
        const charElement = char as HTMLElement;
        
        // Set initial state
        gsap.set(charElement, from);

        // Animate to final state
        tl.to(
          charElement,
          {
            ...to,
            duration,
            ease,
            delay: index * (delay / 1000)
          },
          index * (delay / 1000)
        );
      });
    };

    return () => {
      observer.disconnect();
    };
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, hasAnimated, onLetterAnimationComplete]);

  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span key={index} className="split-char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} className="split-char inline-block mr-1">
          {word}
        </span>
      ));
    } else {
      return text.split('\n').map((line, index) => (
        <div key={index} className="split-char">
          {line}
        </div>
      ));
    }
  };

  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[textAlign];

  return (
    <div
      ref={containerRef}
      className={`${textAlignClass} ${className}`}
    >
      {splitText()}
    </div>
  );
}

