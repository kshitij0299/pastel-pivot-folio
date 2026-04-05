import { useEffect, useState } from 'react';

interface LiquidLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export const LiquidLoader = ({ isLoading, onComplete }: LiquidLoaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setHasAnimated(false);
    } else {
      // Delay hiding to allow animation to complete
      const timer = setTimeout(() => {
        setIsVisible(false);
        setHasAnimated(false); // Reset for next time
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  // Mark animation as complete after it plays once
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 4000); // Match animation duration (4s)
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated]);

  if (!isVisible) return null;

  return (
    <div className="liquid-loader">
      <div className="loader-track">
        <div className={`liquid-fill ${hasAnimated ? 'complete' : 'loading'}`}></div>
      </div>
    </div>
  );
};

