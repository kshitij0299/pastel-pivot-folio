import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeSection?: string;
}

export const Navigation = ({ activeSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    { label: 'Shop', href: '#shop' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('#hero')}
            className="font-playfair text-lg font-bold text-heading cursor-hover tracking-[-0.06em]"
          >
            Portfolio
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'font-inter text-sm font-medium transition-colors cursor-hover',
                  activeSection === item.href.slice(1)
                    ? 'text-link'
                    : 'text-body hover:text-link'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('#contact')}
            className="font-inter bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium cursor-hover hover:bg-primary/90 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};