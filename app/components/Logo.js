'use client';

import { useState, useEffect } from 'react';

export default function Logo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change de couleur exactement après la quatrième photo du slider vertical
      setIsScrolled(scrollPosition > window.innerHeight * 3.5); // Après la 4ème image
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-white landscape:pl-6 md:pl-8">
      <h1 className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
        isScrolled ? 'text-accent-red' : 'text-white'
      }`}>
        MEKBOUBA, BOULETTES & PIMENTS 🌶️
      </h1>
    </div>
  );
} 