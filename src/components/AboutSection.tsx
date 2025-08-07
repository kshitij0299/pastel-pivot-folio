import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const coffeeRef = useRef<HTMLImageElement>(null);
  const macbookRef = useRef<HTMLImageElement>(null);
  const keyboardRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (textRef.current && imageRef.current && coffeeRef.current && macbookRef.current && keyboardRef.current) {
      // Create a timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      });

      // Phase 1: Existing text and image fade-in
      tl.fromTo([textRef.current, imageRef.current], {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      })
      
      // Phase 2: Decorative elements enter from right with cartoony bounce
      .fromTo(coffeeRef.current, {
        x: 200,
        opacity: 0,
        rotation: -15,
        scale: 0.8
      }, {
        x: 0,
        opacity: 0.8,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: 'bounce.out'
      }, '-=0.3')
      
      .fromTo(macbookRef.current, {
        x: 250,
        opacity: 0,
        rotation: 10,
        scale: 0.9
      }, {
        x: 0,
        opacity: 0.7,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: 'bounce.out'
      }, '-=0.6')
      
      .fromTo(keyboardRef.current, {
        x: 180,
        opacity: 0,
        rotation: -10,
        scale: 0.8
      }, {
        x: 0,
        opacity: 0.75,
        rotation: 0,
        scale: 1,
        duration: 0.9,
        ease: 'bounce.out'
      }, '-=0.7');

      // Add subtle floating animation after entrance
      gsap.to([coffeeRef.current, macbookRef.current, keyboardRef.current], {
        y: '+=8',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
        delay: 2
      });
    }
  }, []);
  return <section id="about" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div ref={textRef}>
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-heading mb-8 tracking-wide">
              About Me
            </h2>
            <div className="space-y-6 text-body leading-relaxed">
              <p className="font-rethink">
                I make things look good and feel right. From branding and social media to 
                illustrations and UI/UX, my work leans into clarity, intention, and a little 
                charm. I've worked across fashion, wellness, and tech—always with one goal: 
                to make people feel something (and maybe smile a little).
              </p>
              
              <p className="font-rethink">
                Outside the pixels, I'm into ambient music, culture.
              </p>
              
              
              
              
              
              <p className="font-playfair italic text-lg md:text-xl tracking-wide">
                Let's make something <em>lovely</em>.
              </p>
            </div>

          </div>

          <div ref={imageRef} className="relative overflow-hidden h-96 lg:h-[500px]">
            {/* Coffee Cup - Top Right */}
            <img 
              ref={coffeeRef}
              src="/lovable-uploads/26129708-a75e-4069-b7c3-ae0c75f09b00.png" 
              alt="Coffee cup decoration"
              className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain z-0 will-change-transform hidden sm:block"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            />
            
            {/* MacBook - Center */}
            <img 
              ref={macbookRef}
              src="/lovable-uploads/67843970-e07e-4e59-84de-0c9151dc63a7.png" 
              alt="MacBook decoration"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 md:w-56 md:h-36 lg:w-64 lg:h-40 object-contain z-0 will-change-transform"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
            />
            
            {/* Keyboard - Bottom Left */}
            <img 
              ref={keyboardRef}
              src="/lovable-uploads/795238ff-66db-4d57-9f54-247cf4e90186.png" 
              alt="Keyboard decoration"
              className="absolute bottom-4 left-4 w-20 h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 object-contain z-0 will-change-transform"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            />
          </div>
        </div>
      </div>
    </section>;
};