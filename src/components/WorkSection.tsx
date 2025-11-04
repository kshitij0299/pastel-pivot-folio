import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorkCard from '@/components/WorkCard';
export const WorkSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLUListElement>(null);
  const projects = [{
    title: 'Plentum',
    category: 'Social Media Post | Content Direction',
    description: 'Direct-to-consumer health supplements brand focused on premium wellness products and lifestyle enhancement',
    features: ['Curriculum designed by Industry leaders for maximum impact.', 'Track your growth instantly with personalized dashboards.', 'Master skills through interactive and immersive learning.']
  }, {
    title: 'The Ad Club',
    category: 'Brand Identity | Visual Design',
    description: 'Creative branding and visual identity design for advertising club from Bengaluru'
  }, {
    title: 'Logos & Case Studies',
    category: 'Brand Identity | Logo Design | Case Studies',
    description: 'Collection of brand identity designs and logo creation projects showcasing strategic thinking and creative execution'
  }, {
    title: 'Timeless Beauty Secrets',
    category: 'Design | Creative Direction | Social Media Strategy',
    description: 'Comprehensive branding and social media strategy for skincare brand from Bengaluru (currently working here)'
  }, {
    title: 'The Hiring Company (Work in Progress)',
    category: 'UI/UX • Web App • 0→1',
    description: 'Complete UI/UX design for an AI-powered Applicant Tracking System (ATS) web application. End-to-end design process from concept to implementation, focusing on user experience optimization for both recruiters and candidates in the modern hiring landscape.'
  }, {
    title: 'Bay Nature',
    category: 'Editorial | Layout Design',
    description: 'Editorial layout design assessment for magazine featuring nature content and storytelling'
  }];
  return <section id="work" ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-5xl w-[95%]">
        <ul ref={cardsContainerRef} id="cards" className="cards-list">
          <li className="card" id="card1" style={{ '--index': 1 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={projects[0].title}
                description={projects[0].description}
                categories={projects[0].category.split(/\s*[•|]\s*/).filter(Boolean)}
                media={{ type: 'image', src: '/lovable-uploads/ee03460e-9aed-4104-b034-c34d269412f7.png' }}
                backgroundColor="#e4dbea"
                buttonColor="#dca8ff"
              />
            </div>
          </li>

          <li className="card" id="card2" style={{ '--index': 2 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={'Defog'}
                description={'A unique daily task management app'}
                categories={'UI/UX • Web App • Branding • 0→1'.split(/\s*[•|]\s*/)}
                media={{ type: 'video', src: '/lovable-uploads/defog_kinda_corrected.mp4' }}
                backgroundColor="#dbe5f0"
                buttonColor="#a8d0ff"
              />
            </div>
          </li>

          <li className="card" id="card3" style={{ '--index': 3 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={projects[1].title}
                description={projects[1].description}
                categories={projects[1].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/ddff190e-68d3-4994-9abd-27a98cafec8e.png' }}
                backgroundColor="#dbeadc"
                buttonColor="#a8ffa8"
              />
            </div>
          </li>

          <li className="card" id="card4" style={{ '--index': 4 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={projects[2].title}
                description={projects[2].description}
                categories={projects[2].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/f4f28388-07b6-4ef1-9f2b-d0bdc6b0a79e.png' }}
                backgroundColor="#f0e5db"
                buttonColor="#ffd0a8"
              />
            </div>
          </li>

          <li className="card" id="card5" style={{ '--index': 5 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={projects[3].title}
                description={projects[3].description}
                categories={projects[3].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/2711c5dc-8e65-449b-9e96-084aacf9128d.png' }}
                backgroundColor="#eadbe5"
                buttonColor="#ffa8dc"
              />
            </div>
          </li>

          <li className="card" id="card6" style={{ '--index': 6 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={projects[4].title}
                description={projects[4].description}
                categories={projects[4].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/16a24bcb-dd11-479f-aa7e-8b7bf9db1672.png' }}
                backgroundColor="#dbeae5"
                buttonColor="#a8ffdc"
              />
            </div>
          </li>

          <li className="card" id="card7" style={{ '--index': 7 } as React.CSSProperties}>
            <div className="card-body">
              <WorkCard
                title={projects[5].title}
                description={projects[5].description}
                categories={projects[5].category.split(/\s*[•|]\s*/)}
                media={{ type: 'image', src: '/lovable-uploads/7fe75674-f948-425c-8974-41752de61f6c.png' }}
                backgroundColor="#f0eadb"
                buttonColor="#ffdca8"
              />
            </div>
          </li>
        </ul>
      </div>
    </section>;
};