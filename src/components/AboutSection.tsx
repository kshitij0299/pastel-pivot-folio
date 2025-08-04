import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && imageRef.current) {
      gsap.fromTo(
        [textRef.current, imageRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div ref={textRef}>
            <h2 className="font-playfair text-4xl md:text-5xl font-light text-heading mb-8 tracking-[-0.06em]">
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
              
              <p className="font-rethink">
                I'm a designer making playful and purposeful products. After hours, I run
                <span className="text-link cursor-hover"> Meridrop</span>, my independent art and clothing brand.
              </p>
              <p className="font-rethink">
                Currently working at Google, I focus on creating intuitive digital experiences
                that balance functionality with delight. My background spans from interactive
                platforms to storytelling microsites, always with an eye for motion and
                interaction design.
              </p>
              <p className="font-rethink">
                When I'm not designing, you'll find me exploring new creative tools,
                experimenting with generative art, or working on personal projects that
                push the boundaries of traditional design.
              </p>
              
              <p className="font-playfair italic text-lg md:text-xl tracking-[-0.06em]">
                Let's make something <em>lovely</em>.
              </p>
            </div>

          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-square bg-gradient-to-br from-accent-purple to-accent-aqua rounded-3xl p-8 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <span className="text-6xl">🎲</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};