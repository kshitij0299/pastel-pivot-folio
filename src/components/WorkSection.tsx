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
      title: 'VLearn: Hero Vired Internship',
      category: 'UX Research | Web Product Design',
      description: 'a web based learning dashboard for upskilling courses',
      mockupUrl: '/lovable-uploads/795238ff-66db-4d57-9f54-247cf4e90186.png',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      title: 'ChikitSakhi',
      category: 'Process Design | UX Design', 
      description: 'designing processes in hospitals for better crowd management',
      mockupUrl: '/lovable-uploads/795238ff-66db-4d57-9f54-247cf4e90186.png',
      bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200'
    }
  ];

  return (
    <section id="work" ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2
          ref={titleRef}
          className="font-playfair text-4xl md:text-6xl font-light text-heading mb-12 md:mb-16 text-left tracking-[-0.06em]"
        >
          work.
        </h2>

        <div ref={cardsRef} className="space-y-8 md:space-y-12 max-w-4xl">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Large mockup area */}
              <div className={`relative w-full h-[300px] md:h-[500px] ${project.bgColor} rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8`}>
                <img 
                  src={project.mockupUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Project info */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-playfair text-xl md:text-3xl lg:text-4xl font-light text-heading tracking-[-0.04em]">
                  {project.title}
                </h3>
                <p className="font-rethink text-sm md:text-lg text-body font-medium">
                  {project.category}
                </p>
                <p className="font-rethink text-sm md:text-base text-body leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};