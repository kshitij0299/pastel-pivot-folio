import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomCursor } from '@/components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export const LogosCaseStudies = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Animate images on scroll
    const images = document.querySelectorAll('.case-study-image');
    images.forEach((img, index) => {
      gsap.fromTo(img, {
        opacity: 0,
        y: 80
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%'
        },
        delay: index * 0.1
      });
    });
  }, []);

  const caseStudyImages = [
    {
      src: '/lovable-uploads/4f9bc25d-0f58-4c59-b21f-d8757fd39a7a.png',
      alt: 'Skincare.science branding case study',
      title: 'Skincare.science'
    },
    {
      src: '/lovable-uploads/a64230d6-3f91-4108-879c-00e4143e695c.png',
      alt: 'Tornado branding case study',
      title: 'Tornado'
    },
    {
      src: '/lovable-uploads/1eea1f78-34fc-47a6-b344-31f2e511797b.png',
      alt: 'Northern branding case study',
      title: 'Northern'
    },
    {
      src: '/lovable-uploads/48ef0dfe-125f-4cf6-9e81-4d01ef1c800b.png',
      alt: 'Sandy branding case study',
      title: 'Sandy'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-4">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-heading hover:text-primary transition-colors duration-300 font-rethink font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </button>
        </div>
      </header>

      {/* Title Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-light text-heading tracking-[-0.06em] text-center">
            Logos & Case Studies
          </h1>
          <p className="font-rethink text-lg md:text-xl text-body text-center mt-6 max-w-3xl mx-auto leading-relaxed">
            A collection of brand identity designs and logo creation projects showcasing strategic thinking and creative execution.
          </p>
        </div>
      </section>

      {/* Case Studies Images - No spacing between */}
      <section className="pb-16">
        <div className="max-w-full">
          {caseStudyImages.map((image, index) => (
            <div key={index} className="case-study-image w-full">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-auto object-cover block"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};