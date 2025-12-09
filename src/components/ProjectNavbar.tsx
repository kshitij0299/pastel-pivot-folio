import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import GlassSurface from '@/components/GlassSurface';

export const ProjectNavbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsNavbarVisible(false); // Scrolling down - hide
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsNavbarVisible(true); // Scrolling up - show
      }
      
      // Simple background detection: check if element at navbar position has bg-black or we're in hero section
      const element = document.elementFromPoint(window.innerWidth / 2, 16);
      const hasBlackBg = element?.closest('.bg-black') !== null;
      setIsOverDarkBg(hasBlackBg || currentScrollY < window.innerHeight);
      
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-transform duration-300 ease-in-out',
        'px-2 py-0.5 max-w-5xl w-[95%]',
        isNavbarVisible ? 'translate-y-0' : '-translate-y-[200%]'
      )}
    >
      <div className="w-full flex items-center justify-start">
        <GlassSurface 
          width="auto" 
          height={44} 
          borderRadius={28} 
          backgroundOpacity={0} 
          onClick={() => window.location.href = '/#work'}
        >
          <div className={cn(
            "w-full h-full px-3 flex items-center justify-center gap-2 font-playfair text-lg font-bold cursor-hover tracking-[-0.06em] transition-colors duration-300",
            isOverDarkBg ? "text-white" : "text-heading"
          )}>
            ← Back
          </div>
        </GlassSurface>
      </div>
    </nav>
  );
};

