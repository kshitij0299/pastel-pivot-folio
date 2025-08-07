import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ScrambleTextProps {
  text: string;
  className?: string;
  interval?: number;
}

export const ScrambleText = ({ text, className = '', interval = 0.7 }: ScrambleTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const originalText = text;
  const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const scrambleText = () => {
    if (!textRef.current) return;

    const tl = gsap.timeline();
    
    // Scramble phase (first half of animation)
    tl.to({}, {
      duration: 0.2,
      onUpdate: function() {
        if (!textRef.current) return;
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
          if (originalText[i] === ' ') {
            scrambled += ' ';
          } else {
            scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        textRef.current.textContent = scrambled;
      }
    })
    // Unscramble phase (second half of animation)
    .to({}, {
      duration: 0.3,
      onUpdate: function() {
        if (!textRef.current) return;
        const progress = this.progress();
        let result = '';
        
        for (let i = 0; i < originalText.length; i++) {
          if (originalText[i] === ' ') {
            result += ' ';
          } else if (Math.random() < progress) {
            result += originalText[i];
          } else {
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        textRef.current.textContent = result;
      },
      onComplete: () => {
        if (textRef.current) {
          textRef.current.textContent = originalText;
        }
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(scrambleText, interval * 1000);
    
    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <span ref={textRef} className={className}>
      {originalText}
    </span>
  );
};