import React from 'react';

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
}

const WorkCard: React.FC<WorkCardProps> = ({ title, description, categories, media, onClick, backgroundColor = '#e4dbea', buttonColor = '#dca8ff' }) => {
  return (
    <div
      className="work-card relative grid grid-cols-2 w-full h-[646px] rounded-[20px] overflow-hidden gap-0 cursor-pointer"
      data-card="work-card"
      onClick={onClick}
      style={{
        border: '2px solid #000000',
        boxSizing: 'border-box'
      }}
    >
      {/* Left: text panel (Figma-specified) */}
      <div
        className="relative flex flex-col h-full flex-1"
        style={{ backgroundColor, paddingLeft: 16, paddingRight: 16, paddingTop: 60, paddingBottom: 0 }}
      >
        <div className="max-w-[658px]">
          <h3 className="font-playfair text-[40px] font-light text-black mb-6 tracking-[-0.02em]">
            {title}
          </h3>
          <p className="font-rethink text-[16px] text-black leading-relaxed mb-[60px]">
            {description}
          </p>
          <div className="grid grid-cols-2 gap-x-[12px] gap-y-[24px]">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white rounded-[50px] inline-flex items-center justify-center px-4 py-2 w-full border border-white/60">
                <span className="font-rethink text-[16px] text-black whitespace-pre leading-[1]">{cat}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="absolute left-4 right-4 bottom-[60px] h-[60px] flex items-center justify-center rounded-[50px] text-black font-rethink text-[16px] leading-[16px] p-0 border-0"
          style={{ background: buttonColor }}
        >
          View Project
        </button>
      </div>

      {/* Right: media pane */}
      <div className="relative h-full min-h-[240px] overflow-hidden bg-black w-full pointer-events-none">
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
    </div>
  );
};

export default WorkCard;


