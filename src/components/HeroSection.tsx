import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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
        <h1 ref={titleRef} className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-heading mb-6 md:mb-8 leading-none tracking-[-0.06em]">
          Hi !, I'm Kshitij
        </h1>
        
        <p ref={subtitleRef} className="font-playfair text-base sm:text-lg md:text-xl text-body max-w-none md:max-w-3xl leading-relaxed mb-6 md:mb-8 tracking-[-0.06em]">
          a designer who believes in the power of warmth, wit,
          <br className="hidden sm:block" />
          and good visual storytelling.
        </p>

        <div ref={subtitleRef} className="font-playfair text-sm sm:text-base md:text-lg text-body max-w-none md:max-w-4xl leading-relaxed space-y-4 md:space-y-6 tracking-[-0.06em]">
          <p>
            I make things look good and feel right. From branding and social media to 
            illustrations and UI/UX, my work leans into clarity, intention, and a little 
            charm. I've worked across fashion, wellness, and tech—always with one goal: 
            to make people feel something (and maybe smile a little).
          </p>
          
          <p>Outside the pixels, I'm into ambient music, culture, and chasing soft light with my camera.</p>
          
          <p className="font-playfair italic text-lg md:text-xl tracking-[-0.06em]">
            Let's make something <em>lovely</em>.
          </p>
        </div>

        {/* Awards section */}
        <div className="mt-12 md:mt-16 space-y-2 md:space-y-4 max-w-none md:max-w-4xl">
          {[{
          name: 'FWA',
          count: '09'
        }, {
          name: 'The Webby Awards',
          count: '08'
        }, {
          name: 'Red Dot Design Award',
          count: '01'
        }, {
          name: 'San Francisco Design Week',
          count: '01'
        }, {
          name: 'Awwwards',
          count: '23'
        }, {
          name: 'CSS Design Award',
          count: '07'
        }].map(award => <div key={award.name} className="flex items-center justify-between py-3 md:py-4 border-b border-gray-200 cursor-hover group">
              <span className="font-playfair text-base md:text-lg text-heading font-medium group-hover:text-link transition-colors tracking-[-0.06em]">
                {award.name}
              </span>
              <span className="text-xs md:text-sm text-body font-mono">
                / {award.count}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
};