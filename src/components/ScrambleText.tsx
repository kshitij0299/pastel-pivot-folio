import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export const ScrambleText = ({ text, className = '' }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    
    const scramble = () => {
      const duration = 0.1; // 0.1 seconds for scramble
      const originalText = text;
      let progress = 0;
      
      const scrambleInterval = setInterval(() => {
        progress += 0.02; // Update every 20ms for smooth animation
        
        if (progress >= 1) {
          setDisplayText(originalText);
          clearInterval(scrambleInterval);
          return;
        }
        
        const revealCount = Math.floor(progress * originalText.length);
        let scrambledText = '';
        
        for (let i = 0; i < originalText.length; i++) {
          if (i < revealCount) {
            scrambledText += originalText[i];
          } else {
            scrambledText += characters[Math.floor(Math.random() * characters.length)];
          }
        }
        
        setDisplayText(scrambledText);
      }, 20);
    };

    // Start the scramble effect every 0.7 seconds
    intervalRef.current = window.setInterval(scramble, 700);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
};