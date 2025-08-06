import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ProjectData {
  id: string;
  title: string;
  company: string;
  category: string;
  year: string;
  description: string;
  fullDescription: string;
  tags: string[];
  color: string;
  images: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
}

const projectsData: ProjectData[] = [
  {
    id: 'opendoor-mainstay',
    title: 'Opendoor/Mainstay',
    company: 'Opendoor Technologies',
    category: 'Brand & website launch',
    year: '2024',
    description: 'Led the design of the public launch of Mainstay, Opendoor\'s enterprise branch, from the full website experience to brand identity.',
    fullDescription: 'Led the comprehensive design strategy for Mainstay\'s public launch, Opendoor\'s enterprise division. This project encompassed the complete digital ecosystem including website architecture, user experience flows, brand identity development, and visual design system. The challenge was to create a distinct yet cohesive brand that would appeal to enterprise clients while maintaining Opendoor\'s innovative spirit.',
    tags: ['Brand Design', 'Web Design', 'UX Strategy', 'Enterprise'],
    color: 'from-purple-400 to-purple-600',
    images: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
    ]
  },
  {
    id: 'interactive-platform',
    title: 'Interactive Platform',
    company: 'Various Clients',
    category: 'Product Design',
    year: '2024',
    description: 'Designing highly interactive platforms to storytelling microsites, we stand above the noise, creating engaging web experiences.',
    fullDescription: 'Developed multiple interactive digital platforms that prioritize user engagement through innovative storytelling techniques. These projects range from data visualization dashboards to immersive microsite experiences, each tailored to create memorable user journeys that convert visitors into engaged users.',
    tags: ['Interactive Design', 'Storytelling', 'Web Development', 'Animation'],
    color: 'from-blue-400 to-blue-600',
    images: [
      'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800'
    ]
  },
  {
    id: 'figma-education',
    title: 'Figma for Education',
    company: 'Educational Institutions',
    category: 'Educational Tools',
    year: '2023',
    description: 'Comprehensive design system and learning platform for educational institutions using Figma.',
    fullDescription: 'Created a comprehensive educational framework that empowers institutions to effectively teach design thinking and digital literacy using Figma. This included developing curriculum guides, interactive learning modules, assessment frameworks, and a complete design system that students and educators could use across various educational contexts.',
    tags: ['Education', 'Design Systems', 'Figma', 'Curriculum Design'],
    color: 'from-green-400 to-green-600',
    images: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
    ]
  },
  {
    id: 'coffee-shop-menu',
    title: 'Coffee Shop Menu',
    company: 'Local Coffee Roaster',
    category: 'Print Design',
    year: '2023',
    description: 'Modern, clean menu design for a local coffee shop with focus on readability and brand consistency.',
    fullDescription: 'Developed a complete brand identity and menu design system for a local artisan coffee roaster. The project focused on creating a warm, approachable aesthetic that would appeal to both coffee enthusiasts and casual customers, while ensuring excellent readability and practical functionality for daily use.',
    tags: ['Print Design', 'Branding', 'Typography', 'Local Business'],
    color: 'from-orange-400 to-orange-600',
    images: [
      'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800'
    ]
  }
];

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-heading mb-4">Project not found</h1>
          <Link to="/" className="text-link hover:text-link/80">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/#selected-work" 
              className="inline-flex items-center text-link hover:text-link/80 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Selected Work
            </Link>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-body font-rethink">{project.year}</span>
                <span className="text-body/60">•</span>
                <span className="text-body font-rethink">{project.category}</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-6xl font-light text-heading mb-4 tracking-wide">
                {project.title}
              </h1>
              <h2 className="font-playfair text-xl md:text-2xl text-body/80 mb-6">
                {project.company}
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mb-8">
              {project.liveUrl && (
                <Button className="glass-button text-heading" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Site
                  </a>
                </Button>
              )}
              {project.caseStudyUrl && (
                <Button variant="outline" asChild>
                  <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                    Case Study
                  </a>
                </Button>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-accent/20 text-body rounded-full text-sm font-rethink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <div className="frosted-glass p-8 mb-8">
              <img 
                src={project.images[0]} 
                alt={`${project.title} hero image`}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Project Description */}
          <div className="frosted-glass p-8 mb-12">
            <h3 className="font-playfair text-2xl md:text-3xl text-heading mb-6">Overview</h3>
            <p className="font-rethink text-body leading-relaxed text-lg mb-6">
              {project.fullDescription}
            </p>
            <p className="font-rethink text-body leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Images Gallery */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="frosted-glass p-6">
                <img 
                  src={image} 
                  alt={`${project.title} image ${index + 2}`}
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Additional Content Placeholders */}
          <div className="space-y-8">
            <div className="frosted-glass p-8">
              <h3 className="font-playfair text-2xl md:text-3xl text-heading mb-6">Design Process</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-rethink font-semibold text-heading mb-3">Research</h4>
                  <p className="font-rethink text-body">
                    Comprehensive user research and market analysis to inform design decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-rethink font-semibold text-heading mb-3">Design</h4>
                  <p className="font-rethink text-body">
                    Iterative design process with user testing and stakeholder feedback.
                  </p>
                </div>
                <div>
                  <h4 className="font-rethink font-semibold text-heading mb-3">Implementation</h4>
                  <p className="font-rethink text-body">
                    Close collaboration with development teams to ensure design fidelity.
                  </p>
                </div>
              </div>
            </div>

            <div className="frosted-glass p-8">
              <h3 className="font-playfair text-2xl md:text-3xl text-heading mb-6">Results & Impact</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-rethink font-semibold text-heading mb-3">Key Metrics</h4>
                  <ul className="font-rethink text-body space-y-2">
                    <li>• Increased user engagement by 40%</li>
                    <li>• Improved conversion rates by 25%</li>
                    <li>• Enhanced brand recognition</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-rethink font-semibold text-heading mb-3">Client Feedback</h4>
                  <blockquote className="font-rethink text-body italic">
                    "The design exceeded our expectations and perfectly captured our brand vision."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation to other projects */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <Link 
                to="/#selected-work" 
                className="text-link hover:text-link/80 font-rethink transition-colors"
              >
                ← View All Projects
              </Link>
              <Link 
                to="/#contact" 
                className="text-link hover:text-link/80 font-rethink transition-colors"
              >
                Let's Work Together →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};