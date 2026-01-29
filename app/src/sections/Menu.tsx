import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
  tagColor?: string;
  tagIcon?: React.ElementType;
}

export default function Menu() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems: MenuItem[] = [
    {
      id: 'spicy-miso',
      name: t.menu.items.spicyMiso.name,
      description: t.menu.items.spicyMiso.description,
      price: t.menu.items.spicyMiso.price,
      image: '/images/spicy-miso.jpg',
      tag: t.menu.items.spicyMiso.tag,
      tagColor: '#EB00FF',
      tagIcon: Flame,
    },
    {
      id: 'tonkotsu',
      name: t.menu.items.tonkotsu.name,
      description: t.menu.items.tonkotsu.description,
      price: t.menu.items.tonkotsu.price,
      image: '/images/tonkotsu.jpg',
      tag: t.menu.items.tonkotsu.tag,
      tagColor: '#00FF9D',
      tagIcon: Star,
    },
    {
      id: 'karaage',
      name: language === 'pl' ? 'Karaage Rice Spicy' : 'Karaage Rice Spicy',
      description: t.menu.items.karaageRiceSpicy.description,
      price: t.menu.items.karaageRiceSpicy.price,
      image: '/images/karaage.jpg',
    },
    {
      id: 'gyoza',
      name: language === 'pl' ? 'Gyoza Wieprzowina' : 'Pork Gyoza',
      description: t.menu.items.gyozaPork.description,
      price: t.menu.items.gyozaPork.price,
      image: '/images/gyoza.jpg',
    },
  ];

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

      // Cards stagger animation
      const cards = carouselRef.current?.querySelectorAll('.menu-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2400FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EB00FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2
            className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black mb-4 px-2"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.menu.title}
          </h2>
          <p className="text-xl text-white/60 tracking-widest uppercase">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Menu Grid */}
        <div
          ref={carouselRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`menu-card cyber-card rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ${
                activeIndex === index ? 'ring-2 ring-[#2400FF] scale-105' : ''
              }`}
              onClick={() => handleCardClick(index)}
              style={{
                transform: activeIndex === index ? 'translateY(-10px)' : 'none',
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

                {/* Tag */}
                {item.tag && item.tagIcon && (
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-sm text-xs font-bold flex items-center gap-1"
                    style={{
                      backgroundColor: `${item.tagColor}20`,
                      color: item.tagColor,
                      border: `1px solid ${item.tagColor}`,
                    }}
                  >
                    <item.tagIcon className="w-3 h-3" />
                    {item.tag}
                  </div>
                )}

                {/* Price badge */}
                <div className="absolute bottom-3 left-3 bg-[#050505]/80 backdrop-blur-sm px-3 py-1 rounded-sm border border-[#00FF9D]">
                  <span className="text-[#00FF9D] font-bold">{item.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-1 transition-all duration-300"
                style={{
                  background: activeIndex === index
                    ? 'linear-gradient(90deg, #2400FF, #EB00FF)'
                    : 'transparent',
                }}
              />
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-16 text-center">
          <button className="group relative px-8 py-4 border border-[#2400FF] text-white font-bold uppercase tracking-wider overflow-hidden transition-all hover:border-[#EB00FF]">
            <span className="relative z-10">{language === 'pl' ? 'Zobacz Pełne Menu' : 'View Full Menu'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2400FF] to-[#EB00FF] opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { key: 'ramen', label: t.menu.categories.ramen },
            { key: 'gyoza', label: t.menu.categories.gyoza },
            { key: 'karaage', label: t.menu.categories.karaage },
            { key: 'sides', label: t.menu.categories.sides },
          ].map((cat) => (
            <div
              key={cat.key}
              className="px-6 py-2 border border-white/10 rounded-full text-white/50 text-sm hover:border-[#2400FF] hover:text-white transition-all cursor-pointer"
            >
              {cat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[#2400FF] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#EB00FF] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-5 w-1 h-20 bg-gradient-to-b from-transparent via-[#00FF9D]/50 to-transparent" />
    </section>
  );
}
