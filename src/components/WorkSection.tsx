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
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%'
        }
      });
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards, {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%'
        }
      });
    }
  }, []);
  const projects = [{
    title: 'Plentum',
    category: 'UX Research | Web Product Design',
    description: 'a web based learning dashboard for upskilling courses',
    features: ['Curriculum designed by Industry leaders for maximum impact.', 'Track your growth instantly with personalized dashboards.', 'Master skills through interactive and immersive learning.']
  }, {
    title: 'ChikitSakhi',
    category: 'Process Design | UX Design',
    description: 'designing processes in hospitals for better crowd management'
  }, {
    title: 'Figma for Education',
    category: 'Educational Tools | Design System',
    description: 'comprehensive design system and learning platform for educational institutions'
  }, {
    title: 'Coffee Shop Menu',
    category: 'Print Design | Branding',
    description: 'modern, clean menu design for a local coffee shop with focus on readability'
  }];
  return <section id="work" ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 ref={titleRef} className="font-playfair text-4xl md:text-6xl lg:text-7xl font-light text-heading mb-12 md:mb-20 text-left tracking-[-0.06em]">
          work.
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* VLearn Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6">
              {/* Background decoration */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-20">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border border-white/30"></div>
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-10">
                <div className="text-white/20 font-bold text-2xl md:text-4xl">VLearn</div>
              </div>
              
              {/* Learning elements */}
              <div className="absolute top-12 md:top-16 left-6 md:left-8 space-y-3">
                <div className="w-16 h-3 md:w-20 md:h-4 bg-white/30 rounded"></div>
                <div className="w-12 h-3 md:w-16 md:h-4 bg-white/20 rounded"></div>
                <div className="w-20 h-3 md:w-24 md:h-4 bg-white/25 rounded"></div>
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
                
              </div>
              
              
              
              {/* Mobile mockups */}
              <div className="absolute top-12 md:top-16 right-6 md:right-8 w-[140px] md:w-[200px]">
                
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

          {/* Figma for Education Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6">
              {/* Background decoration */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-20">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border border-white/30"></div>
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-10">
                <div className="text-white/20 font-bold text-3xl md:text-5xl">Figma</div>
              </div>
              
              {/* Design elements */}
              <div className="absolute top-12 md:top-16 left-6 md:left-8 space-y-3">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-lg"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white/30 rounded-full"></div>
                <div className="w-16 h-4 md:w-20 md:h-6 bg-white/25 rounded"></div>
              </div>
            </div>
            
            {/* Project title below */}
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-light text-heading tracking-[-0.04em]">
                {projects[2].title}
              </h3>
              <p className="font-rethink text-sm md:text-base text-body font-medium">
                {projects[2].category}
              </p>
              <p className="font-rethink text-xs md:text-sm text-body leading-relaxed">
                {projects[2].description}
              </p>
            </div>
          </div>

          {/* Coffee Shop Menu Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6">
              {/* Background decoration */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-20">
                <div className="w-20 h-28 md:w-24 md:h-32 bg-white/20 rounded-lg"></div>
              </div>
              <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-10">
                <div className="text-white/20 font-bold text-2xl md:text-4xl">MENU</div>
              </div>
              
              {/* Menu elements */}
              <div className="absolute top-12 md:top-16 left-6 md:left-8 space-y-2">
                <div className="w-20 h-3 md:w-24 md:h-4 bg-white/30 rounded"></div>
                <div className="w-16 h-2 md:w-20 md:h-3 bg-white/20 rounded"></div>
                <div className="w-24 h-2 md:w-28 md:h-3 bg-white/25 rounded"></div>
              </div>
            </div>
            
            {/* Project title below */}
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-light text-heading tracking-[-0.04em]">
                {projects[3].title}
              </h3>
              <p className="font-rethink text-sm md:text-base text-body font-medium">
                {projects[3].category}
              </p>
              <p className="font-rethink text-xs md:text-sm text-body leading-relaxed">
                {projects[3].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};