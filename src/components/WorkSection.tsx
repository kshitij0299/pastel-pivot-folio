import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);
export const WorkSection = () => {
  const navigate = useNavigate();
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
    category: 'Social Media Post | Content Direction',
    description: 'Direct-to-consumer health supplements brand focused on premium wellness products and lifestyle enhancement',
    features: ['Curriculum designed by Industry leaders for maximum impact.', 'Track your growth instantly with personalized dashboards.', 'Master skills through interactive and immersive learning.']
  }, {
    title: 'The Ad Club',
    category: 'Brand Identity | Visual Design',
    description: 'Creative branding and visual identity design for advertising club from Bengaluru'
  }, {
    title: 'Logos & Case Studies',
    category: 'Brand Identity | Logo Design | Case Studies',
    description: 'Collection of brand identity designs and logo creation projects showcasing strategic thinking and creative execution'
  }, {
    title: 'Timeless Beauty Secrets',
    category: 'Design | Creative Direction | Social Media Strategy',
    description: 'Comprehensive branding and social media strategy for skincare brand from Bengaluru (currently working here)'
  }, {
    title: 'The Hiring Company',
    category: 'UI/UX • Web App • 0→1',
    description: 'Complete UI/UX design for an AI-powered Applicant Tracking System (ATS) web application. End-to-end design process from concept to implementation, focusing on user experience optimization for both recruiters and candidates in the modern hiring landscape.'
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

          {/* Logos & Case Studies Project Card */}
          <div className="group cursor-pointer" onClick={() => navigate('/logos-case-studies')}>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-all duration-300 hover:scale-105 shadow-[0_10px_25px_-5px_rgba(168,85,247,0.4),0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.6),0_0_40px_rgba(236,72,153,0.5)]">
              <img src="/lovable-uploads/f4f28388-07b6-4ef1-9f2b-d0bdc6b0a79e.png" alt="Logos and case studies showcase" className="absolute inset-0 w-full h-full object-cover" />
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

          {/* Timeless Beauty Secrets Project Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-all duration-300 hover:scale-105 grayscale-[50%] opacity-75 hover:grayscale-0 hover:opacity-100">
              <img src="/lovable-uploads/2711c5dc-8e65-449b-9e96-084aacf9128d.png" alt="Timeless Beauty Secrets branding" className="absolute inset-0 w-full h-full object-cover" />
              
              {/* Animated Arrow pointing to badge */}
              <div className="absolute top-4 right-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                <ArrowUpRight className="w-6 h-6 text-white bg-black/50 rounded-full p-1 backdrop-blur-sm" />
              </div>
              
              {/* Overlay button */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-body text-xs font-medium rounded-full border border-white/20 shadow-sm">Currently Working Here</span>
              </div>
            </div>
            
            {/* Project title below */}
            <div className="space-y-1 md:space-y-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
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

          {/* The Hiring Company Project Card */}
          <div className="group">
            <div className="bg-white rounded-2xl md:rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden mb-6 transition-transform duration-300 hover:scale-105 border border-gray-100">
              <img src="/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png" alt="The Hiring Company AI ATS project" className="absolute inset-0 w-full h-full object-contain p-8" />
              
              {/* Floating WIP Button */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg text-body text-xs font-medium rounded-full">
                  WIP
                </span>
              </div>
            </div>
            
            {/* Project title below */}
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-playfair text-xl md:text-2xl lg:text-3xl font-light text-heading tracking-[-0.04em]">
                {projects[4].title}
              </h3>
              <p className="font-rethink text-sm md:text-base text-body font-medium">
                {projects[4].category}
              </p>
              <p className="font-rethink text-xs md:text-sm text-body leading-relaxed">
                {projects[4].description}
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
                {projects[5].title}
              </h3>
              <p className="font-rethink text-sm md:text-base text-body font-medium">
                {projects[5].category}
              </p>
              <p className="font-rethink text-xs md:text-sm text-body leading-relaxed">
                {projects[5].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};