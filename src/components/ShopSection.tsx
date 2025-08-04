import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ShopSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, rotation: -5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const shopItems = [
    {
      title: 'Meridrop Collection',
      description: 'Handcrafted art prints and clothing',
      price: 'From $25',
      color: '#FCE8F7',
    },
    {
      title: 'Design Templates',
      description: 'Professional Figma templates and resources',
      price: 'From $15',
      color: '#DDE9FB',
    },
    {
      title: 'Workshop Series',
      description: 'Learn design fundamentals and advanced techniques',
      price: 'From $99',
      color: '#E3FBE8',
    },
  ];

  return (
    <section id="shop" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-6xl font-light text-heading mb-4 tracking-[-0.06em]">
            Shop
          </h2>
          <p className="font-rethink text-lg text-body max-w-2xl mx-auto">
            Curated collection of design resources, art prints, and educational content.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {shopItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-8 cursor-hover transition-all duration-300 hover:scale-105 hover:-rotate-1"
              style={{ backgroundColor: item.color }}
            >
              <div className="relative z-10">
                <h3 className="font-playfair text-xl font-semibold text-heading mb-3 tracking-[-0.06em]">
                  {item.title}
                </h3>
                <p className="font-rethink text-body mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-playfair text-lg font-semibold text-heading tracking-[-0.06em]">
                    {item.price}
                  </span>
                  <button className="font-rethink bg-white/80 hover:bg-white text-heading px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    View
                  </button>
                </div>
              </div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};