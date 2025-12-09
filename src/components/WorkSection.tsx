import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorkCard from '@/components/WorkCard';
import GradualBlur from '@/components/GradualBlur';
export const WorkSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLUListElement>(null);
  const cardBodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Intersection observer to show blur only when work section is in view
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsSectionVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardsContainerRef.current || !sectionRef.current) return;

      const cards = cardsContainerRef.current.querySelectorAll('.card');
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      // For mobile, cards are 100svh tall and stick from the very top
      // For desktop, keep existing 87vh behavior
      const cardHeightVh = isMobile ? 0.5 : 0.435; // half the card height as a fraction of viewport height
      const stickyTop = window.innerHeight * 0.5 - window.innerHeight * cardHeightVh; // calc(50vh - cardHeight/2)
      const viewportHeight = window.innerHeight;

      let currentActiveIndex = -1;

      // First pass: find the active card
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const isAtSticky = Math.abs(cardRect.top - stickyTop) < 10;
        
        if (isAtSticky) {
          currentActiveIndex = index;
        }
      });

      // Second pass: apply scales, darkening, blurring, and opacity based on active card
      cards.forEach((card, index) => {
        const cardBody = cardBodyRefs.current[index];
        if (!cardBody) return;

        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const isAtSticky = Math.abs(cardRect.top - stickyTop) < 10;
        
        // Check if next card is approaching
        const nextCard = cards[index + 1] as HTMLElement;
        let nextCardDistance = Infinity;
        if (nextCard) {
          const nextCardRect = nextCard.getBoundingClientRect();
          nextCardDistance = nextCardRect.top - stickyTop;
        }

        if (index < currentActiveIndex) {
          // Previous cards - always keep them scaled down and hidden
          cardBody.style.transform = 'scale(0.85)';
          cardBody.style.opacity = '0';
          cardBody.style.backdropFilter = 'blur(10px)';
          cardBody.style.pointerEvents = 'none';
        } else if (index === currentActiveIndex) {
          // Current active card
          if (nextCardDistance < viewportHeight && nextCardDistance > 0) {
            // Next card is approaching - calculate progress for gradual effects
            // Progress goes from 0 (next card far) to 1 (next card reaches sticky)
            const progress = 1 - (nextCardDistance / viewportHeight);
            
            // Scale down based on proximity
            const scaleProgress = Math.max(0.85, 1 - progress * 0.15);
            cardBody.style.transform = `scale(${scaleProgress})`;
            
            // Gradually blur: blur from 0px to 10px
            const blurAmount = progress * 10; // 0 to 10
            cardBody.style.backdropFilter = `blur(${blurAmount}px)`;
            
            // Gradually fade: opacity from 1 to 0
            const opacity = 1 - progress;
            cardBody.style.opacity = `${opacity}`;
          } else {
            // Next card is not close - full size, no blur
            cardBody.style.transform = 'scale(1)';
            cardBody.style.backdropFilter = 'blur(0px)';
            cardBody.style.opacity = '1';
          }
          cardBody.style.pointerEvents = 'auto';
        } else {
          // Future cards - full size, no blur
          cardBody.style.transform = 'scale(1)';
          cardBody.style.backdropFilter = 'blur(0px)';
          cardBody.style.opacity = '1';
          cardBody.style.pointerEvents = 'auto';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    description: 'Comprehensive branding and social media strategy for skincare brand from Bengaluru (full time experience)'
  }, {
    title: 'The Hiring Company (Work in Progress)',
    category: 'UI/UX • Web App • 0→1',
    description: 'Complete UI/UX design for an AI-powered Applicant Tracking System (ATS) web application. End-to-end design process from concept to implementation, focusing on user experience optimization for both recruiters and candidates in the modern hiring landscape.'
  }, {
    title: 'Bay Nature',
    category: 'Editorial | Layout Design',
    description: 'Editorial layout design assessment for magazine featuring nature content and storytelling'
  }];
  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="bg-background"
      style={{ position: 'relative' }}
    >
      {/* Gradient fade from black to transparent at top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[20px] z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)'
        }}
      />
      <div className="w-full md:mx-auto md:max-w-5xl md:w-[95%]">
        <ul ref={cardsContainerRef} id="cards" className="cards-list">
          <li className="card" id="card1" style={{ '--index': 1 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[0] = el}>
              <WorkCard
                title="QuillBot"
                description="Designed and made the UI of popular AI paraphrasing app using existing design systems & new brand guidelines, making it fit with contemporary design. And email templates for free-tier users."
                categories={['UI Revamp', 'Email Template']}
                media={{ type: 'video', src: '/lovable-uploads/QuillBot2.mp4' }}
                backgroundColor="#dbeadc"
                buttonColor="#90ee90"
                onClick={() => navigate('/project/quillbot')}
              />
            </div>
          </li>

          <li className="card" id="card2" style={{ '--index': 2 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[1] = el}>
              <WorkCard
                title={projects[0].title}
                description={projects[0].description}
                categories={projects[0].category.split(/\s*[•|]\s*/).filter(Boolean)}
                media={{ type: 'video', src: '/lovable-uploads/plentum1.mp4' }}
                backgroundColor="#e4dbea"
                buttonColor="#dca8ff"
                onClick={() => navigate('/project/plentum')}
              />
            </div>
          </li>

          <li className="card" id="card3" style={{ '--index': 3 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[2] = el}>
              <WorkCard
                title={'Defog'}
                description={'A unique daily task management app'}
                categories={'UI/UX • Web App • Branding • 0→1'.split(/\s*[•|]\s*/)}
                media={{ type: 'video', src: '/lovable-uploads/defog_kinda_corrected.mp4' }}
                backgroundColor="#dbe5f0"
                buttonColor="#a8d0ff"
                onClick={() => navigate('/project/defog')}
              />
            </div>
          </li>

          <li className="card" id="card4" style={{ '--index': 4 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[3] = el}>
              <WorkCard
                title={projects[1].title}
                description={projects[1].description}
                categories={projects[1].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/ddff190e-68d3-4994-9abd-27a98cafec8e.png' }}
                backgroundColor="#dbeadc"
                buttonColor="#a8ffa8"
                showDialog={true}
                behanceUrl="https://www.behance.net/gallery/230596325/The-Ad-Club-Bangalore-Branding-Concept"
              />
            </div>
          </li>

          <li className="card" id="card5" style={{ '--index': 5 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[4] = el}>
              <WorkCard
                title={projects[2].title}
                description={projects[2].description}
                categories={projects[2].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/f4f28388-07b6-4ef1-9f2b-d0bdc6b0a79e.png' }}
                backgroundColor="#f0e5db"
                buttonColor="#ffd0a8"
              />
            </div>
          </li>

          <li className="card" id="card6" style={{ '--index': 6 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[5] = el}>
              <WorkCard
                title={projects[3].title}
                description={projects[3].description}
                categories={projects[3].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/2711c5dc-8e65-449b-9e96-084aacf9128d.png' }}
                backgroundColor="#eadbe5"
                buttonColor="#ffa8dc"
                onClick={() => navigate('/project/tbs')}
              />
            </div>
          </li>

          <li className="card" id="card7" style={{ '--index': 7 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[6] = el}>
              <WorkCard
                title={projects[4].title}
                description={projects[4].description}
                categories={projects[4].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/16a24bcb-dd11-479f-aa7e-8b7bf9db1672.png' }}
                backgroundColor="#dbeae5"
                buttonColor="#a8ffdc"
              />
            </div>
          </li>

          <li className="card" id="card8" style={{ '--index': 8 } as React.CSSProperties}>
            <div className="card-body" ref={el => cardBodyRefs.current[7] = el}>
              <WorkCard
                title={projects[5].title}
                description={projects[5].description}
                categories={projects[5].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/7fe75674-f948-425c-8974-41752de61f6c.png' }}
                backgroundColor="#f0eadb"
                buttonColor="#ffdca8"
              />
            </div>
          </li>
        </ul>
      </div>

      {!isMobile && isSectionVisible && (
        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={10}
        />
      )}
    </section>
  );
};