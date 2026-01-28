import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: MessageCircle, href: '#', label: 'TikTok' },
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
            <h3
              className="text-4xl font-black mb-4"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #2400FF, #EB00FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MESO
            </h3>
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
              style={{ fontFamily: 'Orbitron, sans-serif' }}
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
              style={{ fontFamily: 'Orbitron, sans-serif' }}
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
                Banino, Gdańsk
              </li>
            </ul>
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
