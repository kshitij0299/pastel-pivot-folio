import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  previewImage?: string;
  color: string;
}

export const ProjectCard = ({
  title,
  category,
  year,
  description,
  tags,
  previewImage,
  color
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'project-card relative rounded-2xl p-8 cursor-hover transition-all duration-300',
        'bg-white border border-gray-100 hover:border-gray-200'
      )}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Year badge */}
      <div className="font-inter text-sm text-body mb-4">{year}</div>

      {/* Project info */}
      <div className="mb-6">
        <h3 className="font-playfair text-2xl font-semibold text-heading mb-2 tracking-[-0.06em]">{title}</h3>
        <p className="font-inter text-body text-sm font-medium mb-4">{category}</p>
        <p className="font-inter text-body leading-relaxed">{description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-inter px-3 py-1 bg-white/60 rounded-full text-xs font-medium text-body"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Visit site link */}
      <div className="flex items-center text-link">
        <span className="font-inter text-sm font-medium">VISIT SITE</span>
        <svg
          className={cn(
            'ml-2 w-4 h-4 transition-transform duration-300',
            isHovered ? 'translate-x-1' : ''
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>

      {/* Preview image overlay */}
      {previewImage && isHovered && (
        <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
          <div className="w-32 h-32 bg-white rounded-lg shadow-xl flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
        </div>
      )}
    </div>
  );
};