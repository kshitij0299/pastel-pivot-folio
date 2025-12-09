import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Lottie from 'lottie-react';
import { ProjectNavbar } from '@/components/ProjectNavbar';
import { Footer } from '@/components/Footer';

// Image assets from uploaded folder - matching Figma design
const imgLogo = "/lovable-uploads/logo2.svg"; // Defog logo with correct aspect ratio (356x140) - SVG for crisp rendering
const imgImage2 = "/lovable-uploads/iphone%20screen.png";
const imgProductImage = "/lovable-uploads/Product_image_1.png";
const imgProductImage1 = "/lovable-uploads/Product%20image_2.png";
const imgProductImage2 = "/lovable-uploads/Product_image_3.png";
const imgEllipse3 = "/lovable-uploads/Ellipse%203.svg";
const imgPhoneMockup = "/lovable-uploads/iphone%20screen.png";

// QuillBot assets
const quillbotLogo = "/lovable-uploads/quillbot-logo.svg"; // QuillBot logo SVG
const quillbotHeroGif = "/lovable-uploads/quillbot.gif"; // QuillBot hero GIF
const quillbotProduct1 = "/lovable-uploads/2@2x.png"; // QuillBot product image 1
const quillbotProduct2 = "/lovable-uploads/3@2x.png"; // QuillBot product image 2
const quillbotProduct3 = "/lovable-uploads/Product_image_3.png"; // QuillBot product image 3 (placeholder)

// QuillBot slideshow images
const quillbotSlideshowImages = [
  "/lovable-uploads/quillbot-slideshow-1@2x.png",
  "/lovable-uploads/quillbot-slideshow-2@2x.png",
  "/lovable-uploads/quillbot-slideshow-3@2x.png",
  "/lovable-uploads/quillbot-slideshow-4@2x.png",
  "/lovable-uploads/quillbot-slideshow-5@2x.png",
];

// Plentum assets
const plentumLogo = "/lovable-uploads/plentum-logo.svg";
const plentumPdf = "/lovable-uploads/NEW PLENTUM DOC FOR PORTFOLIO.pdf";
const plentumStickers = [
  "/lovable-uploads/plentum-stickers/Slice 1@2x.png",
  "/lovable-uploads/plentum-stickers/Slice 2@2x.png",
  "/lovable-uploads/plentum-stickers/Slice 3@2x.png",
  "/lovable-uploads/plentum-stickers/Slice 4@2x.png",
  "/lovable-uploads/plentum-stickers/Slice 5@2x.png",
  "/lovable-uploads/plentum-stickers/Slice 6@2x.png",
];

// Timeless Beauty Secrets (TBS) assets - from Figma design
// All files are inside: public/lovable-uploads/tbs
const TBS_ASSETS_BASE = "/lovable-uploads/tbs";
const tbsLogo = `${TBS_ASSETS_BASE}/Logo Black 1.png`;
const tbsHeroVideo = `${TBS_ASSETS_BASE}/Video Compressor Hero.mp4`;
const tbsPhoneMockup = `${TBS_ASSETS_BASE}/mockrocket.png`;
const tbsIcon4 = `${TBS_ASSETS_BASE}/4.png`;
const tbsIcon3 = `${TBS_ASSETS_BASE}/3.png`;
const tbsMoodboard = `${TBS_ASSETS_BASE}/Brand Moodboard 251111_upscayl_2x_upscayl-standard-4x 2.png`;
const tbsPexels1 = `${TBS_ASSETS_BASE}/pexels-alesiakozik-7796173.jpg`;
const tbsPexels2 = `${TBS_ASSETS_BASE}/pexels-havva-yilmaz-53443357-13208328.jpg`;
const tbsPexels3 = `${TBS_ASSETS_BASE}/pexels-yana-15198714.jpg`;
// Motion / UI videos – mapped to the corresponding Figma sections
const tbsMotionVideo1 = `${TBS_ASSETS_BASE}/Orbit 5-01 Lite Video.mp4`;
const tbsMotionVideo2 = `${TBS_ASSETS_BASE}/7814900-uhd_2160_3840_30fps.mp4`;
const tbsUiVideo = `${TBS_ASSETS_BASE}/Screen Recording Nov 28 2025.mp4`;

interface ProjectData {
  id: string;
  title: string;
  heroText: string;
  year: string;
  type: string;
  role: string;
  design: string;
  intro: string;
  videoSrc: string;
  sectionText: string; // Renamed from pinkSectionText to be more generic
  sectionColor?: string; // Optional: defaults to pink for Defog, green for QuillBot
  largeText1?: string; // Optional: only for Defog
  largeText2?: string; // Optional: only for Defog
  hasBrandingButton?: boolean; // Optional: only for Defog
  brandingButtonUrl?: string; // Optional: only for Defog
  heroImage?: string; // Optional: for QuillBot hero image
  heroLogo?: string; // Optional: for QuillBot logo
  pdfSrc?: string; // Optional: for Plentum PDF
  stickerIcons?: string[]; // Optional: for Plentum sticker icons
  images: {
    product1: string;
    product2: string;
    product3: string;
  };
}

const projectsData: ProjectData[] = [
  {
    id: 'defog',
    title: 'Defog',
    heroText: 'BUILT TO TURN THOUGHTS INTO TASKS\nFROM VOICE, TO ORGANIZED ACTION.',
    year: '2025',
    type: 'web app (native coming soon)',
    role: 'UI/UX Design · BRANDING',
    design: 'Mobile-first, minimal, built from custom Figma components',
    intro: 'Defog listens.\nYou speak an idea, a reminder, or a plan. AI steps in — sorting what\'s quick to finish, and what deserves a little every day.\n\nEach task becomes either a Checklist Task (a small thing you can check off) or a Goal — a living thread of progress that grows daily.',
    videoSrc: '/lovable-uploads/defog-video-1.mp4',
    sectionText: 'Defog began with a question:\nWhat if productivity tools didn\'t demand structure, but adapted to it?\n\nMost task apps are built for planners.\nDefog was made for thinkers —\nfor moments when you just need to speak an idea before it disappears.\n\nAI does the organizing — not you.\nSo the app stays calm, even when your thoughts don\'t.',
    sectionColor: '#f29f97', // Pink
    largeText1: 'It starts with a single tap. A microphone appears. You speak. AI listens & categorizes',
    largeText2: 'Each day, you can add a small note of progress.\nA soft green glow marks the days you showed up.\nIt\'s subtle. Rewarding. Enough.',
    hasBrandingButton: true,
    brandingButtonUrl: 'https://heat-dingy-30135284.figma.site/',
    images: {
      product1: imgProductImage,
      product2: imgProductImage1,
      product3: imgProductImage2,
    }
  },
  {
    id: 'quillbot',
    title: 'QuillBot',
    heroText: 'REIMAGINED FOR CLARITY\nA NEW LOOK FOR THE WORLD\'S FAVOURITE PARAPHRASER.',
    year: '2025',
    type: 'web app',
    role: 'UI Design',
    design: 'UI & email templates for a leading AI paraphrasing app',
    intro: 'The app\'s interface felt outdated and inconsistent with its evolving brand identity. My goal was to modernise the experience while maintaining familiarity for existing users. I redesigned the UI using a blend of existing design systems and new brand guidelines, creating a cohesive, contemporary look that improved usability and visual clarity. To extend this refreshed identity, I also designed responsive email templates for free-tier users—ensuring the brand\'s new design language carried seamlessly across all touchpoints.',
    videoSrc: '/lovable-uploads/quillbot3.mp4',
    sectionText: 'The app was evolving fast — its design needed to keep pace.\nThe goal was to modernize the experience while staying true to what users already knew and loved.\nI refined the interface using new brand guidelines and existing systems, creating a smoother, more cohesive visual language.\nFrom the product to its emails, every detail now speaks the same design voice — calm, consistent, and contemporary.',
    sectionColor: '#e7f1e7', // Green
    heroImage: quillbotHeroGif, // GIF that plays on scroll
    heroLogo: quillbotLogo,
    images: {
      product1: quillbotProduct1, // To be confirmed
      product2: quillbotProduct2, // To be confirmed
      product3: quillbotProduct3, // To be confirmed
    }
  },
  {
    id: 'plentum',
    title: 'Plentum',
    heroText: 'WALKTHROUGH OF MY CREATIVE DIRECTION FOR SOCIAL MEDIA OF A PET SUPPLEMENTS BRAND, THROUGH AN INSTAGRAM POST TEMPLATE',
    year: '2025',
    type: 'Social Media Content Direction',
    role: 'Creative Direction',
    design: 'Social media post templates and creative direction',
    intro: 'Direct-to-consumer health supplements brand focused on premium wellness products and lifestyle enhancement.',
    videoSrc: '', // Not used for Plentum
    sectionText: '', // Not used for Plentum
    heroLogo: plentumLogo,
    pdfSrc: plentumPdf,
    stickerIcons: plentumStickers,
    images: {
      product1: '', // Not used
      product2: '', // Not used
      product3: '', // Not used
    }
  },
  {
    id: 'tbs',
    title: 'Timeless Beauty Secrets',
    heroText: 'WALKTHROUGH OF MY WORK & ART DIRECTION FOR SOCIAL MEDIA  at TIMELESS BEAUTY SECRETS',
    year: '2025',
    type: 'FULL TIME JOB',
    role: 'DESIGN, SOCIAL MEDIA, UI ',
    design: 'CLEAN MINIMAL SKINCARE BRAND AESTHETICS',
    intro: 'This page has the details of my work at my last Employer, Timeless beauty secrets, Bengaluru. I worked on a lot of projects including UI work for the website, social media branding, Designing static , motion and video assets across social media, advertising and print assets to packaging design, all divided in sections to explore',
    videoSrc: tbsHeroVideo,
    sectionText: '',
    sectionColor: '#eadbe5',
    heroLogo: tbsLogo,
    images: {
      product1: tbsPexels1,
      product2: tbsPexels2,
      product3: tbsPexels3,
    }
  }
];

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const project = projectsData.find(p => p.id === id);
  
  // Calculate next and previous project IDs
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectsData.length - 1;
  const nextIndex = currentIndex < projectsData.length - 1 ? currentIndex + 1 : 0;
  const prevProjectId = projectsData[prevIndex].id;
  const nextProjectId = projectsData[nextIndex].id;
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const lottie1Ref = useRef<any>(null);
  const lottie2Ref = useRef<any>(null);
  const quillbotGifRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const heroTextMobileRef = useRef<HTMLParagraphElement>(null);
  const defogHeroTextRef = useRef<HTMLParagraphElement>(null);
  const defogHeroTextMobileRef = useRef<HTMLParagraphElement>(null);
  const plentumHeroTextRef = useRef<HTMLParagraphElement>(null);
  const plentumHeroTextMobileRef = useRef<HTMLParagraphElement>(null);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [lottie1Data, setLottie1Data] = useState<any>(null);
  const [lottie2Data, setLottie2Data] = useState<any>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);

  // Load Lottie JSON files (only for Defog)
  useEffect(() => {
    if (project?.id === 'defog') {
      fetch('/lovable-uploads/defog-a-1.json')
        .then(res => res.json())
        .then(data => setLottie1Data(data))
        .catch(err => console.error('Error loading Lottie 1:', err));
      
      fetch('/lovable-uploads/defog-a-2.json')
        .then(res => res.json())
        .then(data => setLottie2Data(data))
        .catch(err => console.error('Error loading Lottie 2:', err));
    }
  }, [project?.id]);

  // Scroll to top when navigating to a project page or switching between projects
  // Use useLayoutEffect to run synchronously before browser paint
  useLayoutEffect(() => {
    // Scroll both window and documentElement to ensure it works across browsers
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Also use requestAnimationFrame as a fallback in case browser restoration happens after
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Additional fallback with a small delay to catch any late restoration
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate hero text on mount (similar to HeroSection but without delay)
  useEffect(() => {
    // QuillBot desktop
    if (heroTextRef.current) {
      gsap.set(heroTextRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.to(heroTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
    // QuillBot mobile
    if (heroTextMobileRef.current) {
      gsap.set(heroTextMobileRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.to(heroTextMobileRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
    // Defog desktop
    if (defogHeroTextRef.current) {
      gsap.set(defogHeroTextRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.to(defogHeroTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
    // Defog mobile
    if (defogHeroTextMobileRef.current) {
      gsap.set(defogHeroTextMobileRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.to(defogHeroTextMobileRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
    // Plentum desktop
    if (plentumHeroTextRef.current) {
      gsap.set(plentumHeroTextRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.to(plentumHeroTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
    // Plentum mobile
    if (plentumHeroTextMobileRef.current) {
      gsap.set(plentumHeroTextMobileRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.to(plentumHeroTextMobileRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
  }, [project?.id]);

  // Calculate parallax offset - phone moves 1.5x faster than scroll
  // Only apply parallax when scrolling within or past the hero section
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  const parallaxOffset = scrollY * 1.5;
  // Lotties move at half the speed of phone (0.75x)
  const lottieParallaxOffset = scrollY * 0.75;
  
  // Plentum sticker icons parallax - each with slightly different speeds
  const stickerParallaxSpeeds = [0.6, 0.7, 0.8, 0.65, 0.75, 0.85]; // Different speeds for each icon
  const stickerParallaxOffsets = stickerParallaxSpeeds.map(speed => scrollY * speed);
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const stickerInitialTop = viewportHeight + 200; // Start below viewport, not visible initially
  
  // Check if Lotties are visible (should start playing when visible)
  const lottieInitialTop = viewportHeight + 150; // Start below viewport, not visible initially (moved up by 50px)
  const lottieCurrentTop = lottieInitialTop - lottieParallaxOffset;
  const isLottieVisible = lottieCurrentTop < viewportHeight + 100; // Visible when within 100px of viewport

  // Control Lottie playback based on visibility
  useEffect(() => {
    if (lottie1Ref.current) {
      if (isLottieVisible) {
        lottie1Ref.current.play();
      } else {
        lottie1Ref.current.pause();
      }
    }
    if (lottie2Ref.current) {
      if (isLottieVisible) {
        lottie2Ref.current.play();
      } else {
        lottie2Ref.current.pause();
      }
    }
  }, [isLottieVisible]);

  // QuillBot GIF ref for parallax positioning
  const quillbotGifContainerRef = useRef<HTMLDivElement>(null);

  // Slideshow for QuillBot - slide animation (500ms) + display time (1500ms normal, 2000ms on hover)
  useEffect(() => {
    if (project?.id === 'quillbot') {
      // Start with first image visible
      setIsAnimating(true);
      
      // Calculate interval based on hover state: 500ms animation + display time
      const displayTime = isHovered ? 2000 : 1500; // 2s on hover, 1.5s normal
      const totalCycle = 500 + displayTime; // 500ms animation + display time
      
      const interval = setInterval(() => {
        // Change to next image and position it off-screen to the right
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % quillbotSlideshowImages.length);
        setIsAnimating(false);
        
        // Use requestAnimationFrame to ensure the image is positioned off-screen before animating
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Animate the new image in from the right (500ms animation)
            setIsAnimating(true);
          });
        });
      }, totalCycle);

      return () => clearInterval(interval);
    }
  }, [project?.id, isHovered]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-black mb-4">Project not found</h1>
          <Link to="/" className="text-link hover:text-link/80">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProjectNavbar />
      
      {/* Desktop Layout - Exact Figma Auto Layout Structure */}
      <div className="hidden md:block bg-white content-stretch flex flex-col gap-[10px] items-center justify-center w-full">
        {/* Hero Section - Black background with full viewport height */}
        {project.id === 'defog' ? (
          <div 
            ref={heroRef}
            className="bg-black box-border content-stretch flex flex-col gap-[60px] h-screen items-center overflow-clip px-[176px] py-[60px] relative shrink-0 w-full"
          >
            {/* Logo - exact dimensions (356x140), centered */}
            <div className="h-[140px] relative shrink-0 w-[356px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                  src={imgLogo} 
                  alt="Defog logo" 
                  className="absolute left-0 max-w-none w-full h-full top-0 object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </div>
            
            {/* Large text - full viewport width with 30px padding, positioned absolutely */}
            <p ref={defogHeroTextRef} className="font-playfair leading-[78px] not-italic absolute text-[#fbe4e2] text-[64px] text-center whitespace-pre-wrap left-[30px] right-[30px] top-[250px] z-10">
              {project.heroText}
            </p>
            
            {/* Phone mockup - parallax effect: moves 1.5x faster than scroll */}
            <div 
              ref={phoneRef}
              className="absolute h-[916px] left-1/2 w-[439px] z-20"
              style={{
                top: `${543 - parallaxOffset}px`,
                transform: 'translateX(-50%)',
                willChange: 'top',
              }}
            >
              <img 
                src={imgPhoneMockup} 
                alt="Defog app on iPhone" 
                className="block max-w-none w-full h-full object-contain"
              />
            </div>

            {/* Lottie Animation 1 - Left side, 60px left of phone */}
            {lottie1Data && (
              <div 
                className="absolute w-[100px] h-[100px] z-0"
                style={{
                  top: `${lottieInitialTop - lottieParallaxOffset}px`,
                  left: 'calc(50% - 279px)', // Phone center (50%) - phone width/2 (219.5px) - 60px = 50% - 279.5px
                  transform: 'translateX(-50%)',
                  willChange: 'top',
                }}
              >
                <Lottie
                  lottieRef={lottie1Ref}
                  animationData={lottie1Data}
                  loop={true}
                  autoplay={false}
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}

            {/* Lottie Animation 2 - Right side, 60px right of phone */}
            {lottie2Data && (
              <div 
                className="absolute w-[100px] h-[100px] z-0"
                style={{
                  top: `${lottieInitialTop - lottieParallaxOffset + 70}px`,
                  left: 'calc(50% + 279px)', // Phone center (50%) + phone width/2 (219.5px) + 60px = 50% + 279.5px
                  transform: 'translateX(-50%)',
                  willChange: 'top',
                }}
              >
                <Lottie
                  lottieRef={lottie2Ref}
                  animationData={lottie2Data}
                  loop={true}
                  autoplay={false}
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}
          </div>
        ) : project.id === 'quillbot' ? (
          // QuillBot Hero Section - Full viewport height like Defog
          <div 
            ref={heroRef}
            className="bg-black box-border content-stretch flex flex-col gap-[60px] h-screen items-center overflow-clip px-[176px] py-[60px] relative shrink-0 w-full"
          >
            {/* Logo - QuillBot logo */}
            <div className="h-[136.5px] relative shrink-0 w-[589.457px]">
              <img 
                src={project.heroLogo || quillbotLogo} 
                alt="QuillBot logo" 
                className="block max-w-none w-full h-full object-contain"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            
            {/* Large text - centered */}
            <p ref={heroTextRef} className="font-playfair leading-[78px] not-italic relative shrink-0 text-[#e7f1e7] text-[64px] text-center whitespace-pre-wrap w-[min-content] min-w-full">
              {project.heroText}
            </p>
            
            {/* GIF with parallax - positioned absolutely within hero section, like Defog phone */}
            {/* Position so 60% of GIF (242px) is visible at bottom of viewport initially */}
            <div 
              ref={quillbotGifContainerRef}
              className="absolute h-[404px] left-1/2 w-[497px] z-0"
              style={{
                // Position absolutely relative to hero section (like Defog phone at 543px)
                // We want 60% (242px) visible at viewport bottom
                // GIF is 404px tall, so if 242px is visible, top should be at: viewportHeight - 242px
                // Similar to phone positioning, use a fixed initial position that shows 60% at bottom
                top: `${(typeof window !== 'undefined' ? window.innerHeight : 800) - 242 - parallaxOffset}px`,
                transform: 'translateX(-50%)',
                willChange: 'top',
              }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img 
                  ref={quillbotGifRef}
                  src={project.heroImage || quillbotHeroGif}
                  alt="QuillBot hero" 
                  className="absolute h-[126.6%] left-[-41.45%] max-w-none top-[-11.11%] w-[182.8%] object-contain"
                />
              </div>
            </div>
            
            {/* Spacer container to extend hero section for parallax effect */}
            <div className="box-border content-stretch flex flex-col gap-[10px] h-[1051px] items-center px-[10px] py-[50px] relative shrink-0 w-full pointer-events-none" aria-hidden="true">
            </div>
          </div>
        ) : project.id === 'plentum' ? (
          // Plentum Hero Section - Full viewport height
          <div 
            ref={heroRef}
            className="bg-black box-border content-stretch flex flex-col gap-[60px] h-screen items-center overflow-clip px-[176px] py-[60px] relative shrink-0 w-full"
          >
            {/* Logo - Plentum logo */}
            <div className="h-[140px] relative shrink-0" style={{ aspectRatio: '171/40', width: 'auto' }}>
              <img 
                src={project.heroLogo || plentumLogo} 
                alt="Plentum logo" 
                className="block max-w-none w-full h-full object-contain"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            
            {/* Large text - centered */}
            <p ref={plentumHeroTextRef} className="font-playfair leading-[78px] not-italic relative shrink-0 text-white text-[64px] text-center whitespace-pre-wrap w-[min-content] min-w-full max-w-6xl">
              {project.heroText}
            </p>
            
            {/* Sticker icons with parallax - positioned horizontally across, hidden initially */}
            {project.stickerIcons && project.stickerIcons.map((sticker, index) => {
              const iconWidth = 100;
              const totalIcons = project.stickerIcons!.length;
              const containerWidth = 1200; // Total width for icon distribution
              const spacing = containerWidth / (totalIcons + 1);
              const leftPosition = spacing * (index + 1) - iconWidth / 2;
              const currentTop = stickerInitialTop - stickerParallaxOffsets[index];
              const isVisible = currentTop < viewportHeight + 100; // Visible when within 100px of viewport
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    stickerRefs.current[index] = el;
                  }}
                  className="absolute w-[100px] h-[100px] z-20"
                  style={{
                    top: `${currentTop}px`,
                    left: `calc(50% + ${leftPosition - containerWidth / 2}px)`,
                    transform: 'translateX(-50%)',
                    willChange: 'top',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <img 
                    src={sticker}
                    alt={`Plentum sticker ${index + 1}`}
                    className="block max-w-none w-full h-full object-contain"
                  />
                </div>
              );
            })}
            
            {/* Spacer container to extend hero section for parallax effect */}
            <div className="box-border content-stretch flex flex-col gap-[10px] h-[1051px] items-center px-[10px] py-[50px] relative shrink-0 w-full pointer-events-none" aria-hidden="true">
            </div>
          </div>
        ) : project.id === 'tbs' ? (
          // Timeless Beauty Secrets Hero Section - full-screen responsive video background
          <div
            ref={heroRef}
            className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-black px-6 py-16 md:px-20"
          >
            {/* Video background - lazy loaded */}
            <video
              ref={heroVideoRef}
              autoPlay
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHeroVideoReady ? 'opacity-100' : 'opacity-0'}`}
              controlsList="nodownload"
              loop
              playsInline
              muted
              preload="metadata"
              onCanPlayThrough={() => {
                if (!isHeroVideoReady) {
                  setIsHeroVideoReady(true);
                  heroVideoRef.current?.play().catch(() => {});
                }
              }}
            >
              <source src={tbsHeroVideo} type="video/mp4" />
            </video>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl text-center">
              {/* Logo - centered, scales slightly with viewport */}
              <div className="w-[140px] h-[142px] md:w-[190px] md:h-[192px]">
                <img
                  alt="Timeless Beauty Secrets Logo"
                  className="w-full h-full object-cover pointer-events-none"
                  src={tbsLogo}
                />
              </div>

              {/* Hero text with mixed fonts - responsive, wraps nicely */}
              <p className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] font-playfair text-white leading-tight text-3xl md:text-5xl lg:text-6xl">
                <span className="block">
                  WALKTHROUGH OF MY WORK & ART DIRECTION FOR SOCIAL MEDIA
                </span>
                <span className="block font-playfair italic mt-2 md:mt-3">
                  at
                </span>
                <span className="block mt-2 md:mt-3">
                  TIMELESS BEAUTY SECRETS
                </span>
              </p>
            </div>
          </div>
        ) : null}

        {/* Information and Intro Section - Auto Layout with gap-[100px], centered (skip for Plentum) */}
        {project.id !== 'plentum' && (
          <div className="box-border content-stretch flex flex-col gap-[100px] items-center justify-center pb-0 pt-[30px] px-[80px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full max-w-[1440px]">
            {/* Information Section */}
            <div className="content-stretch flex flex-col gap-[8px] items-center overflow-clip relative shrink-0">
              <div className="content-stretch flex font-inter font-normal gap-[8px] items-center leading-[18px] not-italic overflow-clip relative shrink-0 text-[14px] text-black uppercase">
                <p className="opacity-40 relative shrink-0 w-[88px]">year</p>
                <p className="relative shrink-0 w-[256px]">{project.year}</p>
              </div>
              <div className="content-stretch flex font-inter font-normal gap-[8px] items-center leading-[18px] not-italic overflow-clip relative shrink-0 text-[14px] text-black uppercase">
                <p className="opacity-40 relative shrink-0 w-[88px]">Type</p>
                <p className="relative shrink-0 w-[256px]">{project.type}</p>
              </div>
              <div className="content-stretch flex font-inter font-normal gap-[8px] items-center leading-[18px] not-italic overflow-clip relative shrink-0 text-[14px] text-black uppercase">
                <p className="opacity-40 relative shrink-0 w-[88px]">ROLE</p>
                <p className="relative shrink-0 w-[256px]">{project.role}</p>
              </div>
              <div className="content-stretch flex font-inter font-normal gap-[8px] items-center leading-[18px] not-italic overflow-clip relative shrink-0 text-[14px] text-black uppercase">
                <p className="opacity-40 relative shrink-0 w-[88px]">DESIGN</p>
                <p className="relative shrink-0 w-[256px]">{project.design}</p>
              </div>
            </div>

            {/* Intro Section */}
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className={`[grid-area:1_/_1] font-inter font-normal leading-[20px] ml-0 mt-0 not-italic relative text-[14px] text-black ${project.id === 'quillbot' ? 'w-[615px]' : project.id === 'tbs' ? 'w-[400px]' : 'w-[448px]'}`}>
                <p className="whitespace-pre-wrap">{project.intro}</p>
              </div>
            </div>
            </div>

          {/* Video Section - exact width w-[1111px] (skip for TBS, has different structure) */}
          {project.id !== 'tbs' && (
            <div className="h-[625px] relative rounded-[20px] shrink-0 w-[1111px]">
              <video 
                autoPlay 
                className="absolute max-w-none object-cover rounded-[20px] w-full h-full" 
                controlsList="nodownload" 
                loop 
                playsInline
                muted
              >
                <source src={project.videoSrc} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
        )}

        {/* TBS Specific Sections */}
        {project.id === 'tbs' && (
          <>
            {/* Section Title: "translating the brand on instagram" */}
            <div className="w-full flex items-center justify-center px-6 md:px-20 py-16">
              <p className="font-rethink font-bold text-black uppercase text-center tracking-[-0.08em] leading-tight text-3xl md:text-5xl lg:text-6xl max-w-5xl">
                translating the brand on instagram
              </p>
            </div>

            {/* Section: Text on left, Phone mockup on right with "OLD LOOK" label */}
            <div className="box-border content-stretch flex flex-col md:flex-row gap-[32px] items-start px-6 md:px-[80px] pt-[30px] pb-[15px] relative shrink-0 w-full">
              {/* Left: text */}
              <div className="md:flex-1 flex">
                <div className="md:h-[520px] flex items-start md:items-center">
                  <p className="font-rethink font-semibold text-[32px] md:text-[48px] text-black tracking-[-0.06em] uppercase leading-[1.1] max-w-[704px]">
                    I was tasked with ensuring the brand's Instagram presence was cohesive and aligned with Timeless Beauty Secrets' identity.
                  </p>
                </div>
              </div>

              {/* Right: phone + label */}
              <div className="md:flex-1 flex flex-col items-center md:items-end mt-10 md:mt-0">
                <div className="relative w-full max-w-[360px] md:max-w-[420px] md:h-[520px]">
                  <img
                    alt="Instagram old look"
                    className="w-full h-full object-contain pointer-events-none"
                    src={tbsPhoneMockup}
                  />
                </div>
                <p className="font-rethink font-semibold text-[16px] text-black mt-[16px]">
                  OLD LOOK
                </p>
              </div>
            </div>

            {/* Section: Icon (4.png), text, and moodboard */}
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-6 md:px-20 py-16 relative shrink-0 w-full">
                <div className="relative shrink-0 size-[213px]">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsIcon4} />
                </div>
                <div className="basis-0 flex flex-col font-rethink font-semibold grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[48px] text-black tracking-[-2.4px] uppercase">
                  <p className="leading-[normal]">The process begins with comprehensive research and market analysis, followed by the creation of a moodboard.</p>
                </div>
              </div>
              <div className="box-border content-stretch flex items-center justify-center px-6 md:px-10 py-0 relative shrink-0 w-full">
                <div className="relative w-full max-w-6xl">
                  <img
                    alt="Brand Moodboard"
                    className="w-full h-auto object-cover pointer-events-none rounded-[20px]"
                    src={tbsMoodboard}
                  />
                </div>
              </div>
            </div>

            {/* Section: Text and icon (3.png) */}
            <div className="box-border content-stretch flex items-center justify-between px-[80px] py-[200px] relative shrink-0 w-full">
              <div className="basis-0 flex flex-col font-rethink font-semibold grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[48px] text-black tracking-[-2.4px]">
                <p className="leading-[normal]">MOVING FORWARD WITH THE RESEARCH, WE ADOPT A MORE NATURAL LOOK INSTEAD OF HYPER BRANDED STATIC POSTS</p>
              </div>
              <div className="relative shrink-0 size-[240px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsIcon3} />
              </div>
            </div>

            {/* Image Gallery: 3 images in first row, 2 videos in second row */}
            <div className="box-border content-stretch flex flex-col gap-[48px] items-center justify-center px-6 md:px-10 py-[80px] relative shrink-0 w-full">
              {/* First row: 3 images – equal heights */}
              <div className="box-border content-stretch flex flex-wrap md:flex-nowrap gap-6 md:gap-10 xl:gap-[140px] items-stretch justify-center w-full max-w-6xl">
                <div className="relative overflow-clip rounded-[20px] w-full md:w-1/3 max-w-[385px] md:h-[578px]">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={tbsPexels1} />
                </div>
                <div className="relative overflow-clip rounded-[20px] w-full md:w-1/3 max-w-[387px] md:h-[578px]">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={tbsPexels2} />
                </div>
                <div className="relative overflow-clip rounded-[20px] w-full md:w-1/3 max-w-[385px] md:h-[578px]">
                  <img alt="" className="w-full h-full object-cover pointer-events-none" src={tbsPexels3} />
                </div>
              </div>
              {/* Second row: 2 videos – equal heights, large left card */}
              <div className="box-border content-stretch flex flex-wrap md:flex-nowrap gap-6 md:gap-10 xl:gap-[140px] items-stretch justify-center w-full max-w-6xl">
                <div className="relative rounded-[20px] w-full md:flex-[2] min-w-[260px] md:h-[578px]">
                  <video
                    autoPlay
                    className="w-full h-full object-cover rounded-[20px]"
                    controlsList="nodownload"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  >
                    <source src={tbsMotionVideo1} type="video/mp4" />
                  </video>
                </div>
                <div className="relative overflow-clip rounded-[20px] w-full md:flex-1 min-w-[220px] md:h-[578px]">
                  <video
                    autoPlay
                    className="w-full h-full object-cover rounded-[20px]"
                    controlsList="nodownload"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  >
                    <source src={tbsMotionVideo2} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            {/* Section Title: "Created ui elements for new products" */}
            <div className="w-full flex items-center justify-center px-6 md:px-20 py-16">
              <p className="font-rethink font-bold text-black uppercase text-center tracking-[-0.08em] leading-tight text-3xl md:text-5xl lg:text-6xl max-w-4xl">
                CREATED UI ELEMENTS FOR NEW PRODUCTS
              </p>
            </div>

            {/* Large UI video section – full width, no side padding */}
            <div className="w-full flex items-center justify-center px-0 py-0 relative shrink-0">
              <div className="relative w-full max-w-6xl rounded-[20px] overflow-hidden">
                <video
                  autoPlay
                  className="w-full h-full object-cover rounded-[20px]"
                  controlsList="nodownload"
                  loop
                  playsInline
                  muted
                  preload="metadata"
                >
                  <source src={tbsUiVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </>
        )}

        {/* PDF Display Section - Only for Plentum */}
        {project.id === 'plentum' && project.pdfSrc && (
          <div className="w-full bg-white">
            <iframe
              src={project.pdfSrc}
              className="w-full"
              style={{ height: '100vh', border: 'none' }}
              title="Plentum PDF"
            />
          </div>
        )}

        {/* Product Images - Using gap-[26px] and justify-center as per Figma (skip for Plentum and TBS) */}
        {project.id !== 'plentum' && project.id !== 'tbs' && (
          <div className="box-border content-stretch flex gap-[26px] items-start justify-center px-[80px] py-[30px] relative shrink-0 w-full">
          <div className="h-[625px] relative rounded-[20px] shrink-0 w-[640px]">
            <img 
              src={project.images.product1} 
              alt="Product image 1" 
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] w-full h-full"
            />
          </div>
          <div className="h-[625px] relative rounded-[20px] shrink-0 w-[448px]">
            <img 
              src={project.images.product2} 
              alt="Product image 2" 
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] w-full h-full"
            />
          </div>
        </div>
        )}

        {/* Colored Section - Updated structure with flex and grow (skip for Plentum and TBS) */}
        {project.id !== 'plentum' && project.id !== 'tbs' && (
          <div className="content-stretch flex h-[845px] items-center justify-center min-h-[845px] relative shrink-0 w-full">
          {/* Left side - Product image with grow */}
          <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0 overflow-hidden">
            {project.id === 'quillbot' ? (
              // Slideshow for QuillBot with slide animation
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden" 
                style={{ backgroundColor: '#000000' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img 
                  src={quillbotSlideshowImages[currentSlideIndex]} 
                  alt={`QuillBot slideshow ${currentSlideIndex + 1}`} 
                  className="absolute inset-0 max-w-none object-contain pointer-events-none w-full h-full transition-transform duration-500 ease-out"
                  style={{
                    transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
                  }}
                  key={currentSlideIndex}
                />
              </div>
            ) : (
              // Static image for Defog
              <>
                <img 
                  src={project.images.product3} 
                  alt="Product image 3" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full"
                />
                {/* Caption positioned at bottom - centered horizontally (only for Defog) */}
                <div className="absolute box-border content-stretch flex gap-[10px] items-center justify-center left-1/2 p-[10px] top-[733px] -translate-x-1/2">
                  <p className="font-playfair leading-[32px] lowercase not-italic relative shrink-0 text-[#6e6e6e] text-[24px] text-nowrap whitespace-pre">
                    INITIAL IDEA ON PAPER
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Right side - Colored background with grow */}
          <div className={`basis-0 box-border content-stretch flex flex-col gap-[10px] grow h-full items-center justify-center min-h-px min-w-px px-[80px] py-[160px] relative shrink-0`} style={{ backgroundColor: project.sectionColor || '#f29f97' }}>
            <div className={`font-rethink font-medium leading-[32px] relative shrink-0 text-[24px] uppercase w-full whitespace-pre-wrap ${project.sectionColor === '#e7f1e7' ? 'text-black' : 'text-white'}`}>
              {project.sectionText}
            </div>
          </div>
        </div>
        )}

        {/* Large Text Section - centered (only for Defog) */}
        {project.largeText1 && project.largeText2 && (
          <div className="content-stretch flex flex-col font-rethink font-medium gap-[40px] h-[772px] items-center justify-center relative shrink-0 text-black uppercase w-full">
            <p className="leading-[88px] relative shrink-0 text-[72px] w-[1003px] text-center">
              {project.largeText1}
            </p>
            <p className="leading-[40px] relative shrink-0 text-[32px] w-[1003px] text-center whitespace-pre-wrap">
              {project.largeText2}
            </p>
          </div>
        )}

        {/* Branding Document Button (only for Defog) */}
        {project.hasBrandingButton && project.brandingButtonUrl && (
          <div className="flex items-center justify-center w-full py-[53px]">
            <button 
              onClick={() => window.open(project.brandingButtonUrl, '_blank', 'noopener,noreferrer')}
              className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:text-rose-300 relative bg-neutral-800 h-20 w-80 border text-left px-6 py-4 text-gray-50 text-lg font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-0 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg font-rethink cursor-pointer"
            >
              <span className="relative z-10">See the branding document.</span>
            </button>
          </div>
        )}

        {/* Contact Button (only for QuillBot) */}
        {project.id === 'quillbot' && (
          <div className="flex items-center justify-center w-full py-[53px]">
            <button 
              onClick={() => window.location.href = 'mailto:kshitij0299@gmail.com'}
              className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:text-rose-300 relative bg-neutral-800 h-20 w-80 border text-left px-6 py-4 text-gray-50 text-lg font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-0 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg font-rethink cursor-pointer"
            >
              <span className="relative z-10">Contact me for prototypes</span>
            </button>
          </div>
        )}

        {/* Previous/Next Navigation - centered */}
        <div className={`box-border content-stretch flex gap-[224px] items-center justify-center overflow-clip px-0 relative shrink-0 w-full ${project.id === 'quillbot' ? 'py-[256px]' : 'py-[213px]'}`}>
          <Link to={`/project/${prevProjectId}`} className="relative size-[256px] flex items-center justify-center">
            <img 
              src={imgEllipse3} 
              alt="" 
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute flex flex-col font-rethink font-medium h-[72px] justify-center leading-[32px] left-[128px] text-[24px] text-center text-white top-[140px] -translate-x-1/2 -translate-y-1/2 uppercase w-[206px]">
              <p className="leading-[32px]">Previous project</p>
            </div>
            <div className="absolute h-[22px] left-[104px] top-[64px] w-[48px]">
              <div className="rotate-180">
                <svg className="w-full h-full" viewBox="0 0 48 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L46.5 11M46.5 11L36.5 1M46.5 11L36.5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
          
          <Link to={`/project/${nextProjectId}`} className="relative size-[256px] flex items-center justify-center">
            <img 
              src={imgEllipse3} 
              alt="" 
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute flex flex-col font-rethink font-medium h-[72px] justify-center leading-[32px] left-[128px] text-[24px] text-center text-white top-[140px] -translate-x-1/2 -translate-y-1/2 uppercase w-[192px]">
              <p className="mb-0">NEXT</p>
              <p>project</p>
            </div>
            <div className="absolute h-[22px] left-[104px] top-[64px] w-[48px]">
              <svg className="w-full h-full" viewBox="0 0 48 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 11L46.5 11M46.5 11L36.5 1M46.5 11L36.5 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Layout - Matching Figma Auto Layout */}
      <div className="block md:hidden bg-white w-full">
        {/* Hero Section - Black background */}
        {project.id === 'defog' ? (
          <div className="relative h-[559px] w-full overflow-hidden bg-black">
            <div className="absolute inset-0 p-[30px] flex flex-col gap-[40px] items-center">
              {/* Logo - maintaining 356x140 aspect ratio */}
              <div className="w-full max-w-[356px] flex-shrink-0" style={{ aspectRatio: '356/140' }}>
                <img 
                  src={imgLogo} 
                  alt="Defog logo" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
              <p ref={defogHeroTextMobileRef} className="font-playfair leading-[38px] text-[#fbe4e2] text-[36px] text-center whitespace-pre-wrap min-w-full w-[min-content] flex-shrink-0">
                {project.heroText}
              </p>
              <div className="h-[604px] w-[290px] flex-shrink-0">
                <img 
                  src={imgImage2} 
                  alt="Defog app" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ) : project.id === 'quillbot' ? (
          // QuillBot Mobile Hero
          <div className="relative w-full overflow-hidden bg-black">
            <div className="p-[30px] flex flex-col gap-[40px] items-center">
              {/* Logo */}
              <div className="w-full max-w-[589.457px] flex-shrink-0" style={{ aspectRatio: '589.457/136.5' }}>
                <img 
                  src={project.heroLogo || quillbotLogo} 
                  alt="QuillBot logo" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
              <p ref={heroTextMobileRef} className="font-playfair leading-[38px] text-[#e7f1e7] text-[36px] text-center whitespace-pre-wrap min-w-full w-[min-content] flex-shrink-0">
                {project.heroText}
              </p>
              {/* Hero GIF */}
              <div className="w-full max-w-[497px] h-[404px] flex-shrink-0">
                <img 
                  ref={quillbotGifRef}
                  src={project.heroImage || quillbotHeroGif}
                  alt="QuillBot hero" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ) : project.id === 'plentum' ? (
          // Plentum Mobile Hero
          <div className="relative w-full overflow-hidden bg-black">
            <div className="p-[30px] flex flex-col gap-[40px] items-center">
              {/* Logo */}
              <div className="w-full max-w-[171px] flex-shrink-0" style={{ aspectRatio: '171/40' }}>
                <img 
                  src={project.heroLogo || plentumLogo} 
                  alt="Plentum logo" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
              <p ref={plentumHeroTextMobileRef} className="font-playfair leading-[38px] text-white text-[36px] text-center whitespace-pre-wrap min-w-full w-[min-content] flex-shrink-0">
                {project.heroText}
              </p>
              {/* Sticker icons - simplified for mobile */}
              {project.stickerIcons && project.stickerIcons.slice(0, 3).map((sticker, index) => (
                <div key={index} className="w-[80px] h-[80px] flex-shrink-0">
                  <img 
                    src={sticker}
                    alt={`Plentum sticker ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : project.id === 'tbs' ? (
          // Timeless Beauty Secrets Mobile Hero - matching Figma
          <div className="box-border content-stretch flex flex-col gap-[60px] h-[869px] items-center overflow-clip p-[30px] relative shrink-0 w-full">
            {/* Video background - lazy loaded */}
            <video 
              ref={heroVideoRef}
              autoPlay 
              className={`absolute max-w-none object-cover size-full transition-opacity duration-500 ${isHeroVideoReady ? 'opacity-100' : 'opacity-0'}`}
              controlsList="nodownload" 
              loop 
              playsInline
              muted
              preload="metadata"
              onCanPlayThrough={() => {
                if (!isHeroVideoReady) {
                  setIsHeroVideoReady(true);
                  heroVideoRef.current?.play().catch(() => {});
                }
              }}
            >
              <source src={tbsHeroVideo} type="video/mp4" />
            </video>
            
            {/* Logo - Logo Black 1 */}
            <div className="h-[192px] relative shrink-0 w-[190px] z-10">
              <img 
                alt="Timeless Beauty Secrets Logo" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                src={tbsLogo} 
              />
            </div>
            
            {/* Hero text with mixed fonts */}
            <p className="[text-shadow:rgba(0,0,0,0.25)_0px_2.222px_2.222px] font-playfair leading-[43.333px] min-w-full not-italic relative shrink-0 text-[0px] text-center text-white w-[min-content] whitespace-pre-wrap z-10">
              <span className="text-[35.556px]">WALKTHROUGH OF MY WORK & ART DIRECTION FOR SOCIAL MEDIA  </span>
              <span className="font-playfair italic text-[45px]">at </span>
              <span className="text-[35.556px]">TIMELESS BEAUTY SECRETS</span>
            </p>
          </div>
        ) : null}

        {/* Information and Intro Section (skip for Plentum) */}
        {project.id !== 'plentum' && (
          <div className="flex flex-col gap-[32px] items-start p-[30px] w-full">
          {/* Information Section */}
          <div className="flex flex-col gap-[8px] items-start w-full flex-shrink-0">
            <div className="flex font-inter font-normal gap-[8px] items-center leading-[18px] text-[14px] text-black uppercase w-full">
              <p className="flex-1 opacity-40">year</p>
              <p className="flex-1">{project.year}</p>
            </div>
            <div className="flex font-inter font-normal gap-[8px] items-center leading-[18px] text-[14px] text-black uppercase w-full">
              <p className="flex-1 opacity-40">Type</p>
              <p className="flex-1">{project.type}</p>
            </div>
            <div className="flex font-inter font-normal gap-[8px] items-center leading-[18px] text-[14px] text-black uppercase w-full">
              <p className="flex-1 opacity-40">ROLE</p>
              <p className="flex-1">{project.role}</p>
            </div>
            <div className="flex font-inter font-normal gap-[8px] items-center leading-[18px] text-[14px] text-black uppercase w-full">
              <p className="flex-1 opacity-40">DESIGN</p>
              <p className="flex-1">{project.design}</p>
            </div>
          </div>
          
          {/* Intro Section */}
          <div className={`w-full flex-shrink-0 ${project.id === 'quillbot' ? 'max-w-full' : 'max-w-[342px]'}`}>
            <p className="font-inter font-normal leading-[20px] text-[14px] text-black whitespace-pre-wrap">
              {project.intro}
            </p>
          </div>
        </div>
        )}

        {/* PDF Display Section - Mobile (Only for Plentum) */}
        {project.id === 'plentum' && project.pdfSrc && (
          <div className="w-full bg-white">
            <iframe
              src={project.pdfSrc}
              className="w-full"
              style={{ height: '100vh', border: 'none' }}
              title="Plentum PDF"
            />
          </div>
        )}

        {/* Video Section (skip for Plentum and TBS - TBS has different structure) */}
        {project.id !== 'plentum' && project.id !== 'tbs' && (
          <div className="h-[625px] w-full">
          <video 
            autoPlay 
            loop 
            playsInline
            muted
            className="w-full h-full object-cover"
          >
            <source src={project.videoSrc} type="video/mp4" />
          </video>
          </div>
        )}

        {/* TBS Mobile Specific Sections */}
        {project.id === 'tbs' && (
          <>
            {/* Section Title: "translating the brand on instagram" */}
            <div className="box-border content-stretch flex gap-[10px] items-center justify-center p-[30px] relative shrink-0 w-full">
              <p className="basis-0 font-rethink font-bold grow leading-[43px] min-h-px min-w-px relative shrink-0 text-[36px] text-black tracking-[-1.8px] uppercase">
                translating the brand on instagram
              </p>
            </div>

            {/* Section: Text and Phone mockup */}
            <div className="box-border content-stretch flex flex-col gap-[30px] items-start p-[30px] relative shrink-0 w-full">
              <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
                <div className="basis-0 flex flex-col font-rethink font-semibold grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[24px] text-black tracking-[-1.2px] uppercase">
                  <p className="leading-[normal]">I was tasked with ensuring the brand's Instagram presence was cohesive and aligned with Timeless Beauty Secrets' identity.</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-full">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="[grid-area:1_/_1] h-[703px] ml-0 mt-0 relative w-[938px]">
                    <img alt="Instagram old look" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsPhoneMockup} />
                  </div>
                  <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[332.81px] mt-[581px] place-items-start relative">
                    <div className="[grid-area:1_/_1] flex h-[123.744px] items-center justify-center ml-[111px] mt-0 relative w-[161.371px]">
                      <div className="flex-none rotate-[326.334deg]">
                        <div className="h-[35.117px] relative w-[170.5px]">
                          <svg className="absolute inset-[-7.12%_-1.47%_-7.12%_-0.91%] w-full h-full" viewBox="0 0 170.5 35.117" fill="none">
                            <path d="M0 17.5585L170.5 17.5585M170.5 17.5585L160.5 1M170.5 17.5585L160.5 34.117" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="[grid-area:1_/_1] flex flex-col font-rethink font-semibold h-[34px] justify-center ml-0 mt-[93px] relative text-[16px] text-black translate-y-[-50%] w-[96px]">
                      <p className="leading-[normal]">OLD LOOK</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Icon (4.png) and text */}
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[30px] relative shrink-0 w-full">
              <div className="relative shrink-0 size-[213px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsIcon4} />
              </div>
              <div className="flex flex-col font-rethink font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[24px] text-black tracking-[-1.2px] uppercase w-[min-content]">
                <p className="leading-[normal]">The process begins with comprehensive research and market analysis, followed by the creation of a moodboard.</p>
              </div>
            </div>

            {/* Moodboard image */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[20px] py-0 relative shrink-0 w-full">
                <div className="aspect-[362/250] basis-0 grow min-h-px min-w-px relative shrink-0">
                  <img alt="Brand Moodboard" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsMoodboard} />
                </div>
              </div>
            </div>

            {/* Section: Text and icon (3.png) */}
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[30px] py-[80px] relative shrink-0 w-full">
              <div className="relative shrink-0 size-[240px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsIcon3} />
              </div>
              <div className="flex flex-col font-rethink font-semibold justify-center leading-[0] min-w-full relative shrink-0 text-[24px] text-black tracking-[-1.2px] w-[min-content]">
                <p className="leading-[normal]">MOVING FORWARD WITH THE RESEARCH, WE ADOPT A MORE NATURAL LOOK INSTEAD OF HYPER BRANDED STATIC POSTS</p>
              </div>
            </div>

            {/* Image Gallery: Stacked images and videos */}
            <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-0 py-[30px] relative shrink-0 w-full">
              {/* First row: 3 stacked images */}
              <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[30px] py-0 relative shrink-0 w-full">
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[20px] shrink-0 w-full">
                  <div className="aspect-[2731/4096] basis-0 grow min-h-px min-w-px relative shrink-0">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsPexels1} />
                  </div>
                </div>
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[20px] shrink-0 w-full">
                  <div className="aspect-[2433/3637] basis-0 grow min-h-px min-w-px relative shrink-0">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsPexels2} />
                  </div>
                </div>
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[20px] shrink-0 w-full">
                  <div className="aspect-[2731/4096] basis-0 grow min-h-px min-w-px relative shrink-0">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={tbsPexels3} />
                  </div>
                </div>
              </div>
              {/* Second row: 2 stacked videos (use same motion videos as desktop) */}
              <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[30px] py-0 relative shrink-0 w-full">
                <div className="aspect-[913/578] relative rounded-[20px] shrink-0 w-full">
                  <video
                    autoPlay
                    className="absolute max-w-none object-cover rounded-[20px] size-full"
                    controlsList="nodownload"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  >
                    <source src={tbsMotionVideo1} type="video/mp4" />
                  </video>
                </div>
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[20px] shrink-0 w-full">
                  <video
                    autoPlay
                    className="absolute max-w-none object-cover rounded-[20px] size-full"
                    controlsList="nodownload"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  >
                    <source src={tbsMotionVideo2} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Product Images - Stacked (skip for Plentum and TBS) */}
        {project.id !== 'plentum' && project.id !== 'tbs' && (
          <div className="flex flex-col items-center justify-center w-full">
          <div className="aspect-[640/625] w-full flex-shrink-0">
            <img 
              src={project.images.product1} 
              alt="Product image 1" 
              className="w-full h-full object-cover"
                />
              </div>
          <div className="h-[625px] w-full flex-shrink-0">
            <img 
              src={project.images.product2} 
              alt="Product image 2" 
              className="w-full h-full object-cover"
            />
          </div>
                </div>
        )}

        {/* Colored Section (skip for Plentum and TBS) */}
        {project.id !== 'plentum' && project.id !== 'tbs' && (
          <div className="flex flex-col items-start justify-center w-full">
          <div className="flex flex-col gap-[10px] items-center justify-center p-[30px] w-full flex-shrink-0" style={{ backgroundColor: project.sectionColor || '#f29f97' }}>
            <p className={`font-rethink font-medium leading-[32px] text-[16px] uppercase whitespace-pre-wrap w-full ${project.sectionColor === '#e7f1e7' ? 'text-black' : 'text-white'}`}>
              {project.sectionText}
            </p>
          </div>
          <div className="aspect-[640/800] w-full relative flex-shrink-0 overflow-hidden">
            {project.id === 'quillbot' ? (
              // Slideshow for QuillBot with slide animation
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden" 
                style={{ backgroundColor: '#000000' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img 
                  src={quillbotSlideshowImages[currentSlideIndex]} 
                  alt={`QuillBot slideshow ${currentSlideIndex + 1}`} 
                  className="absolute inset-0 max-w-none object-contain w-full h-full transition-transform duration-500 ease-out"
                  style={{
                    transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
                  }}
                  key={currentSlideIndex}
                />
              </div>
            ) : (
              // Static image for Defog
              <>
                <img 
                  src={project.images.product3} 
                  alt="Product image 3" 
                  className="w-full h-full object-cover"
                />
                <p className="absolute right-[-283px] top-[459.25px] translate-x-full font-playfair leading-[32px] lowercase text-[#6e6e6e] text-[24px] whitespace-pre">
                  INITIAL IDEA ON PAPER
                </p>
              </>
            )}
          </div>
        </div>
        )}

        {/* Large Text Section (only for Defog) */}
        {project.largeText1 && project.largeText2 && (
          <div className="flex flex-col gap-[48px] items-center justify-center p-[30px] text-black w-full">
            <p className="font-rethink font-medium text-[36px] uppercase text-center w-full">
              {project.largeText1}
            </p>
            <p className="font-rethink font-medium leading-[32px] text-[24px] uppercase text-center w-full whitespace-pre-wrap">
              {project.largeText2}
            </p>
          </div>
        )}

        {/* Contact Button (only for QuillBot) - Mobile */}
        {project.id === 'quillbot' && (
          <div className="flex items-center justify-center w-full py-[40px] px-[30px]">
            <button 
              onClick={() => window.location.href = 'mailto:kshitij0299@gmail.com'}
              className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:text-rose-300 relative bg-neutral-800 h-16 w-full max-w-[320px] border text-left px-6 py-4 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-0 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg font-rethink cursor-pointer"
            >
              <span className="relative z-10">Contact me for prototypes</span>
            </button>
          </div>
        )}

        {/* Previous/Next Navigation */}
        <div className="flex items-center justify-between p-[30px] w-full">
          <Link to={`/project/${prevProjectId}`} className="relative size-[139.826px] flex items-center justify-center">
            <img 
              src={imgEllipse3} 
              alt="" 
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute flex flex-col font-rethink font-medium h-[39.326px] justify-center leading-[17.478px] left-1/2 top-[76.47px] -translate-x-1/2 -translate-y-1/2 text-[13.109px] text-center text-white uppercase w-[112.516px]">
              <p>Previous project</p>
            </div>
            <div className="absolute h-[12.016px] left-[56.8px] top-[34.96px] w-[26.217px]">
              <div className="rotate-180">
                <svg className="w-full h-full" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6L25 6M25 6L20 1M25 6L20 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
          
          <Link to={`/project/${nextProjectId}`} className="relative size-[139.826px] flex items-center justify-center">
            <img 
              src={imgEllipse3} 
              alt="" 
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute flex flex-col font-rethink font-medium h-[39.326px] justify-center leading-[17.478px] left-1/2 top-[76.47px] -translate-x-1/2 -translate-y-1/2 text-[13.109px] text-center text-white uppercase w-[104.87px]">
              <p className="mb-0">NEXT</p>
              <p>project</p>
            </div>
            <div className="absolute h-[12.016px] left-[56.8px] top-[34.96px] w-[26.217px]">
              <svg className="w-full h-full" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6L25 6M25 6L20 1M25 6L20 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
