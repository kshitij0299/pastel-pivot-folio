import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SimpleDesigner = () => {
  return (
    <span className="font-pixelify text-body">designer</span>
  );
};

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const sticker1Ref = useRef<HTMLImageElement>(null);
  const sticker2Ref = useRef<HTMLImageElement>(null);
  const sticker3Ref = useRef<HTMLImageElement>(null);
  const sticker4Ref = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(0);

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

    // Sticker fade animations (no spinning, permanent fade like arrow)
    const stickers = [sticker1Ref.current, sticker2Ref.current, sticker3Ref.current, sticker4Ref.current];
    
    stickers.forEach((sticker, index) => {
      if (sticker) {
        gsap.to(sticker, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "400px top",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              // Start fading later than the arrow (after 50% scroll vs 30% for arrow)
              const fadeStart = 0.5;
              if (progress > fadeStart) {
                const fadeProgress = (progress - fadeStart) / (1 - fadeStart);
                gsap.set(sticker, { 
                  opacity: Math.max(0, 1 - fadeProgress)
                });
              }
            }
          }
        });
      }
    });

    // Handle scroll for arrow fade
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
      
      {/* Floating PNG stickers */}
      <img 
        ref={sticker1Ref}
        src="/lovable-uploads/f2c4c868-233a-4093-a243-41fe24f44a1b.png" 
        alt="Decorative sticker"
        className="floating-sticker w-20 h-20 md:w-24 md:h-24 top-20 left-4 md:left-10"
      />
      <img 
        ref={sticker2Ref}
        src="/lovable-uploads/26129708-a75e-4069-b7c3-ae0c75f09b00.png" 
        alt="Decorative sticker"
        className="floating-sticker w-20 h-20 md:w-24 md:h-24 top-32 right-4 md:right-20"
      />
      <img 
        ref={sticker3Ref}
        src="/lovable-uploads/19dad77f-e13e-4f9d-b410-b68a7d608120.png" 
        alt="Decorative sticker"
        className="floating-sticker w-18 h-18 md:w-22 md:h-22 bottom-32 left-8 md:left-20"
      />
      <img 
        ref={sticker4Ref}
        src="/lovable-uploads/11f551e2-1441-4d62-b3f3-f9bcc1a071fa.png" 
        alt="Decorative sticker"
        className="floating-sticker w-18 h-18 md:w-22 md:h-22 bottom-20 right-8 md:right-16"
      />

      <div ref={heroRef} className="w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 ref={titleRef} className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-4 md:mb-6 leading-none tracking-[-0.06em]">
              <span className="gradient-text cursor-hover">Hi !</span><span className="text-heading">, I'm Kshitij</span>
            </h1>
            
            <p ref={subtitleRef} className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl text-body max-w-4xl leading-[1.4] mb-6 md:mb-8 tracking-[-0.06em]">
              a <SimpleDesigner /> who believes in the power of warmth, wit,
              <br className="hidden sm:block" />
              and good visual storytelling.
            </p>
          </div>
          
          {/* Floating profile image */}
          <div 
            ref={profileRef}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 cursor-hover md:ml-8 mx-auto md:mx-0 mt-6 md:mt-0"
          >
            <img 
              src="/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png" 
              alt="Kshitij"
              className="w-full h-full rounded-full object-cover animate-float shadow-lg"
            />
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
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-heading mb-12 md:mb-16 tracking-[-0.06em] text-center">
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
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-heading tracking-[-0.06em] group-hover:text-link transition-colors duration-500">
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