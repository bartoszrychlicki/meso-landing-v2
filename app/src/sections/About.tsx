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
    { icon: Wallet, label: t.about.stats.affordability, color: '#00FF9D' },
    { icon: Utensils, label: t.about.stats.taste, color: '#EB00FF' },
    { icon: Lightbulb, label: t.about.stats.innovation, color: '#2400FF' },
  ];

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
        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left side - Title (vertical on desktop) */}
          <div className="lg:w-20 flex-shrink-0 hidden lg:block">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white/10 sticky top-24"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              {t.about.title}
            </h2>
          </div>

          {/* Content area */}
          <div className="flex-1">
            {/* Two column grid for content and image */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left column - Text content */}
              <div ref={contentRef} className="space-y-6">
                {/* Subtitle */}
                <h3
                  className="text-3xl sm:text-4xl font-bold"
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

              {/* Right column - Food Truck Image */}
              <div ref={imageRef}>
                <div className="relative">
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 border border-[#2400FF]/30 rounded-lg" />
                  <div className="absolute -inset-8 border border-[#EB00FF]/20 rounded-lg" />

                  <div className="cyber-card rounded-lg overflow-hidden">
                    <img
                      src="/images/food-truck.jpg"
                      alt="MESO Food Truck - Futurystyczny punkt gastronomiczny"
                      className="w-full h-auto object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00FF9D]" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00FF9D]" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00FF9D]" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00FF9D]" />
                  </div>

                  {/* Floating tech badge */}
                  <div className="absolute -bottom-4 -left-4 bg-[#111111] border border-[#EB00FF] px-4 py-2 rounded-sm">
                    <div className="text-xs text-[#EB00FF] font-mono">
                      <span className="text-white/50">MESO.</span>MOBILE
                    </div>
                  </div>

                  {/* Food truck label */}
                  <div className="absolute -top-4 -right-4 bg-[#111111] border border-[#00FF9D] px-4 py-2 rounded-sm">
                    <div className="text-xs text-[#00FF9D] font-bold uppercase tracking-wider">
                      Food Truck 2.0
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section - Full width below both columns */}
            <div ref={statsRef} className="mt-16">
              {/* Values Subheader */}
              <h4
                className="text-lg font-bold text-white/60 mb-6 uppercase tracking-widest text-center"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {t.about.valuesTitle}
              </h4>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-item cyber-card p-8 rounded-lg text-center group hover:scale-105 transition-transform"
                  >
                    <stat.icon
                      className="w-12 h-12 mx-auto mb-4 transition-transform group-hover:scale-110"
                      style={{ color: stat.color }}
                    />
                    <span className="text-white text-base font-bold">{stat.label}</span>
                  </div>
                ))}
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
