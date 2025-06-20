'use client';

import Logo from './Logo'
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Détecter la section active
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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto pl-2 landscape:pl-0 landscape:-ml-4 md:pl-6 pr-4 py-4 flex justify-start">
        <div className="transition-all duration-300 opacity-100">
          <Logo />
        </div>
      </div>

      {/* Navigation flottante - visible sur mobile ET desktop */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-transparent rounded-full p-2">
          <nav className="flex flex-col space-y-2">
            {[
              { id: 'hero', label: 'Accueil', icon: '🏠' },
              { id: 'about', label: 'À propos', icon: '🌶️' },
              { id: 'menu', label: 'Menu', icon: '🍽️' },
              { id: 'gallery', label: 'Galerie', icon: '📸' },
              { id: 'contact', label: 'Contact', icon: '📞' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  activeSection === item.id 
                    ? 'bg-accent-red text-white shadow-lg' 
                    : 'bg-transparent text-white hover:bg-accent-red/20'
                }`}
                title={item.label}
              >
                <span className="text-sm md:text-lg">{item.icon}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  )
} 