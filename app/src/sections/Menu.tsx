import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star, Soup, Ham, ChefHat, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  tag?: string;
  tagColor?: string;
  tagIcon?: React.ElementType;
  special?: boolean;
}

export default function Menu() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const catsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    {
      key: 'ramen',
      label: t.menu.categories.ramen,
      description: t.menu.categories.descriptions.ramen,
      icon: Soup,
      color: '#EB00FF',
    },
    {
      key: 'karaage',
      label: t.menu.categories.karaage,
      description: t.menu.categories.descriptions.karaage,
      icon: Flame,
      color: '#FF6B35',
    },
    {
      key: 'gyoza',
      label: t.menu.categories.gyoza,
      description: t.menu.categories.descriptions.gyoza,
      icon: Ham,
      color: '#00FF9D',
    },
    {
      key: 'sides',
      label: t.menu.categories.sides,
      description: t.menu.categories.descriptions.sides,
      icon: Plus,
      color: '#2400FF',
    },
  ];

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
      name: t.menu.items.gyozaShrimp.name,
      description: t.menu.items.gyozaShrimp.description,
      price: t.menu.items.gyozaShrimp.price,
      image: '/images/gyoza.jpg',
    },
    {
      id: 'spicy-mayo',
      name: t.menu.spicyMayo.name,
      description: t.menu.spicyMayo.description,
      price: '',
      image: '/images/spicy-mayo.png',
      tag: t.menu.spicyMayo.tag,
      tagColor: '#FF6B35',
      tagIcon: ChefHat,
      special: true,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      const catItems = catsRef.current?.querySelectorAll('.cat-item');
      if (catItems) {
        gsap.fromTo(catItems, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: catsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }

      const cards = carouselRef.current?.querySelectorAll('.menu-card');
      if (cards) {
        gsap.fromTo(cards, { y: 80, opacity: 0, rotateY: -15 }, {
          y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: carouselRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2400FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EB00FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-10">
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
            {t.menu.title}
          </h2>
        </div>

        {/* Categories intro */}
        <div ref={catsRef}>
          <p className="text-center text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {t.menu.categories.intro}
          </p>

          {/* 4 category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {categories.map((cat, i) => (
              <div
                key={cat.key}
                className="cat-item group relative cyber-card rounded-xl overflow-hidden flex flex-col hover:scale-[1.03] transition-all duration-300 cursor-default"
                style={{ minHeight: '200px' }}
              >
                {/* Colored top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

                {/* Subtle color wash in background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${cat.color}12, transparent 70%)` }}
                />

                <div className="relative flex flex-col flex-1 p-6 gap-4">
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-4xl font-black leading-none"
                      style={{ fontFamily: 'Rajdhani, sans-serif', color: `${cat.color}30` }}
                    >
                      0{i + 1}
                    </span>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}40` }}
                    >
                      <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                  </div>

                  {/* Label */}
                  <h4
                    className="text-xl font-bold uppercase tracking-wide"
                    style={{ fontFamily: 'Rajdhani, sans-serif', color: cat.color }}
                  >
                    {cat.label}
                  </h4>

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed flex-1">{cat.description}</p>

                  {/* Scan line on hover */}
                  <div
                    className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out mt-auto"
                    style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sygnatury label */}
        <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-8">
          {t.menu.subtitle}
        </p>

        {/* Menu Grid — 5 cards */}
        <div
          ref={carouselRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`menu-card cyber-card rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ${
                activeIndex === index ? 'ring-2 ring-[#2400FF] scale-105' : ''
              } ${item.special ? 'lg:col-span-1' : ''}`}
              onClick={() => setActiveIndex(index)}
              style={{ transform: activeIndex === index ? 'translateY(-10px)' : 'none' }}
            >
              {/* Image or Special background */}
              {item.image ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  {item.tag && item.tagIcon && (
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-sm text-xs font-bold flex items-center gap-1"
                      style={{ backgroundColor: `${item.tagColor}20`, color: item.tagColor, border: `1px solid ${item.tagColor}` }}
                    >
                      <item.tagIcon className="w-3 h-3" />
                      {item.tag}
                    </div>
                  )}
                  {item.special && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#050505]/80 border border-[#FF6B35]/40 px-2 py-1 rounded-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse inline-block" />
                      <span className="text-[10px] text-[#FF6B35] font-mono uppercase tracking-wider">wkrótce w sprzedaży</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Spicy Mayo — special no-photo card */
                <div className="relative h-48 overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #1a0505 100%)' }}
                >
                  {/* Animated drip pattern */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 30% 40%, #FF6B35 0%, transparent 50%), radial-gradient(circle at 70% 60%, #EB00FF 0%, transparent 40%)',
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-2">🌶️</div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: '#FF6B35', fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      18 składników
                    </div>
                  </div>
                  {item.tag && item.tagIcon && (
                    <div
                      className="absolute top-3 right-3 px-3 py-1 rounded-sm text-xs font-bold flex items-center gap-1"
                      style={{ backgroundColor: `${item.tagColor}20`, color: item.tagColor, border: `1px solid ${item.tagColor}` }}
                    >
                      <item.tagIcon className="w-3 h-3" />
                      {item.tag}
                    </div>
                  )}
                  {/* "wkrótce" badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#050505]/80 border border-[#FF6B35]/40 px-2 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse inline-block" />
                    <span className="text-[10px] text-[#FF6B35] font-mono uppercase tracking-wider">wkrótce w sprzedaży</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {item.name}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-1 transition-all duration-300"
                style={{
                  background: activeIndex === index ? 'linear-gradient(90deg, #2400FF, #EB00FF)' : 'transparent',
                }}
              />
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://order.mesofood.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block px-8 py-4 border border-[#2400FF] text-white font-bold uppercase tracking-wider overflow-hidden transition-all hover:border-[#EB00FF]"
          >
            <span className="relative z-10">{language === 'pl' ? 'Zobacz Pełne Menu' : 'View Full Menu'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2400FF] to-[#EB00FF] opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-[#2400FF] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-[#EB00FF] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-5 w-1 h-20 bg-gradient-to-b from-transparent via-[#00FF9D]/50 to-transparent" />
    </section>
  );
}
