import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.location, href: '#location' },
    { label: t.nav.team, href: '#team' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-2xl font-semibold"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MESO
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white/70 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2400FF] transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Language switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-[#2400FF] transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>

              {/* Order button (desktop) */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block px-6 py-2 bg-gradient-to-r from-[#2400FF] to-[#5E22F5] text-white text-sm font-bold uppercase tracking-wider rounded-sm hover:shadow-[0_0_20px_rgba(36,0,255,0.5)] transition-all"
              >
                {t.nav.order}
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#050505]/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-3xl font-bold text-white hover:text-[#2400FF] transition-colors"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Order button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-8 py-4 bg-gradient-to-r from-[#2400FF] to-[#EB00FF] text-white text-lg font-bold uppercase tracking-wider rounded-sm"
          >
            {t.nav.order}
          </a>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-[#2400FF]/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#EB00FF]/20 rounded-full" />
      </div>
    </>
  );
}
