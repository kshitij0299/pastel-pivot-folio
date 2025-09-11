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
      src: '/lovable-uploads/ee03460e-9aed-4104-b034-c34d269412f7.png',
      alt: 'Skincare.science branding case study',
      title: 'Skincare.science'
    },
    {
      src: '/lovable-uploads/f2c4c868-233a-4093-a243-41fe24f44a1b.png',
      alt: 'Tornado branding case study',
      title: 'Tornado'
    },
    {
      src: '/lovable-uploads/f9a0e36c-e31d-4b2a-86a3-59d438849944.png',
      alt: 'Northern branding case study',
      title: 'Northern'
    },
    {
      src: '/lovable-uploads/fee9ce56-bed3-4324-90c2-e342b05498eb.png',
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