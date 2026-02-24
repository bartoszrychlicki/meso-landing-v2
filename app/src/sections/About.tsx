import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wallet, Utensils, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to('.hexagon', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Wallet, label: t.about.stats.affordability.label, description: t.about.stats.affordability.description, color: '#00FF9D' },
    { icon: Utensils, label: t.about.stats.taste.label, description: t.about.stats.taste.description, color: '#EB00FF' },
    { icon: Lightbulb, label: t.about.stats.innovation.label, description: t.about.stats.innovation.description, color: '#2400FF' },
  ];

  const renderDescription = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="text-[#00FF9D] font-bold">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Background hexagon pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="hexagon w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hexagons" width="10" height="10" patternUnits="userSpaceOnUse">
              <polygon
                points="5,0 10,2.5 10,7.5 5,10 0,7.5 0,2.5"
                fill="none"
                stroke="#2400FF"
                strokeWidth="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Vertical title */}
          <div className="lg:w-20 flex-shrink-0 hidden lg:block">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white/10 sticky top-24"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              {t.about.title}
            </h2>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Subtitle - above both columns */}
            <h3
              className="text-3xl sm:text-4xl font-bold mb-8"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.about.subtitle}
            </h3>

            {/* Two columns grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left column */}
              <div className="flex flex-col">
                <div ref={contentRef} className="cyber-card p-6 rounded-lg mb-8">
                  <p className="text-lg text-white/80 leading-relaxed">
                    {renderDescription(t.about.description)}
                  </p>
                </div>

                <div ref={statsRef}>
                  <h4
                    className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {t.about.valuesTitle}
                  </h4>

                  <div className="space-y-3">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="stat-item cyber-card p-4 rounded-lg flex items-start gap-4 group hover:scale-[1.02] transition-transform"
                      >
                        <stat.icon
                          className="w-8 h-8 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                          style={{ color: stat.color }}
                        />
                        <div>
                          <span className="text-white text-sm font-bold block">{stat.label}</span>
                          <p className="text-white/50 text-xs mt-1 leading-relaxed">{stat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Image */}
              <div ref={imageRef} className="flex items-start">
                <div className="relative w-full">
                  <div className="absolute -inset-4 border border-[#2400FF]/30 rounded-lg" />
                  <div className="absolute -inset-8 border border-[#EB00FF]/20 rounded-lg" />

                  <div className="cyber-card rounded-lg overflow-hidden">
                    <img
                      src="/images/food-truck.jpg"
                      alt="MESO Food Truck - Futurystyczny punkt gastronomiczny"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00FF9D]" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00FF9D]" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00FF9D]" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00FF9D]" />
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-[#111111] border border-[#EB00FF] px-4 py-2 rounded-sm">
                    <div className="text-xs text-[#EB00FF] font-mono">
                      <span className="text-white/50">MESO.</span>MOBILE
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 bg-[#111111] border border-[#00FF9D] px-4 py-2 rounded-sm">
                    <div className="text-xs text-[#00FF9D] font-bold uppercase tracking-wider">
                      Food Truck 2.0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2400FF]/50 to-transparent" />
    </section>
  );
}
