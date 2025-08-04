import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const AnimatedDesigner = () => {
  const [currentFont, setCurrentFont] = useState(0);
  const [isUnjumbling, setIsUnjumbling] = useState(true);
  const designerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  
  const fonts = [
    'font-playfair',
    'font-coral-pixels',
    'font-pixelify'
  ];

  const word = "designer";
  const scrambledLetters = "dgrsneei".split('');

  useEffect(() => {
    // Unjumbling animation
    if (designerRef.current && isUnjumbling) {
      const letters = lettersRef.current;
      
      // Initial scrambled state
      letters.forEach((letter, i) => {
        if (letter) {
          letter.textContent = scrambledLetters[i];
          gsap.set(letter, { opacity: 0.3, scale: 0.8, rotation: Math.random() * 30 - 15 });
        }
      });

      // Unjumble animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsUnjumbling(false);
        }
      });

      letters.forEach((letter, i) => {
        tl.to(letter, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (letter) letter.textContent = word[i];
          }
        }, i * 0.1);
      });
    }
  }, []);

  useEffect(() => {
    if (!isUnjumbling) {
      const interval = setInterval(() => {
        setCurrentFont((prev) => (prev + 1) % fonts.length);
      }, 800); // Faster cycling - 800ms

      return () => clearInterval(interval);
    }
  }, [isUnjumbling]);

  useEffect(() => {
    if (designerRef.current && !isUnjumbling) {
      gsap.fromTo(designerRef.current, 
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [currentFont, isUnjumbling]);

  return (
    <span 
      className="inline-block relative"
      style={{ 
        width: '140px', 
        height: '1.2em',
        verticalAlign: 'baseline'
      }}
    >
      <span
        ref={designerRef}
        className={`${fonts[currentFont]} transition-all duration-300 absolute top-0 left-0`}
      >
        {word.split('').map((letter, i) => (
          <span 
            key={i}
            ref={el => lettersRef.current[i] = el!}
            className="inline-block"
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
};
export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }).fromTo(subtitleRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6');

    // Gentle parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <section id="hero" className="relative min-h-screen flex items-start justify-start overflow-hidden pt-20 md:pt-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-60" />
      
      {/* Floating decorative elements - responsive positioning */}
      <div className="absolute top-20 left-4 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-accent-purple rounded-full animate-float" style={{
      animationDelay: '0s'
    }} />
      <div className="absolute top-32 right-4 md:right-20 md:top-40 w-4 h-4 md:w-6 md:h-6 bg-accent-aqua rounded-full animate-float" style={{
      animationDelay: '2s'
    }} />
      <div className="absolute bottom-32 left-8 md:left-20 md:bottom-40 w-2 h-2 md:w-3 md:h-3 bg-accent-blush rounded-full animate-float" style={{
      animationDelay: '4s'
    }} />

      <div ref={heroRef} className="w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl mx-auto">
        <div className="relative">
          <h1 ref={titleRef} className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-heading mb-6 md:mb-8 leading-none tracking-[-0.06em]">
            Hi !, I'm Kshitij
          </h1>
          
          {/* Floating profile image */}
          <div className="absolute top-0 right-0 md:right-8 lg:right-16 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <img 
              src="/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png" 
              alt="Kshitij"
              className="w-full h-full rounded-full object-cover animate-float shadow-lg"
            />
          </div>
        </div>
        
        <p ref={subtitleRef} className="font-playfair text-lg sm:text-xl md:text-3xl lg:text-4xl text-body max-w-none md:max-w-4xl leading-relaxed mb-6 md:mb-8 tracking-[-0.06em]">
          a <AnimatedDesigner /> who believes in the power of warmth, wit,
          <br className="hidden sm:block" />
          and good visual storytelling.
        </p>

        {/* Projects section with detailed information and hover images */}
        <div className="mt-12 md:mt-16 space-y-6 md:space-y-8 max-w-none md:max-w-6xl">
          {[{
          name: 'Opendoor/Mainstay',
          category: 'Brand & website launch',
          year: '2024',
          description: 'Led the design of the public launch of Mainstay, Opendoor\'s enterprise branch, from the full website experience to brand identity.',
          tags: ['Branding', 'Web Design', 'UI/UX'],
          color: '#FFF8E1',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
        }, {
          name: 'Interactive Platform',
          category: 'Product Design',
          year: '2024',
          description: 'Designing highly interactive platforms to storytelling microsites, we stand above the noise, creating engaging web experiences.',
          tags: ['UI/UX', 'Interactive', 'Motion'],
          color: '#E3FBE8',
          image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop'
        }, {
          name: 'Figma for Education',
          category: 'Educational Tools',
          year: '2023',
          description: 'Comprehensive design system and learning platform for educational institutions using Figma.',
          tags: ['Education', 'Design System', 'Personal'],
          color: '#DDE9FB',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
        }, {
          name: 'Coffee Shop Menu',
          category: 'Print Design',
          year: '2023',
          description: 'Modern, clean menu design for a local coffee shop with focus on readability and brand consistency.',
          tags: ['Print', 'Branding', 'Personal'],
          color: '#FCE8F7',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'
        }].map(project => <div 
            key={project.name} 
            className="relative rounded-2xl p-6 md:p-8 cursor-hover transition-all duration-300 hover:scale-105 group"
            style={{ backgroundColor: project.color }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-sm font-rethink text-body">{project.year}</div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-playfair text-xl md:text-2xl font-semibold text-heading mb-2 tracking-[-0.06em]">{project.name}</h3>
              <p className="font-rethink text-body text-sm font-medium mb-4">{project.category}</p>
              <p className="font-rethink text-body leading-relaxed mb-4">{project.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-rethink px-3 py-1 bg-white/60 rounded-full text-xs font-medium text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit site link */}
            <div className="flex items-center text-link">
              <span className="font-rethink text-sm font-medium">VISIT SITE</span>
              <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
              
            {/* Hover image */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-48 h-36 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>)}
        </div>
      </div>
    </section>;
};