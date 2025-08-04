import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" ref={footerRef} className="bg-white border-t border-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Contact Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-heading mb-6">
              Let's work together
            </h2>
            <p className="text-lg text-body mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, creative projects, 
              or just having a conversation about design.
            </p>
            <a
              href="mailto:hello@eliserosekim.com"
              className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium cursor-hover hover:bg-primary/90 transition-colors"
            >
              Get in touch
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 mb-12">
            {[
              { name: 'Instagram', href: '#' },
              { name: 'LinkedIn', href: '#' },
              { name: 'Behance', href: '#' },
              { name: 'Twitter', href: '#' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-body hover:text-link transition-colors cursor-hover"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
            <p className="text-sm text-body mb-4 md:mb-0">
              © 2024 Elise Rose Kim. All rights reserved.
            </p>
            
            <button
              onClick={scrollToTop}
              className="flex items-center text-sm text-body hover:text-link transition-colors cursor-hover"
            >
              Back to top
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};