import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  const projects = [
    {
      title: 'Opendoor/Mainstay',
      category: 'Brand & website launch',
      year: '2024',
      description: 'Led the design of the public launch of Mainstay, Opendoor\'s enterprise branch, from the full website experience to brand identity.',
      tags: ['Branding', 'Web Design', 'UI/UX'],
      color: '#FFF8E1',
    },
    {
      title: 'Interactive Platform',
      category: 'Product Design',
      year: '2024',
      description: 'Designing highly interactive platforms to storytelling microsites, we stand above the noise, creating engaging web experiences.',
      tags: ['UI/UX', 'Interactive', 'Motion'],
      color: '#E3FBE8',
    },
    {
      title: 'Figma for Education',
      category: 'Educational Tools',
      year: '2023',
      description: 'Comprehensive design system and learning platform for educational institutions using Figma.',
      tags: ['Education', 'Design System', 'Personal'],
      color: '#DDE9FB',
    },
    {
      title: 'Coffee Shop Menu',
      category: 'Print Design',
      year: '2023',
      description: 'Modern, clean menu design for a local coffee shop with focus on readability and brand consistency.',
      tags: ['Print', 'Branding', 'Personal'],
      color: '#FCE8F7',
    },
  ];

  return (
    <section id="work" ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="font-playfair text-4xl md:text-6xl font-light text-heading mb-16 text-center tracking-[-0.06em]"
        >
          Selected Work
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};