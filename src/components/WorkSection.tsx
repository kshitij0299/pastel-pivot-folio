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

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* VLearn Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6">
              {/* Background decoration */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-20">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30"></div>
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-10">
                <div className="text-white/20 font-bold text-4xl md:text-6xl">VLearn</div>
              </div>
              
              {/* Laptop mockup */}
              <div className="absolute top-12 md:top-16 left-6 md:left-8 w-[200px] md:w-[280px] lg:w-[320px]">
                <img 
                  src="/lovable-uploads/dee3e861-b91d-4cbf-a4c2-d12d0c7ca51d.png"
                  alt="VLearn Dashboard"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>

              {/* Features list */}
              <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 text-white">
                <div className="space-y-2 md:space-y-3">
                  {projects[0].features?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="font-rethink text-xs md:text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Project title below */}
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-light text-heading tracking-[-0.04em]">
                {projects[0].title}
              </h3>
              <p className="font-rethink text-sm md:text-base text-body font-medium">
                {projects[0].category}
              </p>
              <p className="font-rethink text-xs md:text-sm text-body leading-relaxed">
                {projects[0].description}
              </p>
            </div>
          </div>

          {/* ChikitSakhi Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6">
              {/* Background decoration */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-200 via-yellow-200 to-green-200 rounded-2xl opacity-60"></div>
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 text-4xl md:text-6xl opacity-10 font-light">
                chikitsakhi
              </div>
              <div className="absolute top-12 right-12 md:top-16 md:right-16 text-xs md:text-sm text-gray-400 font-medium">
                a companion for your medical care
              </div>
              
              {/* Mobile mockups */}
              <div className="absolute top-12 md:top-16 right-6 md:right-8 w-[140px] md:w-[200px]">
                <img 
                  src="/lovable-uploads/795238ff-66db-4d57-9f54-247cf4e90186.png"
                  alt="ChikitSakhi Mobile App"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Project title below */}
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-light text-heading tracking-[-0.04em]">
                {projects[1].title}
              </h3>
              <p className="font-rethink text-sm md:text-base text-body font-medium">
                {projects[1].category}
              </p>
              <p className="font-rethink text-xs md:text-sm text-body leading-relaxed">
                {projects[1].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};