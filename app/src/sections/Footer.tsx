import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// TikTok icon (not in lucide-react)
const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/mesogdansk/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/RamenGdansk/', label: 'Facebook' },
    { icon: TikTok, href: 'https://www.tiktok.com/@meso.food', label: 'TikTok' },
  ];

  const navLinks = [
    { label: t.footer.links.menu, href: '#menu' },
    { label: t.footer.links.franchise, href: '/franchise' },
    { label: t.footer.links.contact, href: '#contact' },
    { label: t.footer.links.privacy, href: '#' },
  ];

  return (
    <footer className="relative w-full py-16 overflow-hidden border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img 
              src="/logo-meso-food-v3.jpg" 
              alt="MESO FOOD" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/60 mb-6">{t.footer.tagline}</p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#2400FF] hover:bg-[#2400FF]/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              LINKS
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#2400FF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {t.footer.contact.title}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${t.footer.contact.email}`}
                  className="flex items-center gap-2 text-white/60 hover:text-[#2400FF] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t.footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t.footer.contact.phone}`}
                  className="flex items-center gap-2 text-white/60 hover:text-[#2400FF] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t.footer.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                ul. Leśna 8/8, 80-322 Gdańsk
              </li>
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="pt-8 border-t border-white/10 mb-8">
          <div className="text-center text-white/40 text-sm space-y-1">
            <p>
              <strong className="text-white/60">Rychlicki Holding Sp. z o.o.</strong>
            </p>
            <p>ul. Leśna 8/8, 80-322 Gdańsk | NIP: 9571130261</p>
            <p>
              <a href="mailto:kontakt@mesofood.pl" className="hover:text-[#2400FF] transition-colors">
                kontakt@mesofood.pl
              </a>
              {' | '}
              <a href="tel:+48508118783" className="hover:text-[#2400FF] transition-colors">
                +48 508 118 783
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">{t.footer.copyright}</p>

          {/* Tech indicators */}
          <div className="flex items-center gap-4 text-xs text-white/30 font-mono">
            <span>v2.0.25</span>
            <span className="w-1 h-1 bg-[#00FF9D] rounded-full animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#2400FF]/20" />
    </footer>
  );
}
