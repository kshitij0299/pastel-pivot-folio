import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import GlassSurface from '@/components/GlassSurface';
import StarBorder from '@/components/StarBorder';

interface NavigationProps {
  activeSection?: string;
}

export const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [starSpeed, setStarSpeed] = useState(8);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial state for nav items (hidden above) - use setTimeout to ensure ref is ready
    const setInitialState = () => {
      if (navItemsRef.current) {
        gsap.set(navItemsRef.current, {
          y: -100,
          opacity: 0
        });
      }
      if (logoRef.current) {
        gsap.set(logoRef.current, {
          y: -100,
          opacity: 0
        });
      }
      if (contactRef.current) {
        gsap.set(contactRef.current, {
          y: -100,
          opacity: 0
        });
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setInitialState();
    });

    // Listen for subtitle animation complete event
    const handleSubtitleComplete = () => {
      if (navItemsRef.current) {
        gsap.to(navItemsRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
      if (contactRef.current) {
        gsap.to(contactRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    };

    window.addEventListener('subtitleAnimationComplete', handleSubtitleComplete as EventListener);

    const lastScrollYRef = { current: window.scrollY };
    let scrollVelocity = 0;
    let ticking = false;

    const updateStarSpeed = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
      
      // Calculate velocity with smoothing
      scrollVelocity = scrollVelocity * 0.8 + scrollDelta * 0.2;
      
      // Map velocity to speed (1-8 seconds, faster scroll = lower duration)
      const newSpeed = Math.max(1, 8 - scrollVelocity * 0.1);
      setStarSpeed(newSpeed);
      
      lastScrollYRef.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're in the hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        // Consider in hero section if hero bottom is still visible (with some threshold)
        setIsInHeroSection(heroBottom > window.innerHeight * 0.3);
      }
      
      // Always show navbar at the top of the page
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        
        // Determine scroll direction and show/hide navbar
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsNavbarVisible(false);
        } else if (currentScrollY < lastScrollYRef.current) {
          // Scrolling up - show navbar
          setIsNavbarVisible(true);
        }
      }
      
      if (!ticking) {
        requestAnimationFrame(updateStarSpeed);
        ticking = true;
      }
      
      // Don't update lastScrollYRef here; updateStarSpeed does it after computing delta
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('subtitleAnimationComplete', handleSubtitleComplete as EventListener);
    };
  }, []);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Playground', href: '#playground' },
    { label: 'About', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#work') {
      // For work section, scroll to the first card and center it
      const firstCard = document.querySelector('#card1');
      if (firstCard) {
        const cardRect = firstCard.getBoundingClientRect();
        const cardTop = cardRect.top + window.scrollY;
        const viewportHeight = window.innerHeight;
        const cardHeight = cardRect.height;
        const scrollPosition = cardTop - (viewportHeight / 2) + (cardHeight / 2);
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback: scroll to section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const socialLinks = [
    { name: 'Resume', href: 'https://drive.google.com/file/d/1m2vRcxbBCQuKy8IRmiIR_w2os0u2X2Ql/view?usp=sharing', icon: '📄' },
    { name: 'Instagram', href: 'https://www.instagram.com/0texture/', icon: '📷' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/0texture', icon: '💼' },
    { name: 'Behance', href: 'https://www.behance.net/0texture', icon: '🎨' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-transform duration-300 ease-in-out',
        'px-2 py-0.5 max-w-5xl w-[95%]'
      )}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Logo + rotating star pill */}
          <div ref={logoRef}>
            <GlassSurface width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="" onClick={() => scrollToSection('#hero')}>
              <div className="w-full h-full px-3 flex items-center justify-center gap-2 font-playfair text-lg font-bold cursor-hover tracking-[-0.06em] text-white">
              Kshitij's Design Portfolio
              <img
                src="/lovable-uploads/b451c05e-b40b-4835-95cb-e0a32957dfc7.png"
                alt="Star"
                className="w-6 h-6 animate-spin-slow transition-all duration-300"
                style={{
                  animationDuration: `${starSpeed}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationName: 'spin-slow'
                }}
              />
              </div>
            </GlassSurface>
          </div>

          {/* Center group: nav items (hide on scroll) */}
          <div className={cn('flex-1 hidden md:flex items-center justify-center transition-transform duration-300 ease-in-out', isNavbarVisible ? 'translate-y-0' : '-translate-y-[200%]')}>
            <div ref={navItemsRef} className="flex items-center gap-3">
              {navItems.map((item) => (
                <GlassSurface key={item.label} width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="" onClick={() => scrollToSection(item.href)}>
                  <div className="w-full h-full px-4 flex items-center justify-center font-playfair text-lg font-bold cursor-hover tracking-[-0.06em] text-white">
                    {item.label}
                  </div>
                </GlassSurface>
              ))}
            </div>
          </div>

          {/* Right group: Contact + mobile menu (stays visible like logo) */}
          <div ref={contactRef} className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <StarBorder
                as="div"
                className="rounded-[28px]"
                color="cyan"
                speed="5s"
                transparent={true}
                innerClassName="p-0 rounded-[28px]"
              >
                <GlassSurface width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="" onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}>
                  <div className="w-full h-full px-4 flex items-center justify-center font-rethink rounded-full text-sm font-medium cursor-hover hover:opacity-90 text-white">
                    Contact
                  </div>
                </GlassSurface>
              </StarBorder>

              {isContactDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <a
                      href="mailto:kshitij0299@gmail.com"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-hover"
                    >
                      📧 Email
                    </a>
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-hover"
                      >
                        {link.icon} {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 cursor-hover"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-lg rounded-2xl mt-2 border border-white/30 shadow-lg bg-black/90">
          <div className="px-6 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-playfair text-lg font-bold cursor-hover text-left tracking-[-0.06em] text-white"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-white/30">
                <p className="font-rethink text-xs mb-2 text-white/70">Contact</p>
                <a
                  href="mailto:kshitij0299@gmail.com"
                  className="block py-2 text-sm cursor-hover text-white"
                >
                  📧 Email
                </a>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-sm cursor-hover text-white"
                  >
                    {link.icon} {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};