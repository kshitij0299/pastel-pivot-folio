import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import GlassSurface from '@/components/GlassSurface';

interface NavigationProps {
  activeSection?: string;
}

export const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [starSpeed, setStarSpeed] = useState(8);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
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
      
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        'px-2 py-0.5 max-w-5xl w-[95%]',
        isNavbarVisible ? 'translate-y-0' : '-translate-y-[200%]'
      )}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Logo + rotating star pill */}
          <GlassSurface width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="px-3">
            <button
              onClick={() => scrollToSection('#hero')}
              className="font-playfair text-lg font-bold text-heading cursor-hover tracking-[-0.06em] flex items-center gap-2"
            >
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
            </button>
          </GlassSurface>

          {/* Middle nav item pills */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <GlassSurface key={item.label} width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="px-4">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'font-playfair text-lg font-bold transition-colors cursor-hover tracking-[-0.06em]',
                    activeSection === item.href.slice(1)
                      ? 'text-link'
                      : 'text-heading'
                  )}
                >
                  {item.label}
                </button>
              </GlassSurface>
            ))}
          </div>

          {/* Desktop Contact pill + dropdown */}
          <div className="hidden md:block relative">
            <GlassSurface width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="px-2">
              <button
                onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                className="font-rethink text-gray-800 px-4 py-2 rounded-full text-sm font-medium cursor-hover hover:opacity-90 transition-all duration-300"
              >
                Contact
              </button>
            </GlassSurface>

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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 cursor-hover"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-heading" />
            ) : (
              <Menu className="w-6 h-6 text-heading" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg rounded-2xl mt-2 border border-white/30 shadow-lg">
          <div className="px-6 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'font-playfair text-lg font-bold transition-colors cursor-hover text-left tracking-[-0.06em]',
                    activeSection === item.href.slice(1)
                      ? 'text-link'
                      : 'text-heading hover:text-link'
                  )}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <p className="font-rethink text-xs text-gray-500 mb-2">Contact</p>
                <a
                  href="mailto:kshitij0299@gmail.com"
                  className="block py-2 text-sm text-gray-700 cursor-hover"
                >
                  📧 Email
                </a>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-sm text-gray-700 cursor-hover"
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