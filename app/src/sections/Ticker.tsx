import { useLanguage } from '@/context/LanguageContext';

const items = [
  { text: 'Pierwsza ramenownia w Trójmieście', accent: false },
  { text: 'DELIVERY FIRST', accent: true },
  { text: '18 składników Spicy Mayo', accent: false },
  { text: 'MESO CLUB — zbieraj punkty', accent: true },
  { text: 'Gdańsk · Sopot · Gdynia', accent: false },
  { text: 'Smart Asian Comfort', accent: true },
  { text: '3 platformy dostawcze', accent: false },
  { text: 'ZAMÓW TERAZ', accent: true },
];

export default function Ticker() {
  const { language } = useLanguage();

  const enItems = [
    { text: 'First ramen bar in Trójmiasto', accent: false },
    { text: 'DELIVERY FIRST', accent: true },
    { text: '18 ingredients Spicy Mayo', accent: false },
    { text: 'MESO CLUB — earn points', accent: true },
    { text: 'Gdańsk · Sopot · Gdynia', accent: false },
    { text: 'Smart Asian Comfort', accent: true },
    { text: '3 delivery platforms', accent: false },
    { text: 'ORDER NOW', accent: true },
  ];

  const tickerItems = language === 'pl' ? items : enItems;
  // Duplicate for seamless loop
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-[#050505]" style={{ height: '44px' }}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

      {/* Scrolling track */}
      <div className="ticker-track flex items-center h-full gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="text-xs font-bold uppercase tracking-widest whitespace-nowrap px-6"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                color: item.accent ? '#EB00FF' : 'rgba(255,255,255,0.35)',
              }}
            >
              {item.text}
            </span>
            {/* Separator */}
            <span className="text-[#2400FF]/40 text-xs flex-shrink-0">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
