import { useState, useEffect, ReactNode } from 'react';

interface FluidGlassPillProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const FluidGlassPill: React.FC<FluidGlassPillProps> = ({ children, className = '', style = {} }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: `
          0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
          0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
          0px 4px 16px rgba(17, 17, 26, 0.05),
          0px 8px 24px rgba(17, 17, 26, 0.05),
          0px 16px 56px rgba(17, 17, 26, 0.05),
          0px 4px 16px rgba(17, 17, 26, 0.05) inset,
          0px 8px 24px rgba(17, 17, 26, 0.05) inset,
          0px 16px 56px rgba(17, 17, 26, 0.05) inset
        `,
        ...style
      }}
    >
      {children}
    </div>
  );
};

