'use client';

import Logo from './Logo'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();

  // Ne pas afficher la navigation flottante sur la page de réservation
  const isReservationPage = pathname === '/reservation';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Détecter la section active seulement si pas sur la page de réservation
      if (!isReservationPage) {
        const sections = ['hero', 'about', 'menu', 'gallery', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
            }
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReservationPage]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="container mx-auto pl-2 landscape:pl-0 landscape:-ml-4 md:pl-6 pr-4 py-4 flex justify-start">
        <div className="transition-all duration-300 opacity-100">
          <Logo />
        </div>
      </div>
    </nav>
  )
} 