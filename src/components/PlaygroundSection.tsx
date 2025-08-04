import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PlaygroundSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemsRef.current) {
      const items = itemsRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const playgroundItems = [
    {
      title: 'Generative Art Series',
      description: 'Exploring algorithmic beauty through code',
      color: '#F9E0FF',
      icon: '🎨',
    },
    {
      title: 'Motion Experiments',
      description: 'Pushing the boundaries of web animation',
      color: '#C5FAFF',
      icon: '⚡',
    },
    {
      title: 'Interactive Prototypes',
      description: 'Testing new interaction paradigms',
      color: '#FFEAEF',
      icon: '🔮',
    },
    {
      title: 'Typography Studies',
      description: 'Custom lettering and type design',
      color: '#E3FBE8',
      icon: '✍️',
    },
  ];

  return (
    <section id="playground" ref={sectionRef} className="min-h-screen py-16 md:py-24 bg-background">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 md:mb-8 tracking-[-0.06em]">
            Playground
          </h2>
          <p className="font-rethink text-base md:text-lg lg:text-xl text-body max-w-full md:max-w-4xl mx-auto leading-relaxed">
            A space for experimentation, personal projects, and creative exploration.
          </p>
        </div>

        <div ref={itemsRef} className="space-y-6 md:space-y-8">
          {playgroundItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 md:pb-8 cursor-hover group">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-heading tracking-[-0.06em] group-hover:text-link transition-colors duration-500">
                  {item.title}
                </h3>
                <span className="text-2xl md:text-4xl">{item.icon}</span>
              </div>
              <p className="font-rethink text-body leading-relaxed text-sm md:text-base max-w-full md:max-w-4xl">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};