'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 3,
    image: '/images/une experience unique.jpg',
    title: 'Sandwich Boulettes Mekbouba',
    description: 'Maintenant À Ibiza'
  },
  {
    id: 1,
    image: '/images/mekbouba1.jpeg',
    title: 'Cuisine Judéo-Tunisienne',
    description: 'Une Expérience Culinaire Unique<br/>À Ibiza Kosher Friendly'
  },
  {
    id: 2,
    image: '/images/nos specialites.jpg',
    title: 'Boulettes Marchi',
    description: 'Boeuf, Oignons, Persil,<br/>Coriandre & Rose'
  },
  {
    id: 4,
    image: '/images/slider4-small.jpg',
    title: 'Mekbouba',
    description: 'Poivrons, Piments, Tomates & Zeit'
  }
];

export default function HeroSliderNew() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Auto-play (optionnel, peut être désactivé)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 secondes par slide

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Gestion du swipe tactile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      ref={sliderRef}
      className="relative h-screen overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full h-screen">
        {/* Logo fixe */}
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="relative w-32 h-32 md:w-52 md:h-52">
            <Image
              src="/images/logoile.png"
              alt="Logo Ile"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Logo mobile */}
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 block landscape:hidden md:hidden">
          <div className="relative w-32 h-32 md:w-52 md:h-52 scale-[1.46]">
            <Image
              src="/images/logoile.png"
              alt="Logo Ile"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">{slide.title}</h1>
                <p className="text-xl md:text-2xl text-center max-w-2xl px-4" dangerouslySetInnerHTML={{ __html: slide.description }}></p>
                <a 
                  href="#menu"
                  className="mt-6 bg-accent-red hover:bg-accent-red/90 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                >
                  Notre Menu
                </a>
                <p className="text-xl md:text-2xl text-white/90 mt-2 mb-1 text-[1.2em]">*Uniquement le vendredi</p>
                <p className="text-base md:text-lg text-white/90 text-[0.63em] -mt-1">Pré-Commande Obligatoire</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide précédent"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide suivant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Counter */}
        <div className="absolute top-4 left-4 z-30 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe Instructions (Mobile) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 text-white/70 text-sm bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm md:hidden">
        ← Glissez pour naviguer →
      </div>
    </div>
  );
} 