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
    <span className="inline-block relative" style={{ width: '160px' }}>
      <span
        ref={designerRef}
        className={`${fonts[currentFont]} transition-all duration-300 block text-left`}
        style={{
          lineHeight: '1.4',
          position: 'relative',
          top: 0
        }}
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
  const profileRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const workTitleRef = useRef<HTMLHeadingElement>(null);
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

    // Magnetic effect for profile picture
    const handleMouseMove = (e: MouseEvent) => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 150) { // Magnetic zone
          const strength = (150 - distance) / 150;
          const moveX = distanceX * strength * 0.3;
          const moveY = distanceY * strength * 0.3;
          
          gsap.to(profileRef.current, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(profileRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
          });
        }
      }
    };

    // Enhanced scroll animations using GSAP ScrollTrigger
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      if (heroRef.current && heroSectionRef.current) {
        const workSection = document.getElementById('selected-work');
        const workSectionTop = workSection ? workSection.offsetTop : windowHeight * 2;
        
        // Smooth transition zones
        const heroExitPoint = workSectionTop - windowHeight * 0.3;
        const heroReturnPoint = workSectionTop - windowHeight * 0.7;
        
        // Calculate hero position based on scroll
        if (scrolled > heroExitPoint) {
          // Hero moves to center when selected work takes over
          const progress = Math.min(1, (scrolled - heroExitPoint) / (windowHeight * 0.4));
          const centerY = windowHeight * 0.1; // Move to center, not completely off screen
          
          gsap.to(heroSectionRef.current, {
            y: -centerY * progress,
            opacity: Math.max(0.3, 1 - progress * 0.7),
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          // Hero returns to normal position
          gsap.to(heroSectionRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
        
        // Gentle parallax effect for hero content
        const rate = scrolled * -0.05;
        gsap.to(heroRef.current, {
          y: rate,
          duration: 0.1,
          ease: 'none'
        });
        
        // Animated gradient background on scroll
        const gradientElement = document.querySelector('.hero-gradient');
        if (gradientElement) {
          const rotation = scrolled * 0.02;
          const scale = 1 + (scrolled * 0.00005);
          gsap.to(gradientElement, {
            rotation: rotation,
            scale: scale,
            duration: 0.1,
            ease: 'none'
          });
        }
        
        // Animate selected work section reveal
        if (workSection) {
          const rect = workSection.getBoundingClientRect();
          
          if (rect.top < windowHeight * 0.8 && !workSection.classList.contains('revealed')) {
            workSection.classList.add('revealed');
            
            gsap.fromTo(workSection, {
              opacity: 0,
              y: 50
            }, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out'
            });
            
            // Animate work title
            if (workTitleRef.current) {
              gsap.fromTo(workTitleRef.current, {
                opacity: 0,
                y: 50,
                scale: 0.9
              }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: 'back.out(1.7)',
                delay: 0.3
              });
            }
          }
        }
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section ref={heroSectionRef} id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden pt-16 md:pt-20">
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
          <h1 ref={titleRef} className="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-4 md:mb-6 leading-none tracking-[-0.06em]">
            <span className="gradient-text cursor-hover">Hi !</span><span className="text-heading">, I'm Kshitij</span>
          </h1>
          
          {/* Floating profile image with magnetic effect - responsive positioning */}
          <div 
            ref={profileRef}
            className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 cursor-hover"
          >
            <img 
              src="/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png" 
              alt="Kshitij"
              className="w-full h-full rounded-full object-cover animate-float shadow-lg"
            />
          </div>
        </div>
        
        <p ref={subtitleRef} className="font-playfair text-base sm:text-lg md:text-2xl lg:text-3xl text-body max-w-none md:max-w-4xl leading-[1.4] mb-6 md:mb-8 tracking-[-0.06em]">
          a <AnimatedDesigner /> who believes in the power of warmth, wit,
          <br className="hidden sm:block" />
          and good visual storytelling.
        </p>

        {/* Selected Work section - initially hidden, takes over on scroll */}
        <div className="mt-24 md:mt-32 lg:mt-40 max-w-none md:max-w-6xl opacity-0 transform translate-y-12" id="selected-work">
          <h2 
            ref={workTitleRef}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-8 md:mb-12 lg:mb-16 tracking-[-0.06em] text-center"
          >
            Selected Work
          </h2>
          
          <div className="space-y-6 md:space-y-8">
            {[{
              title: 'Opendoor/Mainstay',
              category: 'Brand & website launch',
              year: '2024',
              description: 'Led the design of the public launch of Mainstay, Opendoor\'s enterprise branch, from the full website experience to brand identity.'
            }, {
              title: 'Interactive Platform', 
              category: 'Product Design',
              year: '2024',
              description: 'Designing highly interactive platforms to storytelling microsites, we stand above the noise, creating engaging web experiences.'
            }, {
              title: 'Figma for Education',
              category: 'Educational Tools', 
              year: '2023',
              description: 'Comprehensive design system and learning platform for educational institutions using Figma.'
            }, {
              title: 'Coffee Shop Menu',
              category: 'Print Design',
              year: '2023', 
              description: 'Modern, clean menu design for a local coffee shop with focus on readability and brand consistency.'
            }].map((project, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 md:pb-8 cursor-hover group">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-heading tracking-[-0.06em] group-hover:text-link transition-colors duration-500">
                    {project.title}
                  </h3>
                  <span className="font-rethink text-sm md:text-base text-body">{project.year}</span>
                </div>
                <p className="font-rethink text-body text-sm md:text-base font-medium mb-2 md:mb-3">{project.category}</p>
                <p className="font-rethink text-body leading-relaxed text-sm md:text-base max-w-full md:max-w-4xl">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator with GSAP animation */}
        <div className="flex justify-center mt-12 md:mt-16 lg:mt-20">
          <div className="scroll-indicator">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-body" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};