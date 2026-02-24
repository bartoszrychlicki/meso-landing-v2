import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
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

      // Infinite grid zoom effect
      gsap.to(gridRef.current, {
        scale: 1.5,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      // Button hover shake
      const buttons = sectionRef.current?.querySelectorAll('.cta-button');
      if (buttons) {
        buttons.forEach((btn) => {
          btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
              x: 'random(-3, 3)',
              y: 'random(-3, 3)',
              duration: 0.1,
              repeat: 3,
              yoyo: true,
              ease: 'none',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOrderClick = () => {
    window.open('https://order.mesofood.pl', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] w-full py-24 overflow-hidden flex items-center justify-center"
    >
      {/* Cyberpunk background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/cta-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: 'saturate(1.15) brightness(0.55)' }}
          aria-hidden="true"
        />
        {/* Dark overlay gradient — top + bottom fade to site bg */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, #050505 0%, transparent 18%, transparent 82%, #050505 100%)'
        }} />
        {/* Center dark vignette so text is readable */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.65) 100%)'
        }} />
        {/* Subtle animated grid on top for cyberpunk depth */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(36, 0, 255, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(36, 0, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#2400FF' : '#EB00FF',
              opacity: 0.5,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h2
          ref={titleRef}
          className="text-4xl xs:text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 px-2"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            textShadow: `
              0 0 20px #2400FF,
              0 0 40px #2400FF,
              0 0 80px #EB00FF
            `,
          }}
        >
          <span className="text-white">{t.cta.title.split(' ')[0]}</span>{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.cta.title.split(' ')[1]}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-white/60 mb-12 tracking-wider">
          {t.cta.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={handleOrderClick}
            className="cta-button neon-btn text-white text-lg rounded-sm flex items-center gap-3"
          >
            <ExternalLink className="w-5 h-5" />
            {t.cta.button}
          </button>


        </div>

        {/* Tech decorations */}
        <div className="mt-16 flex justify-center gap-8 text-xs text-white/30 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#2400FF] rounded-full animate-pulse" />
            <span>ORDER READY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EB00FF] rounded-full animate-pulse" />
            <span>DELIVERY ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
