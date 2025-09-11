import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LogosCaseStudies = () => {
  

  useEffect(() => {
    // SEO
    document.title = 'Logos & Case Studies | Portfolio';
    const desc = 'Logos & case studies — brand identity and logo design showcase.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute('content', desc);
    } else {
      meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = desc;
      document.head.appendChild(meta);
    }

    // Animate images on scroll
    const images = document.querySelectorAll('.case-study-image');
    images.forEach((img, index) => {
      gsap.fromTo(img, { opacity: 0, y: 80 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: img, start: 'top 85%' },
        delay: index * 0.1
      });
    });
  }, []);

  const caseStudyImages = [
    {
      src: '/lovable-uploads/89ced496-1dcf-4b50-a9a0-bb0b8ae5124c.png',
      alt: 'Skincare.science branding case study',
      title: 'Skincare.science'
    },
    {
      src: '/lovable-uploads/d8fad1de-ba8b-4fa7-a732-7f9c6775ea38.png',
      alt: 'Northern branding case study',
      title: 'Northern'
    },
    {
      src: '/lovable-uploads/0e8936c3-9461-4cbd-9d44-97dcda4d6d38.png',
      alt: 'Tornado branding case study',
      title: 'Tornado'
    },
    {
      src: '/lovable-uploads/5988630a-1e3e-497d-ad5c-b7df23be7f9f.png',
      alt: 'Sandy branding case study',
      title: 'Sandy'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <h1 className="sr-only">Logos & Case Studies</h1>
      <section>
        <div className="max-w-full">
          {caseStudyImages.map((image, index) => (
            <div key={index} className="case-study-image w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="block w-full h-auto object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  console.error('Image failed to load:', image.src);
                  (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};