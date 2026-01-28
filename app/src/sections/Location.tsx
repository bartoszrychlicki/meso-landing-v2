import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Map animation
      gsap.fromTo(
        mapRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pin bounce animation
      gsap.to('.map-pin', {
        y: -10,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Diagonal split background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #050505 50%, #0a0a0a 50%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.location.title}
          </h2>
          <p className="text-xl text-white/60 tracking-widest uppercase">
            {t.location.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div ref={contentRef} className="space-y-8">
            {/* Address card */}
            <div className="cyber-card p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#2400FF]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#2400FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {t.location.subtitle}
                  </h3>
                  <p className="text-2xl text-white/80">{t.location.address}</p>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="cyber-card p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EB00FF]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#EB00FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {t.location.hours}
                  </h3>
                  <p className="text-2xl text-white/80">{t.location.schedule}</p>
                  <div className="flex items-center gap-2 mt-2 text-[#00FF9D]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{t.location.days}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full neon-btn text-white text-lg rounded-sm flex items-center justify-center gap-3">
              <Navigation className="w-5 h-5" />
              {t.location.cta}
            </button>
          </div>

          {/* Right side - Map visualization */}
          <div ref={mapRef} className="relative">
            <div className="cyber-card rounded-lg overflow-hidden aspect-square">
              {/* Stylized map background */}
              <div className="absolute inset-0 bg-[#0a0a0a]">
                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(36, 0, 255, 0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(36, 0, 255, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Streets */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#1a1a1a" strokeWidth="20" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#1a1a1a" strokeWidth="20" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#111" strokeWidth="10" />
                  <line x1="0" y1="300" x2="400" y2="300" stroke="#111" strokeWidth="10" />
                  <line x1="100" y1="0" x2="100" y2="400" stroke="#111" strokeWidth="10" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="#111" strokeWidth="10" />
                </svg>

                {/* Location pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="map-pin relative">
                    <div className="w-16 h-16 rounded-full bg-[#2400FF]/30 flex items-center justify-center animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-[#2400FF]/50 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {/* Pulse rings */}
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-[#2400FF] animate-ping opacity-30" />
                  </div>
                </div>

                {/* MESO label */}
                <div className="absolute top-1/2 left-1/2 translate-x-4 -translate-y-1/2 mt-12">
                  <div className="bg-[#111111] border border-[#2400FF] px-4 py-2 rounded-sm">
                    <span className="text-[#2400FF] font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      MESO
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00FF9D]" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00FF9D]" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00FF9D]" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00FF9D]" />
            </div>

            {/* Floating coordinates */}
            <div className="absolute -bottom-4 -right-4 bg-[#111111] border border-[#EB00FF] px-4 py-2 rounded-sm">
              <div className="text-xs text-[#EB00FF] font-mono">
                54.3520°N 18.6466°E
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EB00FF]/50 to-transparent" />
    </section>
  );
}
