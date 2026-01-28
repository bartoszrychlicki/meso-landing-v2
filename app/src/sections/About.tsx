import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Zap } from 'lucide-react';
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
      // Title animation
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

      // Content cards stagger
      const cards = contentRef.current?.querySelectorAll('.content-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats animation
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

      // Image reveal
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

      // Hexagon rotation
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
    { icon: Sparkles, label: t.about.stats.authenticity, color: '#2400FF' },
    { icon: Shield, label: t.about.stats.quality, color: '#EB00FF' },
    { icon: Zap, label: t.about.stats.innovation, color: '#00FF9D' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden"
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
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left side - Title (vertical on desktop) */}
          <div className="lg:w-24 flex-shrink-0">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white/10 lg:writing-mode-vertical lg:-rotate-180"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              {t.about.title}
            </h2>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Subtitle */}
            <h3
              className="text-3xl sm:text-4xl font-bold mb-8"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.about.subtitle}
            </h3>

            {/* Content cards */}
            <div ref={contentRef} className="space-y-6 mb-12">
              <div className="content-card cyber-card p-6 rounded-lg">
                <p className="text-lg text-white/80 leading-relaxed">
                  {t.about.description1}
                </p>
              </div>

              <div className="content-card cyber-card p-6 rounded-lg">
                <p className="text-lg text-white/80 leading-relaxed">
                  {t.about.description2}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item cyber-card p-6 rounded-lg text-center group"
                >
                  <stat.icon
                    className="w-8 h-8 mx-auto mb-3 transition-transform group-hover:scale-110"
                    style={{ color: stat.color }}
                  />
                  <span className="text-white/80 text-sm font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div ref={imageRef} className="lg:w-1/3">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-[#2400FF]/30 rounded-lg" />
              <div className="absolute -inset-8 border border-[#EB00FF]/20 rounded-lg" />

              <div className="cyber-card rounded-lg overflow-hidden">
                <img
                  src="/images/about-food.jpg"
                  alt="MESO Food"
                  className="w-full h-auto object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00FF9D]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00FF9D]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00FF9D]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00FF9D]" />
              </div>

              {/* Floating tech badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#111111] border border-[#2400FF] px-4 py-2 rounded-sm">
                <div className="text-xs text-[#2400FF] font-mono">
                  <span className="text-white/50">SYS.</span>COMFORT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2400FF]/50 to-transparent" />
    </section>
  );
}
