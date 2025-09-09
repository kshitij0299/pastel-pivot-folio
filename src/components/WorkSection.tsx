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
    category: 'Social Media Post | Interview Assessment | Content Direction',
    description: 'Direct-to-consumer health supplements brand focused on premium wellness products and lifestyle enhancement',
    features: ['Curriculum designed by Industry leaders for maximum impact.', 'Track your growth instantly with personalized dashboards.', 'Master skills through interactive and immersive learning.']
  }, {
    title: 'The Ad Club',
    category: 'Brand Identity | Visual Design',
    description: 'Creative branding and visual identity design for advertising club from Bengaluru'
  }, {
    title: 'Timeless Beauty Secrets',
    category: 'Design | Creative Direction | Social Media Strategy',
    description: 'Comprehensive branding and social media strategy for skincare brand from Bengaluru (currently working here)'
  }, {
    title: 'Bay Nature',
    category: 'Editorial | Layout Design',
    description: 'Editorial layout design assessment for magazine featuring nature content and storytelling'
  }];
  return <section id="work" ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 ref={titleRef} className="font-playfair text-4xl md:text-6xl lg:text-7xl font-light text-heading mb-12 md:mb-20 text-left tracking-[-0.06em]">
          work.
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Plentum Project Card */}
          <div className="group cursor-pointer" onClick={() => window.open('https://drive.google.com/file/d/1Uh8cZ3S55eub1fIGuFeZ6hFEQj2AlQ_W/preview', '_blank')}>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-transform duration-300 hover:scale-105">
              {/* Plentum project image */}
              <img src="/lovable-uploads/ee03460e-9aed-4104-b034-c34d269412f7.png" alt="Plentum project showcase" className="absolute inset-0 w-full h-full object-cover" />
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

          {/* The Ad Club Project Card */}
          <div className="group cursor-pointer" onClick={() => window.open('https://drive.google.com/file/d/1aTk9PepcOYNaZjmD3Geg3RzMxcENEVD4/preview', '_blank')}>
            <div className="bg-black rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-transform duration-300 hover:scale-105">
              <img src="/lovable-uploads/ddff190e-68d3-4994-9abd-27a98cafec8e.png" alt="The Ad Club branding project" className="absolute inset-0 w-full h-full object-cover" />
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

          {/* Timeless Beauty Secrets Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-transform duration-300 hover:scale-105">
              <img src="/lovable-uploads/2711c5dc-8e65-449b-9e96-084aacf9128d.png" alt="Timeless Beauty Secrets branding" className="absolute inset-0 w-full h-full object-cover" />
              {/* Overlay button */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-body text-xs font-medium rounded-full border border-white/20 shadow-sm">Currently Working Here</span>
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

          {/* Bay Nature Project Card */}
          <div className="group cursor-pointer" onClick={() => window.open('https://drive.google.com/file/d/1Gm2wgeyTUzbo5oEwnWq4ka0imtqv1XmC/view?usp=drive_link', '_blank')}>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-transform duration-300 hover:scale-105">
              <img src="/lovable-uploads/7fe75674-f948-425c-8974-41752de61f6c.png" alt="Bay Nature editorial design" className="absolute inset-0 w-full h-full object-cover" />
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