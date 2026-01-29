import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChefHat, Award, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with scan effect
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scan line effect
      gsap.to('.scan-line', {
        top: '100%',
        duration: 2,
        repeat: -1,
        ease: 'none',
      });

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Badges stagger
      const badges = contentRef.current?.querySelectorAll('.badge');
      if (badges) {
        gsap.fromTo(
          badges,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2400FF]/5 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-semibold mb-4 px-2"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.team.title}
          </h2>
          <p className="text-xl text-white/60 tracking-widest uppercase">
            {t.team.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left side - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-[#2400FF]/30 rounded-lg" />
              <div className="absolute -inset-8 border border-[#EB00FF]/20 rounded-lg" />

              {/* Image/Video container */}
              <div className="cyber-card rounded-lg overflow-hidden h-full relative">
                {!showVideo ? (
                  <div
                    className="cursor-pointer group transition-all duration-300 hover:scale-[1.02] h-full relative"
                    onClick={() => setShowVideo(true)}
                  >
                    <img
                      src="/images/maciej.jpg"
                      alt={t.team.maciej.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                    />

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#2400FF]/20 via-[#EB00FF]/10 to-[#00FF9D]/20" />
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(36,0,255,0.4)]" />
                    </div>

                    {/* Click hint */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="bg-[#2400FF]/90 backdrop-blur-sm px-6 py-3 rounded-full border border-[#2400FF] shadow-lg shadow-[#2400FF]/50">
                        <p className="text-white font-bold text-sm tracking-wider uppercase">
                          {t.team.clickToWatch}
                        </p>
                      </div>
                    </div>

                    {/* Scan line overlay */}
                    <div className="scan-line absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF9D] to-transparent opacity-50" />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#2400FF]" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#2400FF]" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#EB00FF]" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#EB00FF]" />

                    {/* Bottom info bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050505] to-transparent">
                      <div className="flex items-center gap-2 text-xs text-[#00FF9D] font-mono">
                        <span>ID:</span>
                        <span>MACIEJ_K_001</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <video
                      src="/videos/Animacja_Postaci_Do_Gry.mp4"
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    >
                      Twoja przeglądarka nie wspiera odtwarzania wideo.
                    </video>

                    {/* Corner accents for video */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00FF9D] pointer-events-none" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00FF9D] pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#EB00FF] pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#EB00FF] pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[#111111] border border-[#EB00FF] px-4 py-2 rounded-sm float">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-[#EB00FF]" />
                  <span className="text-[#EB00FF] text-sm font-bold">CHEF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div ref={contentRef} className="space-y-6">
            <div>
              <h3
                className="text-3xl sm:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {t.team.maciej.name}
              </h3>
              <p className="text-lg text-[#2400FF]">{t.team.maciej.role}</p>
            </div>

            <div className="cyber-card p-6 rounded-lg">
              <p className="text-white/80 leading-relaxed text-lg">
                {t.team.maciej.description}
              </p>
            </div>

            {/* Badges/Achievements */}
            <div className="flex flex-wrap gap-3">
              <div className="badge flex items-center gap-2 px-4 py-2 bg-[#2400FF]/10 border border-[#2400FF]/30 rounded-full">
                <Award className="w-4 h-4 text-[#2400FF]" />
                <span className="text-sm text-white/80">Pioneer</span>
              </div>
              <div className="badge flex items-center gap-2 px-4 py-2 bg-[#EB00FF]/10 border border-[#EB00FF]/30 rounded-full">
                <Star className="w-4 h-4 text-[#EB00FF]" />
                <span className="text-sm text-white/80">Top Rated</span>
              </div>
              <div className="badge flex items-center gap-2 px-4 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-full">
                <ChefHat className="w-4 h-4 text-[#00FF9D]" />
                <span className="text-sm text-white/80">Master Chef</span>
              </div>
            </div>

            {/* Quote */}
            <div className="relative pl-6 border-l-2 border-[#2400FF]">
              <p className="text-white/60 italic text-lg">
                "Smak to przyszłość, którą można zjeść."
              </p>
              <p className="text-white/40 text-sm mt-2">— Maciej Krawczun</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-[#2400FF]/20 rounded-full" />
      <div className="absolute top-20 right-20 w-10 h-10 border border-[#EB00FF]/20 rounded-full" />
    </section>
  );
}
