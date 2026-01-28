import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - character by character
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle typewriter effect
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power2.out' }
      );

      // CTA button
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1.5, ease: 'back.out(1.7)' }
      );

      // Hero image glitch reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.5, ease: 'power3.out' }
      );

      // Neon border pulse
      gsap.to('.neon-border', {
        boxShadow: '0 0 30px #2400FF, 0 0 60px #EB00FF',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Floating particles
      const particles = particlesRef.current?.querySelectorAll('.particle');
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: '-100vh',
            duration: 8 + Math.random() * 4,
            repeat: -1,
            delay: i * 0.5,
            ease: 'none',
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleOrderClick = () => {
    window.open('#', '_blank');
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden cyber-grid"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              background: i % 2 === 0 ? '#2400FF' : '#EB00FF',
            }}
          />
        ))}
      </div>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(36, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(36, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="text-center lg:text-left">
            {/* Logo / Title */}
            <h1
              ref={titleRef}
              className="text-7xl sm:text-8xl lg:text-9xl font-black mb-6 glitch"
              data-text="MESO"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {'MESO'.split('').map((char, i) => (
                <span key={i} className="char inline-block">
                  {char}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-white/80 mb-8 font-light tracking-widest"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {t.hero.subtitle}
            </p>

            {/* Japanese characters */}
            <p className="text-4xl sm:text-5xl mb-10 text-white/40" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
              メソ
            </p>

            {/* CTA Button */}
            <button
              ref={ctaRef}
              onClick={handleOrderClick}
              className="neon-btn text-white text-lg rounded-sm"
            >
              {t.hero.cta}
            </button>
          </div>

          {/* Right side - Image */}
          <div ref={imageRef} className="relative">
            <div className="neon-border relative rounded-lg overflow-hidden border-2 border-transparent">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#2400FF] z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#EB00FF] z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#EB00FF] z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#2400FF] z-10" />

              <img
                src="/images/hero-ramen.jpg"
                alt="MESO Ramen"
                className="w-full h-auto object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

              {/* Tech overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="text-xs text-[#00FF9D] font-mono">
                  <div>SYS.STATUS: ONLINE</div>
                  <div>TEMP: 98.6°C</div>
                </div>
                <div className="text-xs text-[#EB00FF] font-mono">
                  <div>v2.0.25</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#111111] border border-[#00FF9D] px-4 py-2 rounded-sm float">
              <span className="text-[#00FF9D] text-sm font-bold">SMART FOOD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </button>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
    </section>
  );
}
