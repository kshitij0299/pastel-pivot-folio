import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

export interface WorkCardMedia {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

export interface WorkCardProps {
  title: string;
  description: string;
  categories: string[];
  media: WorkCardMedia;
  onClick?: () => void;
  backgroundColor?: string;
  buttonColor?: string;
  showDialog?: boolean;
  behanceUrl?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ title, description, categories, media, onClick, backgroundColor = '#e4dbea', buttonColor = '#dca8ff', showDialog = false, behanceUrl }) => {
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const clickCircleRef = useRef<HTMLSpanElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dialogButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogCircleRef = useRef<HTMLSpanElement | null>(null);
  const laterButtonRef = useRef<HTMLButtonElement | null>(null);
  const laterCircleRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const clickTlRef = useRef<gsap.core.Timeline | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);
  const clickTweenRef = useRef<gsap.core.Tween | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const ease = 'power3.easeOut';
  useEffect(() => {
    const layout = () => {
      const circle = circleRef.current;
      const button = buttonRef.current;
      
      if (!circle || !button) return;

      const rect = button.getBoundingClientRect();
      const { width: w, height: h } = rect;

      // Calculate circle dimensions and position (similar to PillNav)
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      // Create timeline for hover animation
      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });
      
      tl.to(circle, { 
        scale: 1.2, 
        xPercent: -50, 
        duration: 2, 
        ease, 
        overwrite: 'auto' 
      }, 0);

      tlRef.current = tl;
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleMouseEnter = () => {
    const tl = tlRef.current;
    const button = buttonRef.current;
    
    if (!tl || !button) return;

    activeTweenRef.current?.kill();
    
    // Animate circle expansion
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });

    // Change button background to white
    gsap.to(button, {
      backgroundColor: '#ffffff',
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    const tl = tlRef.current;
    const button = buttonRef.current;
    
    if (!tl || !button) return;

    activeTweenRef.current?.kill();
    
    // Animate circle contraction
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });

    // Change button background back to original color
    gsap.to(button, {
      backgroundColor: buttonColor,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Don't stop propagation - let ClickSpark handle the spark effect
    const button = buttonRef.current;
    const clickCircle = clickCircleRef.current;
    
    if (!button || !clickCircle) return;

    // Get click position relative to button
    const rect = button.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Get button dimensions
    const { width: w, height: h } = rect;

    // Calculate circle dimensions (same as hover circle)
    const R = ((w * w) / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
    const originY = D - delta;

    // Position click circle at click point
    clickCircle.style.width = `${D}px`;
    clickCircle.style.height = `${D}px`;
    clickCircle.style.left = `${clickX}px`;
    clickCircle.style.top = `${clickY}px`;
    clickCircle.style.bottom = 'auto';
    clickCircle.style.transformOrigin = `50% ${originY}px`;

    // Kill any existing click animation
    clickTweenRef.current?.kill();
    clickTlRef.current?.kill();

    // Reset and animate click circle
    gsap.set(clickCircle, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 1
    });

    // Create timeline for click animation
    const clickTl = gsap.timeline({
      onComplete: () => {
        // Show dialog if showDialog is true, otherwise call onClick
        if (showDialog) {
          setIsDialogOpen(true);
        } else if (onClick) {
          onClick();
        }
      }
    });
    
    // Expand circle and change background back to original color
    clickTl.to(clickCircle, {
      scale: 1.2,
      xPercent: -50,
      yPercent: -50,
      duration: 0.8,
      ease,
      overwrite: 'auto'
    }, 0);

    // Change button background from white to original color
    clickTl.to(button, {
      backgroundColor: buttonColor,
      duration: 0.8,
      ease,
      overwrite: 'auto'
    }, 0);

    // Fade out circle after animation
    clickTl.to(clickCircle, {
      opacity: 0,
      duration: 0.1,
      ease,
      overwrite: 'auto'
    }, 0.7);

    clickTlRef.current = clickTl;
  };

  // Dialog button hover and click handlers (similar to main button)
  useEffect(() => {
    if (!isDialogOpen) return;

    const layout = (circle: HTMLSpanElement | null, button: HTMLButtonElement | null) => {
      if (!circle || !button) return;

      const rect = button.getBoundingClientRect();
      const { width: w, height: h } = rect;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });
    };

    // Layout both buttons
    layout(dialogCircleRef.current, dialogButtonRef.current);
    layout(laterCircleRef.current, laterButtonRef.current);
  }, [isDialogOpen]);

  const handleDialogButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Don't stop propagation - let ClickSpark handle the spark effect
    if (behanceUrl) {
      window.open(behanceUrl, '_blank', 'noopener,noreferrer');
    }
    setIsDialogOpen(false);
  };

  const handleDialogButtonMouseEnter = () => {
    const button = dialogButtonRef.current;
    const circle = dialogCircleRef.current;
    
    if (!button || !circle) return;

    gsap.to(circle, {
      scale: 1.2,
      xPercent: -50,
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });

    gsap.to(button, {
      backgroundColor: '#ffffff',
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleDialogButtonMouseLeave = () => {
    const button = dialogButtonRef.current;
    const circle = dialogCircleRef.current;
    
    if (!button || !circle) return;

    gsap.to(circle, {
      scale: 0,
      xPercent: -50,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });

    gsap.to(button, {
      backgroundColor: buttonColor,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLaterButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Don't stop propagation - let ClickSpark handle the spark effect
    setIsDialogOpen(false);
  };

  const handleLaterButtonMouseEnter = () => {
    const button = laterButtonRef.current;
    const circle = laterCircleRef.current;
    
    if (!button || !circle) return;

    gsap.to(circle, {
      scale: 1.2,
      xPercent: -50,
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });

    gsap.to(button, {
      backgroundColor: '#ffffff',
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLaterButtonMouseLeave = () => {
    const button = laterButtonRef.current;
    const circle = laterCircleRef.current;
    
    if (!button || !circle) return;

    gsap.to(circle, {
      scale: 0,
      xPercent: -50,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });

    gsap.to(button, {
      backgroundColor: 'transparent',
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  return (
    <div
      className="work-card relative grid grid-cols-1 md:grid-cols-2 md:grid-rows-none grid-rows-[1fr,auto] w-full h-[100svh] md:h-[500px] rounded-none md:rounded-[20px] overflow-hidden gap-0"
      data-card="work-card"
      style={{
        boxSizing: 'border-box',
        border: `2px solid ${buttonColor}`
      }}
    >
      {/* Left: text panel (Figma-specified) */}
      <div
        className="relative flex flex-col h-[333px] md:h-full flex-1 shrink-0 self-stretch order-2 md:order-1 gap-[40px] items-start"
        style={{ backgroundColor, paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 60 }}
      >
        <div className="max-w-[658px] flex flex-col items-start gap-[24px] pb-4">
          <div className="flex flex-col items-start gap-[16px] w-full">
            <h3 className="font-playfair text-[24px] md:text-[40px] font-light text-black tracking-[-0.02em]">
              {title}
            </h3>
            <p className="font-rethink text-[12px] md:text-[16px] text-black leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-start content-start gap-2 self-stretch">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white rounded-[50px] inline-flex items-center justify-center px-2 py-1 gap-[10px] border border-white/60">
                <span className="font-rethink text-[10px] md:text-[16px] text-black whitespace-pre leading-[1]">{cat}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          ref={buttonRef}
          type="button"
          className="absolute left-4 right-4 bottom-[24px] sm:bottom-[40px] md:bottom-[60px] h-[60px] flex items-center justify-center rounded-[50px] text-black font-rethink text-[16px] leading-[16px] p-0 border-0 overflow-hidden cursor-pointer"
          style={{ background: buttonColor, bottom: 'var(--mobile-button-bottom, 24px)' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <span
            className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
            style={{
              background: '#ffffff',
              willChange: 'transform'
            }}
            aria-hidden="true"
            ref={circleRef}
          />
          <span
            className="click-circle absolute rounded-full z-[1] block pointer-events-none"
            style={{
              background: buttonColor,
              willChange: 'transform'
            }}
            aria-hidden="true"
            ref={clickCircleRef}
          />
          <span className="relative z-[2]">
            View Project
          </span>
        </button>
      </div>

      {/* Right: media pane */}
      <div className="relative h-full min-h-[240px] overflow-hidden bg-black w-full pointer-events-none order-1 md:order-2">
        {media.type === 'image' ? (
          <img src={media.src} alt={title} className="absolute inset-0 w-full h-full object-cover select-none" />
        ) : (
          <video
            src={media.src}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={media.poster}
          />
        )}
      </div>

      {/* Dialog for Behance projects */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-[400px] w-[90vw] rounded-[20px] p-6 gap-6 border-0 shadow-xl [&>button]:hidden"
          style={{ backgroundColor }}
        >
          <div className="flex flex-col gap-6">
            <p className="font-rethink text-[14px] md:text-[16px] text-black leading-relaxed">
              This will direct you to my Behance where this document sits. Click here to see the branding doc
            </p>
            <div className="flex gap-3 w-full">
              <button
                ref={laterButtonRef}
                type="button"
                className="relative h-[50px] flex-1 flex items-center justify-center rounded-[50px] text-black font-rethink text-[14px] leading-[14px] p-0 overflow-hidden"
                style={{ 
                  background: 'transparent',
                  border: `2px solid ${buttonColor}`,
                  boxSizing: 'border-box'
                }}
                onMouseEnter={handleLaterButtonMouseEnter}
                onMouseLeave={handleLaterButtonMouseLeave}
                onClick={handleLaterButtonClick}
              >
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{
                    background: '#ffffff',
                    willChange: 'transform'
                  }}
                  aria-hidden="true"
                  ref={laterCircleRef}
                />
                <span className="relative z-[2]">
                  Later
                </span>
              </button>
              <button
                ref={dialogButtonRef}
                type="button"
                className="relative h-[50px] flex-1 flex items-center justify-center rounded-[50px] text-black font-rethink text-[14px] leading-[14px] p-0 border-0 overflow-hidden"
                style={{ background: buttonColor }}
                onMouseEnter={handleDialogButtonMouseEnter}
                onMouseLeave={handleDialogButtonMouseLeave}
                onClick={handleDialogButtonClick}
              >
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{
                    background: '#ffffff',
                    willChange: 'transform'
                  }}
                  aria-hidden="true"
                  ref={dialogCircleRef}
                />
                <span className="relative z-[2]">
                  View Project
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkCard;


