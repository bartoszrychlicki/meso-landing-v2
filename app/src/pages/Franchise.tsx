import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Truck, User, TrendingUp, Headphones, Check, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Franchise() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroContent = heroRef.current?.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      }

      // Benefits stagger
      const benefitCards = benefitsRef.current?.querySelectorAll('.benefit-card');
      if (benefitCards) {
        gsap.fromTo(
          benefitCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Investment animation
      gsap.fromTo(
        investmentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: investmentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: Truck,
      title: t.franchise.benefits.items[0].title,
      description: t.franchise.benefits.items[0].description,
      color: '#2400FF',
    },
    {
      icon: User,
      title: t.franchise.benefits.items[1].title,
      description: t.franchise.benefits.items[1].description,
      color: '#EB00FF',
    },
    {
      icon: TrendingUp,
      title: t.franchise.benefits.items[2].title,
      description: t.franchise.benefits.items[2].description,
      color: '#00FF9D',
    },
    {
      icon: Headphones,
      title: t.franchise.benefits.items[3].title,
      description: t.franchise.benefits.items[3].description,
      color: '#5E22F5',
    },
  ];

  const includes = t.franchise.investment.includes;

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">{language === 'pl' ? 'Wróć' : 'Back'}</span>
            </a>

            <a
              href="/"
              className="text-2xl font-black"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MESO
            </a>

            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2400FF]/10 rounded-full blur-3xl" />
        </div>

        <div className="hero-content relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.franchise.title}
          </h1>
          <p className="text-xl text-white/60 tracking-widest uppercase mb-8">
            {t.franchise.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.franchise.hero.title}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t.franchise.hero.description}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl sm:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <span className="text-white">{t.franchise.benefits.title.split(' ')[0]}</span>{' '}
            <span className="text-[#2400FF]">MESO?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card cyber-card p-8 rounded-lg text-center group hover:scale-105 transition-transform"
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${benefit.color}20` }}
                >
                  <benefit.icon className="w-8 h-8" style={{ color: benefit.color }} />
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section ref={investmentRef} className="py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#EB00FF]/5 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Investment info */}
            <div>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-8"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span className="text-white">{t.franchise.investment.title}</span>
              </h2>

              <div className="cyber-card p-8 rounded-lg mb-8">
                <div
                  className="text-5xl sm:text-6xl font-black mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #00FF9D, #2400FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t.franchise.investment.amount}
                </div>
                <p className="text-white/70 text-lg">{t.franchise.investment.description}</p>
              </div>

              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {language === 'pl' ? 'W Cenie:' : 'Includes:'}
              </h3>

              <ul className="space-y-3">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70">
                    <div className="w-6 h-6 rounded-full bg-[#00FF9D]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#00FF9D]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - CTA */}
            <div className="cyber-card p-8 rounded-lg text-center">
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {t.franchise.cta.title}
              </h3>
              <p className="text-white/60 mb-8">{t.franchise.cta.description}</p>

              <a
                href={`mailto:franchise@meso.pl`}
                className="neon-btn text-white text-lg rounded-sm inline-flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                {t.franchise.cta.button}
              </a>

              {/* Contact info */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-sm mb-2">
                  {language === 'pl' ? 'Lub napisz do nas:' : 'Or write to us:'}
                </p>
                <a
                  href="mailto:franchise@meso.pl"
                  className="text-[#2400FF] hover:text-[#EB00FF] transition-colors"
                >
                  franchise@meso.pl
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/"
            className="text-2xl font-black inline-block mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MESO
          </a>
          <p className="text-white/40 text-sm">© 2025 MESO. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
