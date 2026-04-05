import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
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
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [isTransitioningToWork, setIsTransitioningToWork] = useState(false);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Log navItems visibility state changes
  useEffect(() => {
    if (navItemsRef.current) {
      const computedStyle = window.getComputedStyle(navItemsRef.current);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/20f328ed-cff6-45ae-8a9e-85ad05f13238', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Navigation.tsx:22', message: 'navItems state change', data: { isNavbarVisible, isTransitioningToWork, opacity: computedStyle.opacity, transform: computedStyle.transform, visibility: computedStyle.visibility }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix' }) }).catch(() => { });
      // #endregion
    }
  }, [isNavbarVisible, isTransitioningToWork]);

  useEffect(() => {
    // Check if user has seen the intro animation (consistent with HeroSection)
    const hasSeenIntro = sessionStorage.getItem('intro_seen_home');

    // Set initial state for nav items
    const setInitialState = () => {
      if (hasSeenIntro) {
        // If seen, show immediately
        if (navItemsRef.current) {
          gsap.set(navItemsRef.current, { y: 0, opacity: 1 });
        }
        if (logoRef.current) {
          gsap.set(logoRef.current, { y: 0, opacity: 1 });
        }
      } else {
        // If not seen, prepare for animation
        if (navItemsRef.current) {
          gsap.set(navItemsRef.current, { y: -100, opacity: 0 });
        }
        if (logoRef.current) {
          gsap.set(logoRef.current, { y: -100, opacity: 0 });
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setInitialState();

      // If page is already scrolled (not at top), show logo immediately
      // This handles cases where user reloads while scrolled down
      if (window.scrollY > 100 && logoRef.current) {
        gsap.set(logoRef.current, {
          y: 0,
          opacity: 1
        });
      }
    });

    // Listen for subtitle animation complete event
    const handleSubtitleComplete = () => {
      // Only animate if not already visible (i.e. if not seen intro)
      if (hasSeenIntro) return;

      if (navItemsRef.current) {
        gsap.to(navItemsRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6, // Faster (was 0.8)
          ease: 'power3.out'
        });
      }
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6, // Faster (was 0.8)
          ease: 'power3.out'
        });
      }
    };

    // Fallback: Ensure nav items AND logo are visible if subtitle animation event doesn't fire
    // Check after a delay to see if animation completed
    const fallbackCheck = setTimeout(() => {
      if (navItemsRef.current) {
        const computedStyle = window.getComputedStyle(navItemsRef.current);
        if (computedStyle.opacity === '0' || computedStyle.opacity === '') {
          // Force nav items to be visible
          gsap.to(navItemsRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6, // Faster
            ease: 'power3.out'
          });
        }
      }
      // Also check and fix logo visibility
      if (logoRef.current) {
        const logoStyle = window.getComputedStyle(logoRef.current);
        if (logoStyle.opacity === '0' || logoStyle.opacity === '') {
          gsap.to(logoRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6, // Faster
            ease: 'power3.out'
          });
        }
      }
    }, hasSeenIntro ? 100 : 3000); // Check faster if it should have been visible

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

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/20f328ed-cff6-45ae-8a9e-85ad05f13238', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Navigation.tsx:86', message: 'handleScroll entry', data: { currentScrollY, isNavbarVisible, isTransitioningToWork }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix' }) }).catch(() => { });
      // #endregion

      // Check if we're in the hero section
      const heroSection = document.getElementById('hero');
      const workSection = document.getElementById('work');

      if (heroSection && workSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const workRect = workSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        const viewportHeight = window.innerHeight;

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/20f328ed-cff6-45ae-8a9e-85ad05f13238', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Navigation.tsx:96', message: 'section positions', data: { heroBottom, heroTop: heroRect.top, workTop: workRect.top, workBottom: workRect.bottom, viewportHeight }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix' }) }).catch(() => { });
        // #endregion

        // Consider in hero section if hero bottom is still visible (with some threshold)
        setIsInHeroSection(heroBottom > window.innerHeight * 0.3);

        // Check if we're transitioning to work section (when black cover is visible)
        // Transition happens when hero is scrolling out (bottom moving up through viewport)
        // and work section is approaching or visible
        const isHeroScrollingOut = heroBottom < viewportHeight && heroBottom > -viewportHeight;
        const isWorkApproaching = workRect.top < viewportHeight * 1.5;
        const isInWorkSection = workRect.top <= viewportHeight && workRect.bottom > 0;

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/20f328ed-cff6-45ae-8a9e-85ad05f13238', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Navigation.tsx:162', message: 'transition logic', data: { isHeroScrollingOut, isWorkApproaching, isInWorkSection, currentScrollY }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix' }) }).catch(() => { });
        // #endregion

        // Determine text color based on section:
        // - Hero section (light background): black text
        // - Transitioning (black cover visible): white text
        // - Work section (dark background): white text
        const isInHeroSectionView = heroRect.top < viewportHeight && heroBottom > 0;
        const isTransitioning = isHeroScrollingOut && isWorkApproaching && currentScrollY > 0;
        // Use white text when transitioning OR when in work section (but not when still in hero)
        const shouldUseWhiteText = isTransitioning || (isInWorkSection && !isInHeroSectionView);
        setIsTransitioningToWork(shouldUseWhiteText);

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/20f328ed-cff6-45ae-8a9e-85ad05f13238', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Navigation.tsx:170', message: 'transitioning state update', data: { isTransitioning, isInWorkSection, shouldUseWhiteText }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix' }) }).catch(() => { });
        // #endregion
      }

      // Always show navbar at the top of the page
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);

        // Determine scroll direction and show/hide navbar
        const wasScrollingDown = currentScrollY > lastScrollYRef.current && currentScrollY > 100;
        const wasScrollingUp = currentScrollY < lastScrollYRef.current;

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/20f328ed-cff6-45ae-8a9e-85ad05f13238', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'Navigation.tsx:125', message: 'navbar visibility logic', data: { wasScrollingDown, wasScrollingUp, currentScrollY, lastScrollY: lastScrollYRef.current }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix' }) }).catch(() => { });
        // #endregion

        if (wasScrollingDown) {
          // Scrolling down - hide navbar
          setIsNavbarVisible(false);
        } else if (wasScrollingUp) {
          // Scrolling up - show navbar
          setIsNavbarVisible(true);
        }
      }

      // Ensure logo is visible when scrolled (not at top)
      // Logo should always be visible when user is scrolled down, regardless of animation state
      if (currentScrollY > 100 && logoRef.current) {
        const logoStyle = window.getComputedStyle(logoRef.current);
        if (logoStyle.opacity === '0' || logoStyle.opacity === '') {
          gsap.set(logoRef.current, {
            y: 0,
            opacity: 1
          });
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
      clearTimeout(fallbackCheck);
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
          <div
            ref={logoRef}
            className={cn(
              'transition-transform duration-300 ease-in-out',
              // On mobile: hide/show based on scroll, on desktop: always visible
              isNavbarVisible ? 'translate-y-0' : '-translate-y-[200%] md:translate-y-0'
            )}
          >
            <GlassSurface width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="" onClick={() => scrollToSection('#hero')}>
              <div className="w-full h-full px-3 flex items-center justify-center gap-2 font-playfair text-lg font-bold cursor-hover tracking-[-0.06em]" style={{ color: isTransitioningToWork ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)' }}>
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
                  <div className="w-full h-full px-4 flex items-center justify-center font-playfair text-lg font-bold cursor-hover tracking-[-0.06em]" style={{ color: isTransitioningToWork ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)' }}>
                    {item.label}
                  </div>
                </GlassSurface>
              ))}
            </div>
          </div>

          {/* Right group: Contact + mobile menu (stays visible like logo) */}
          <div ref={contactRef} className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <GlassSurface width="auto" height={44} borderRadius={28} backgroundOpacity={0} className="" onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}>
                <div className="w-full h-full px-4 flex items-center justify-center font-rethink rounded-full text-sm font-medium cursor-hover hover:opacity-90" style={{ color: isTransitioningToWork ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)' }}>
                  Contact
                </div>
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

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 cursor-hover"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: isTransitioningToWork ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: isTransitioningToWork ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)' }} />
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
                  className="font-playfair text-lg font-bold cursor-hover text-left tracking-[-0.06em]"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-white/30">
                <p className="font-rethink text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Contact</p>
                <a
                  href="mailto:kshitij0299@gmail.com"
                  className="block py-2 text-sm cursor-hover"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  📧 Email
                </a>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-sm cursor-hover"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
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