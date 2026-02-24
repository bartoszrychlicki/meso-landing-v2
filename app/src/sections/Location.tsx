import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, MapPin, Truck, ChevronRight, Radio } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const pickupRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const renderLead = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="text-[#00FF9D] font-bold">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [leadRef.current, pickupRef.current, deliveryRef.current, mobileRef.current];
      targets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #050505 50%, #0a0a0a 50%)' }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
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
          <div className="inline-flex items-center gap-2 border border-[#00FF9D]/40 text-[#00FF9D] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm">
            <Radio className="w-3 h-3 animate-pulse" />
            {t.location.subtitle}
          </div>
        </div>

        {/* Lead */}
        <div ref={leadRef} className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-white/70 text-lg leading-relaxed">
            {renderLead(t.location.lead)}
          </p>
        </div>

        {/* Two cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* — PICKUP — */}
          <div ref={pickupRef} className="cyber-card rounded-lg overflow-hidden flex flex-col">
            {/* Card header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00FF9D]/10 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-[#00FF9D]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {t.location.pickup.title}
                </h3>
                <p className="text-white/50 text-xs">{t.location.pickup.subtitle}</p>
              </div>
            </div>

            {/* App CTA */}
            <div className="p-6 flex flex-col gap-5 flex-1">
              <a
                href={t.location.pickup.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn w-full text-white font-bold rounded-sm flex items-center justify-center gap-2 py-3"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', letterSpacing: '0.05em' }}
              >
                {t.location.pickup.appName}
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Address */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-[#EB00FF] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-semibold">{t.location.pickup.address}</p>
                </div>
              </div>

              {/* Map */}
              <div className="relative rounded-lg overflow-hidden" style={{ height: '220px' }}>
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#00FF9D] z-10 pointer-events-none" />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#00FF9D] z-10 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#00FF9D] z-10 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#00FF9D] z-10 pointer-events-none" />
                <iframe
                  src="https://maps.google.com/maps?q=Bosma%C5%84ska+1c%2C+D%C4%85browa+gmina+%C5%BBukowo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MESO Location"
                />
              </div>

              {/* More locations soon */}
              <div className="flex items-center gap-2 text-xs text-[#EB00FF]/80 border border-[#EB00FF]/20 rounded-sm px-3 py-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EB00FF] animate-pulse flex-shrink-0" />
                {t.location.pickup.moreSoon}
              </div>
            </div>
          </div>

          {/* — DELIVERY — */}
          <div ref={deliveryRef} className="cyber-card rounded-lg overflow-hidden flex flex-col">
            {/* Card header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#EB00FF]/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-[#EB00FF]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {t.location.delivery.title}
                </h3>
                <p className="text-white/50 text-xs">{t.location.delivery.subtitle}</p>
              </div>
            </div>

            {/* Partner logos */}
            <div className="p-6 flex flex-col gap-4 flex-1 justify-center">
              {/* Wolt */}
              <a
                href={t.location.delivery.woltUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#009DE0]/50 hover:bg-[#009DE0]/5 transition-all duration-300"
              >
                <img
                  src="/images/wolt-logo.svg"
                  alt="Wolt"
                  className="h-9 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Wolt</p>
                  <p className="text-white/40 text-xs">Zamów z dowozem</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#009DE0] group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Pyszne.pl */}
              <a
                href={t.location.delivery.pyszneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6600]/50 hover:bg-[#FF6600]/5 transition-all duration-300"
              >
                <img
                  src="/images/pyszne-logo.svg"
                  alt="Pyszne.pl"
                  className="h-9 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Pyszne.pl</p>
                  <p className="text-white/40 text-xs">Zamów z dowozem</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#FF6600] group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Glovo */}
              <a
                href={t.location.delivery.glovoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFC244]/50 hover:bg-[#FFC244]/5 transition-all duration-300"
              >
                <img
                  src="/images/glovo-logo.svg"
                  alt="Glovo"
                  className="h-9 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Glovo</p>
                  <p className="text-white/40 text-xs">Zamów z dowozem</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#FFC244] group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile distribution strip */}
        <div
          ref={mobileRef}
          className="cyber-card rounded-lg p-5 flex items-center gap-4 border-[#2400FF]/30"
        >
          <div className="w-10 h-10 rounded-lg bg-[#2400FF]/20 flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-[#2400FF]" />
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            {t.location.mobilePoints}
          </p>
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0 ml-auto">
            {['GDA', 'GDY', 'SOP', '···', 'PL'].map((city, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2 py-0.5 rounded-sm border"
                style={{
                  color: i < 3 ? '#00FF9D' : '#ffffff30',
                  borderColor: i < 3 ? '#00FF9D30' : '#ffffff10',
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EB00FF]/50 to-transparent" />
    </section>
  );
}
