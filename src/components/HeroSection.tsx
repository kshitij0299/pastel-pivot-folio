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
  const avatarRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Simple fade in animations
    tl.fromTo([avatarRef.current, descriptionRef.current, nameRef.current], {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2
    });

    // Handle scroll for Selected Work reveal
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Show Selected Work when scrolling past 60% of viewport
      if (scrolled > windowHeight * 0.6) {
        const workSection = document.getElementById('selected-work');
        if (workSection && !workSection.classList.contains('revealed')) {
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
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-60" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-4 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-accent-purple rounded-full animate-float" style={{
        animationDelay: '0s'
      }} />
      <div className="absolute top-32 right-4 md:right-20 md:top-40 w-4 h-4 md:w-6 md:h-6 bg-accent-aqua rounded-full animate-float" style={{
        animationDelay: '2s'
      }} />
      <div className="absolute bottom-32 left-8 md:left-20 md:bottom-40 w-2 h-2 md:w-3 md:h-3 bg-accent-blush rounded-full animate-float" style={{
        animationDelay: '4s'
      }} />

      <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <div 
          ref={avatarRef}
          className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8"
        >
          <img 
            src="/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png" 
            alt="Kshitij"
            className="w-full h-full rounded-full object-cover shadow-lg"
          />
        </div>
        
        {/* Description */}
        <p ref={descriptionRef} className="font-rethink text-sm md:text-base lg:text-lg text-body max-w-2xl mx-auto mb-16 md:mb-20">
          a <AnimatedDesigner /> who believes in the power of warmth, wit,
          and good visual storytelling.
        </p>

        {/* Large Name */}
        <h1 ref={nameRef} className="font-playfair text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-heading leading-none tracking-[-0.06em]">
          Kshitij Rana
        </h1>
      </div>

      {/* Selected Work section - initially hidden, reveals on scroll */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mt-32 opacity-0" id="selected-work">
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-heading mb-12 md:mb-16 tracking-[-0.06em] text-center">
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
    </section>
  );
};