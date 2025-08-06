import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
          stagger: 0.3,
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
      features: [
        'Curriculum designed by Industry leaders for maximum impact.',
        'Track your growth instantly with personalized dashboards.',
        'Master skills through interactive and immersive learning.'
      ]
    },
    {
      title: 'ChikitSakhi',
      category: 'Process Design | UX Design', 
      description: 'designing processes in hospitals for better crowd management'
    }
  ];

  return (
    <section id="work" ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2
          ref={titleRef}
          className="font-playfair text-4xl md:text-6xl lg:text-7xl font-light text-heading mb-12 md:mb-20 text-left tracking-[-0.06em]"
        >
          work.
        </h2>

        <div ref={cardsRef} className="space-y-12 md:space-y-20">
          {/* VLearn Project - Large Card */}
          <div className="relative w-full">
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 min-h-[600px] md:min-h-[700px] relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-20">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/30"></div>
              </div>
              <div className="absolute top-16 right-16 md:top-24 md:right-24 opacity-10">
                <div className="text-white/20 font-bold text-6xl md:text-8xl">VLearn</div>
              </div>
              
              {/* Laptop mockup */}
              <div className="absolute top-16 md:top-20 left-8 md:left-12 w-[280px] md:w-[400px] lg:w-[500px]">
                <img 
                  src="/lovable-uploads/dee3e861-b91d-4cbf-a4c2-d12d0c7ca51d.png"
                  alt="VLearn Dashboard"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>

              {/* Features list */}
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 text-white">
                <div className="space-y-3 md:space-y-4">
                  {projects[0].features?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0"></div>
                      <p className="font-rethink text-sm md:text-base leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Project title below */}
            <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
              <h3 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-heading tracking-[-0.04em]">
                {projects[0].title}
              </h3>
              <p className="font-rethink text-sm md:text-lg text-body font-medium">
                {projects[0].category}
              </p>
              <p className="font-rethink text-sm md:text-base text-body leading-relaxed max-w-2xl">
                {projects[0].description}
              </p>
            </div>
          </div>

          {/* ChikitSakhi Project - Large Card */}
          <div className="relative w-full">
            <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 min-h-[500px] md:min-h-[600px] relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-8 right-8 md:top-12 md:right-12">
                <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-blue-200 via-yellow-200 to-green-200 rounded-2xl opacity-60"></div>
              </div>
              <div className="absolute top-12 right-12 md:top-16 md:right-16 text-6xl md:text-8xl opacity-10 font-light">
                chikitsakhi
              </div>
              <div className="absolute top-16 right-16 md:top-20 md:right-20 text-sm md:text-base text-gray-400 font-medium">
                a companion for your medical care
              </div>
              
              {/* Mobile mockups */}
              <div className="absolute top-16 md:top-20 right-8 md:right-12 w-[200px] md:w-[300px]">
                <img 
                  src="/lovable-uploads/795238ff-66db-4d57-9f54-247cf4e90186.png"
                  alt="ChikitSakhi Mobile App"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Project title below */}
            <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
              <h3 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-heading tracking-[-0.04em]">
                {projects[1].title}
              </h3>
              <p className="font-rethink text-sm md:text-lg text-body font-medium">
                {projects[1].category}
              </p>
              <p className="font-rethink text-sm md:text-base text-body leading-relaxed max-w-2xl">
                {projects[1].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};