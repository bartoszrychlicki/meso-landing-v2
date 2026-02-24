import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '@/context/LanguageContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Menu from '@/sections/Menu';
import Location from '@/sections/Location';
import Team from '@/sections/Team';
import CTA from '@/sections/CTA';
import Ticker from '@/sections/Ticker';
import Footer from '@/sections/Footer';
import Franchise from '@/pages/Franchise';

gsap.registerPlugin(ScrollTrigger);

function MainPage() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navigation />
      <Hero />
      <Ticker />
      <About />
      <Menu />
      <Location />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}

function AppContent() {
  // Simple routing based on pathname
  const path = window.location.pathname;

  if (path === '/franchise') {
    return <Franchise />;
  }

  return <MainPage />;
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
