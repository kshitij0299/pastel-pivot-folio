import { useEffect, useState } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { HeroSection, SelectedWorkSection } from '@/components/HeroSection';
import { WorkSection } from '@/components/WorkSection';
import { PlaygroundSection } from '@/components/PlaygroundSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'work', 'playground', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation activeSection={activeSection} />
      
      <main>
        <HeroSection />
        <WorkSection />
        <PlaygroundSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
