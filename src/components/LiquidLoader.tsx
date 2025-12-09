import { useEffect, useState } from 'react';

interface LiquidLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export const LiquidLoader = ({ isLoading, onComplete }: LiquidLoaderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow animation to complete
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="liquid-loader">
      <div className="loader-track">
        <div className="liquid-fill loading"></div>
      </div>
    </div>
  );
};

