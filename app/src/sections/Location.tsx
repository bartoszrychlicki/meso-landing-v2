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
            className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 px-2"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
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
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
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

          {/* Right side - Google Maps */}
          <div ref={mapRef} className="relative">
            <div className="cyber-card rounded-lg overflow-hidden aspect-square">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2321.5!2d18.4283!3d54.4397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0b5b5b5b5b5b%3A0x0!2sBanino%2C%20Poland!5e0!3m2!1sen!2spl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MESO Location - Banino, Gdańsk"
              />

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00FF9D] pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00FF9D] pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00FF9D] pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00FF9D] pointer-events-none" />
            </div>

            {/* Floating coordinates */}
            <div className="absolute -bottom-4 -right-4 bg-[#111111] border border-[#EB00FF] px-4 py-2 rounded-sm">
              <div className="text-xs text-[#EB00FF] font-mono">
                54.4397°N 18.4283°E
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
