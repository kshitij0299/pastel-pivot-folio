import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SimpleDesigner = () => {
  return (
    <span className="font-pixelify text-body">designer</span>
  );
};

interface StickerData {
  id: number;
  src: string;
  alt: string;
  x: number;
  y: number;
  size: string;
}

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [draggedSticker, setDraggedSticker] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Initialize stickers with placeholder positions (will be calculated)
  const [stickers, setStickers] = useState<StickerData[]>([
    {
      id: 1,
      src: "/lovable-uploads/f2c4c868-233a-4093-a243-41fe24f44a1b.png",
      alt: "Decorative sticker",
      x: 0,
      y: 0,
      size: "w-20 h-20 md:w-24 md:h-24"
    },
    {
      id: 2,
      src: "/lovable-uploads/26129708-a75e-4069-b7c3-ae0c75f09b00.png",
      alt: "Decorative sticker",
      x: 0,
      y: 0,
      size: "w-20 h-20 md:w-24 md:h-24"
    },
    {
      id: 3,
      src: "/lovable-uploads/19dad77f-e13e-4f9d-b410-b68a7d608120.png",
      alt: "Decorative sticker",
      x: 0,
      y: 0,
      size: "w-18 h-18 md:w-22 md:h-22"
    },
    {
      id: 5,
      src: "/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png",
      alt: "Kshitij's Profile",
      x: 0,
      y: 0,
      size: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
    }
  ]);

  // Calculate positions based on actual DOM elements
  useEffect(() => {
    const calculatePositions = () => {
      // Multiple attempts to ensure DOM is ready
      const attemptPositioning = (retryCount = 0) => {
        const titleElement = titleRef.current;
        if (!titleElement) {
          if (retryCount < 5) {
            setTimeout(() => attemptPositioning(retryCount + 1), 200);
          }
          return;
        }

        // Get the "Kshitij" text position
        const titleRect = titleElement.getBoundingClientRect();
        const kshitijText = titleElement.querySelector('span:last-child') as HTMLElement;
        
        console.log('Title element found:', !!titleElement);
        console.log('Title rect:', titleRect);
        console.log('Kshitij text found:', !!kshitijText);
        
        // Check if we have valid dimensions
        if (titleRect.width === 0 || titleRect.height === 0) {
          if (retryCount < 5) {
            console.log('Title not ready, retrying...', retryCount);
            setTimeout(() => attemptPositioning(retryCount + 1), 300);
            return;
          }
        }
        
        let kshitijRect = titleRect;
        if (kshitijText) {
          kshitijRect = kshitijText.getBoundingClientRect();
          console.log('Kshitij text rect:', kshitijRect);
          
          // If Kshitij text rect is empty, use title rect as fallback
          if (kshitijRect.width === 0 || kshitijRect.height === 0) {
            kshitijRect = titleRect;
            console.log('Using title rect as fallback');
          }
        }

        setStickers(prev => prev.map(sticker => {
          if (sticker.id === 1) {
            // Mobile-specific positioning next to name
            if (window.innerWidth <= 768) {
              // FORCE TEST: Move to center of screen on mobile to test if positioning works
              const mobileX = 50; // Far left
              const mobileY = 200; // Near top
              
              console.log('FORCE TEST - Mobile positioning - Sticker 1 at:', mobileX, mobileY);
              console.log('Window width:', window.innerWidth);
              console.log('kshitijRect:', kshitijRect);
              
              return {
                ...sticker,
                x: mobileX,
                y: mobileY
              };
            } else {
              // Desktop positioning
              const offsetX = 120;
              const offsetY = -20;
              const newX = kshitijRect.right + offsetX;
              const newY = kshitijRect.top + window.scrollY + offsetY;
              
              console.log('Desktop positioning - Sticker 1 at:', newX, newY);
              
              return {
                ...sticker,
                x: Math.max(0, Math.min(newX, window.innerWidth - 100)),
                y: Math.max(0, newY)
              };
            }
          }
          if (sticker.id === 2) {
            return {
              ...sticker,
              x: window.innerWidth - 120,
              y: window.innerWidth > 768 ? 128 : 160
            };
          }
          if (sticker.id === 3) {
            return {
              ...sticker,
              x: window.innerWidth > 768 ? 80 : 40,
              y: window.innerHeight - 200
            };
          }
          if (sticker.id === 5) {
            // Profile picture positioning
            if (window.innerWidth <= 768) {
              // Mobile: Position next to "Kshitij" name
              const profileX = Math.min(kshitijRect.right + 15, window.innerWidth - 80);
              const profileY = kshitijRect.top + window.scrollY - 10;
              
              console.log('Mobile PROFILE positioning at:', profileX, profileY);
              
              return {
                ...sticker,
                x: profileX,
                y: profileY
              };
            } else {
              // Desktop positioning
              return {
                ...sticker,
                x: window.innerWidth - 200,
                y: 300
              };
            }
          }
          return sticker;
        }));
      };
      
      // Start positioning attempts
      attemptPositioning();
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    
    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  // Unified drag handlers for both mouse and touch
  const startDrag = (clientX: number, clientY: number, stickerId: number) => {
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;

    setDraggedSticker(stickerId);
    setDragOffset({
      x: clientX - sticker.x,
      y: clientY - sticker.y
    });
  };

  const updateDrag = (clientX: number, clientY: number) => {
    if (draggedSticker === null) return;

    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    // Keep stickers within viewport bounds
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));

    setStickers(prev => prev.map(sticker => 
      sticker.id === draggedSticker 
        ? { ...sticker, x: boundedX, y: boundedY }
        : sticker
    ));
  };

  const endDrag = () => {
    setDraggedSticker(null);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent, stickerId: number) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY, stickerId);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updateDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent, stickerId: number) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, stickerId);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    updateDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    endDrag();
  };

  useEffect(() => {
    if (draggedSticker !== null) {
      // Add both mouse and touch event listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggedSticker, dragOffset]);

  // Calculate curved path for each sticker to convergence point
  const calculateStickerPosition = (sticker: StickerData, scrollProgress: number) => {
    if (draggedSticker === sticker.id) {
      return { x: sticker.x, y: sticker.y, opacity: 1, scale: 1.1, rotation: 0 };
    }

    // Convergence point at top-right (where arrow points)
    const convergenceX = window.innerWidth - 50;
    const convergenceY = 50;
    
    // Original position (initial position)
    const startX = sticker.x;
    const startY = sticker.y;
    
    // Create curved path using bezier-like calculation
    // Each sticker gets different curve characteristics
    const curveIntensity = 0.3 + (sticker.id * 0.1); // Different curves for each sticker
    const midpointX = startX + (convergenceX - startX) * 0.6 + (Math.sin(sticker.id) * 100 * curveIntensity);
    const midpointY = startY + (convergenceY - startY) * 0.4 - (50 * curveIntensity);
    
    // Calculate position along the curved path
    const t = Math.min(scrollProgress, 1); // Clamp to 1
    const easeT = 1 - Math.pow(1 - t, 3); // Ease-out cubic for smooth acceleration
    
    // Quadratic bezier curve: P = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
    const x = Math.pow(1 - easeT, 2) * startX + 
              2 * (1 - easeT) * easeT * midpointX + 
              Math.pow(easeT, 2) * convergenceX;
              
    const y = Math.pow(1 - easeT, 2) * startY + 
              2 * (1 - easeT) * easeT * midpointY + 
              Math.pow(easeT, 2) * convergenceY;
    
    // Calculate effects based on progress
    const opacity = Math.max(0, 1 - (scrollProgress * 1.2)); // Fade out faster
    const scale = Math.max(0.3, 1 - (scrollProgress * 0.7)); // Scale down
    const rotation = scrollProgress * 360 * (sticker.id % 2 === 0 ? 1 : -1); // Rotate alternating directions
    
    return { x, y, opacity, scale, rotation };
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial hero animations
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out'
    }).fromTo(subtitleRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.8');

    // Handle scroll for arrow fade and sticker convergence animations
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-60" />
      
      {/* Draggable PNG stickers and profile */}
      {stickers.map((sticker) => {
        // Calculate scroll progress (0 to 1 over first 800px of scroll)
        const scrollProgress = Math.min(scrollY / 800, 1);
        const stickerPos = calculateStickerPosition(sticker, scrollProgress);
        
        return (
          <img 
            key={sticker.id}
            src={sticker.src} 
            alt={sticker.alt}
            className={`draggable-sticker ${sticker.size} ${draggedSticker === sticker.id ? 'dragging' : ''} ${
              sticker.id === 5 ? 'rounded-full object-cover shadow-lg' : ''
            }`}
            style={{
              position: 'fixed',
              left: `${stickerPos.x}px`,
              top: `${stickerPos.y}px`,
              zIndex: draggedSticker === sticker.id ? 50 : 20,
              opacity: stickerPos.opacity,
              transform: `scale(${stickerPos.scale}) rotate(${stickerPos.rotation}deg)`,
              transition: draggedSticker === sticker.id ? 'none' : 'all 0.1s ease-out',
              cursor: 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, sticker.id)}
            onTouchStart={(e) => handleTouchStart(e, sticker.id)}
            draggable={false}
          />
        );
      })}

      <div ref={heroRef} className="w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 ref={titleRef} className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-4 md:mb-6 leading-none tracking-wide">
              <span className="gradient-text cursor-hover">Hi !</span><span className="text-heading" id="kshitij-text">, I'm Kshitij</span>
            </h1>
            
            <p ref={subtitleRef} className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl text-body max-w-4xl leading-[1.4] mb-6 md:mb-8 tracking-wide">
              a <SimpleDesigner /> who believes in the power of warmth, wit,
              <br className="hidden sm:block" />
              and good visual storytelling.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll down arrow */}
      <div 
        className="scroll-arrow"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <img 
          src="/lovable-uploads/67843970-e07e-4e59-84de-0c9151dc63a7.png" 
          alt="Scroll down"
          className="w-8 h-12 md:w-10 md:h-16"
        />
      </div>

    </section>
  );
};

// Selected Work Section as separate component
export const SelectedWorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = [{
    title: 'Opendoor/Mainstay',
    category: 'Brand & website launch',
    year: '2024',
    description: 'Led the design of the public launch of Mainstay, Opendoor\'s enterprise branch, from the full website experience to brand identity.',
    color: 'from-purple-400 to-purple-600'
  }, {
    title: 'Interactive Platform', 
    category: 'Product Design',
    year: '2024',
    description: 'Designing highly interactive platforms to storytelling microsites, we stand above the noise, creating engaging web experiences.',
    color: 'from-blue-400 to-blue-600'
  }, {
    title: 'Figma for Education',
    category: 'Educational Tools', 
    year: '2023',
    description: 'Comprehensive design system and learning platform for educational institutions using Figma.',
    color: 'from-green-400 to-green-600'
  }, {
    title: 'Coffee Shop Menu',
    category: 'Print Design',
    year: '2023', 
    description: 'Modern, clean menu design for a local coffee shop with focus on readability and brand consistency.',
    color: 'from-orange-400 to-orange-600'
  }];

  return (
    <section 
      id="selected-work" 
      className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 relative"
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
    >
      <div className="w-full max-w-6xl mx-auto frosted-glass p-8 md:p-12">
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-heading mb-12 md:mb-16 tracking-wide text-center">
          Selected Work
        </h2>
        
        <div className="space-y-6 md:space-y-8 relative">
          {projects.map((project, index) => {
            const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              <a 
                key={index}
                href={`/project/${projectId}`}
                className="block border-b border-gray-200 pb-6 md:pb-8 cursor-hover group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-heading tracking-wide group-hover:text-link transition-colors duration-500">
                    {project.title}
                  </h3>
                  <span className="font-rethink text-sm md:text-base text-body">{project.year}</span>
                </div>
                <p className="font-rethink text-body text-sm md:text-base font-medium mb-2 md:mb-3">{project.category}</p>
                <p className="font-rethink text-body leading-relaxed text-sm md:text-base max-w-full md:max-w-4xl">{project.description}</p>
              </a>
            );
          })}

          {/* Hover image preview - follows mouse cursor */}
          {hoveredProject !== null && (
            <div 
              className="fixed pointer-events-none z-50 transition-all duration-200"
              style={{
                left: `${mousePosition.x + 20}px`,
                top: `${mousePosition.y - 60}px`,
              }}
            >
              <div className="project-hover-image p-4 w-24 h-24 flex items-center justify-center">
                <div className={`w-full h-full bg-gradient-to-br ${projects[hoveredProject].color} rounded-lg flex items-center justify-center text-white font-semibold text-xs text-center`}>
                  {projects[hoveredProject].title}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};