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
    <section id="playground" ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-6xl font-light text-heading mb-4 tracking-[-0.06em]">
            Playground
          </h2>
          <p className="font-rethink text-lg text-body max-w-2xl mx-auto">
            A space for experimentation, personal projects, and creative exploration.
          </p>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {playgroundItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-6 cursor-hover transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: item.color }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-heading mb-2 tracking-[-0.06em]">
                {item.title}
              </h3>
              <p className="font-rethink text-sm text-body">
                {item.description}
              </p>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};