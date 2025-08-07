import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

interface NavigationProps {
  activeSection?: string;
}

export const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Playground', href: '#playground' },
    { label: 'About', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/0texture/', icon: '📷' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/0texture', icon: '💼' },
    { name: 'Behance', href: 'https://www.behance.net/0texture', icon: '🎨' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 rounded-2xl',
        'bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg',
        'px-6 py-3 max-w-5xl w-[95%]',
        isScrolled ? 'bg-white/30' : 'bg-white/20'
      )}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('#hero')}
            className="font-playfair text-lg font-bold text-heading cursor-hover tracking-[-0.06em] flex items-center gap-2"
          >
            Kshitij's <ScrambleText text="Designer" className="font-playfair text-lg font-bold text-heading tracking-[-0.06em]" /> Portfolio
            <img 
              src="/lovable-uploads/b451c05e-b40b-4835-95cb-e0a32957dfc7.png" 
              alt="Star" 
              className="w-6 h-6 animate-spin-slow"
            />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'font-playfair text-lg font-bold transition-colors cursor-hover tracking-[-0.06em]',
                  activeSection === item.href.slice(1)
                    ? 'text-link'
                    : 'text-heading hover:text-link'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Contact Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
              className="glass-button font-rethink text-gray-800 px-6 py-2 rounded-full text-sm font-medium cursor-hover hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Contact
            </button>
            
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