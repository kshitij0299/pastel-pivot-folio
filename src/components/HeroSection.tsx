import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradualBlur from '@/components/GradualBlur';
import ColorBends from '@/components/ColorBends';
import GradientText from '@/components/GradientText';
import SplitText from '@/components/SplitText';
import GlassSurface from '@/components/GlassSurface';
gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleTitleAnimationComplete = () => {
    // Animate subtitle after title animation completes
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => {
          // Dispatch event to trigger navigation animation
          window.dispatchEvent(new CustomEvent('subtitleAnimationComplete'));
        }
      });
    }
  };

  useEffect(() => {
    // Only set up button animation on mobile
    if (!isMobile) return;

    // Listen for subtitle animation complete to animate button
    const handleSubtitleComplete = () => {
      // Animate button up from bottom - 2.5x slower than before (1.33 * 2.5 = 3.325)
      // Only animate y position, no opacity fade, no easing
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          y: 0,
          duration: 3.325,
          ease: 'none'
        });
      }
    };

    window.addEventListener('subtitleAnimationComplete', handleSubtitleComplete as EventListener);
    
    return () => {
      window.removeEventListener('subtitleAnimationComplete', handleSubtitleComplete as EventListener);
    };
  }, [isMobile]);

  useEffect(() => {
    // Set initial subtitle state
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 30
      });
    }

    // Optimized scroll handler with requestAnimationFrame throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Set initial button state only on mobile
  useEffect(() => {
    if (!isMobile || !buttonRef.current) return;
    
    // Set initial button state (hidden below viewport, but fully visible for glass effects)
    const startY = window.innerHeight * 0.5 + 100; // Half viewport + extra margin
    gsap.set(buttonRef.current, {
      opacity: 1,
      y: startY
    });
  }, [isMobile]);
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 bg-black">
      {/* ColorBends background */}
      <div className="absolute inset-0 w-full h-full z-0" style={{ width: '100%', height: '100%' }}>
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={0}
          autoRotate={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div ref={heroRef} className="w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex-1">
            <h1 className="font-rethink text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-none tracking-wide text-white">
              <SplitText
                text="Hi !   I'm   Kshitij"
                className="text-white cursor-hover"
                delay={77}
                duration={0.46}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleTitleAnimationComplete}
              />
            </h1>
            
            <p ref={subtitleRef} className="font-rethink text-lg sm:text-xl md:text-2xl lg:text-3xl text-white max-w-4xl leading-[1.4] mb-[72px] md:mb-[96px] tracking-wide font-medium">
              a <GradientText
                colors={["#ff6b9d", "#00d4ff", "#5dade2", "#7fffd4", "#fff9c4", "#ffb3ba", "#ff6b9d"]}
                animationSpeed={6}
                showBorder={false}
                className=""
              >
                <em>designer</em>
              </GradientText> who believes in the power of warmth, wit,
              <br className="hidden sm:block" />
              and good visual storytelling.
            </p>
            
            {/* Get in touch button - mobile only */}
            <div ref={buttonRef} className="mt-[56px] md:mt-[64px] md:hidden">
              <GlassSurface
                width="auto"
                borderRadius={28}
                backgroundOpacity={0}
                className=""
                onClick={() => window.location.href = 'mailto:kshitij0299@gmail.com'}
              >
                <div className="flex items-center justify-center px-8 py-4 font-rethink text-lg font-medium cursor-hover text-white">
                  Get in touch
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </GlassSurface>
            </div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={10}
        />
      )}
    </section>
  );
};

// Selected Work Section as separate component
export const SelectedWorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
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
  return <section id="selected-work" className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 relative" onMouseMove={e => setMousePosition({
    x: e.clientX,
    y: e.clientY
  })}>
      <div className="w-full max-w-6xl mx-auto frosted-glass p-8 md:p-12">
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-heading mb-12 md:mb-16 tracking-wide text-center">
          Selected Work
        </h2>
        
        <div className="space-y-6 md:space-y-8 relative">
          {projects.map((project, index) => {
          const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return <a key={index} href={`/project/${projectId}`} className="block border-b border-gray-200 pb-6 md:pb-8 cursor-hover group relative" onMouseEnter={() => setHoveredProject(index)} onMouseLeave={() => setHoveredProject(null)}>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-heading tracking-wide group-hover:text-link transition-colors duration-500">
                    {project.title}
                  </h3>
                  <span className="font-rethink text-sm md:text-base text-body">{project.year}</span>
                </div>
                <p className="font-rethink text-body text-sm md:text-base font-medium mb-2 md:mb-3">{project.category}</p>
                <p className="font-rethink text-body leading-relaxed text-sm md:text-base max-w-full md:max-w-4xl">{project.description}</p>
              </a>;
        })}

          {/* Hover image preview - follows mouse cursor */}
          {hoveredProject !== null && <div className="fixed pointer-events-none z-50 transition-all duration-200" style={{
          left: `${mousePosition.x + 20}px`,
          top: `${mousePosition.y - 60}px`
        }}>
              <div className="project-hover-image p-4 w-24 h-24 flex items-center justify-center">
                <div className={`w-full h-full bg-gradient-to-br ${projects[hoveredProject].color} rounded-lg flex items-center justify-center text-white font-semibold text-xs text-center`}>
                  {projects[hoveredProject].title}
                </div>
              </div>
            </div>}
        </div>
      </div>
    </section>;
};