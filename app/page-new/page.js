"use client";

import Image from 'next/image';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const heroImages = [
  {
    id: 1,
    image: '/images/une experience unique.jpg',
    title: 'Sandwich Boulettes Mekbouba',
    description: 'Maintenant À Ibiza'
  },
  {
    id: 2,
    image: '/images/mekbouba1.jpeg',
    title: 'Cuisine Judéo-Tunisienne',
    description: 'Une Expérience Culinaire Unique<br/>À Ibiza Kosher Friendly'
  },
  {
    id: 3,
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

export default function HomeNew() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Navigation flottante */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
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
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  activeSection === item.id 
                    ? 'bg-accent-red text-white shadow-lg' 
                    : 'bg-transparent text-white hover:bg-accent-red/20'
                }`}
                title={item.label}
              >
                <span className="text-lg">{item.icon}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section avec Images à la Suite */}
      <section id="hero" className="relative">
        {heroImages.map((slide, index) => (
          <div key={slide.id} className="relative h-screen">
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
              
              {/* Logo fixe */}
              <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
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
              <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 block landscape:hidden md:hidden">
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

              {/* Contenu du slide */}
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
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-800">Cuisine Judéo-Tunisienne Authentique</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Découvrez l'authenticité de la cuisine judéo-tunisienne transmise de génération en génération. 
                Nos recettes traditionnelles, préparées avec des ingrédients frais et des épices sélectionnées, 
                vous transportent directement dans les saveurs de Tunisie.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Chaque plat raconte une histoire, chaque épice évoque un souvenir. 
                De nos boulettes maison aux tajines traditionnels, nous préservons 
                l'héritage culinaire de nos ancêtres.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre cuisine se distingue par ses <strong>épices authentiques</strong> soigneusement sélectionnées, 
                notre <strong>chef expérimenté</strong> qui maîtrise parfaitement les techniques traditionnelles, 
                et nos <strong>recettes traditionnelles</strong> transmises de génération en génération. 
                Nous sommes fiers d'être <strong>100% Judéo-Tunisien</strong>, préservant ainsi l'authenticité 
                et les saveurs de notre héritage culinaire.
              </p>
            </div>
            
            <div className="relative">
              <div className="relative h-full min-h-[500px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/mekbouba1.jpeg"
                  alt="Cuisine traditionnelle"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section Amélioré */}
      <section id="menu" className="relative min-h-screen overflow-hidden bg-gray-50 py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/une experience unique.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
            unoptimized
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Notre Menu</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos spécialités authentiques, préparées avec passion et des ingrédients de qualité
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
            {/* Sandwich Boulettes Mekbouba */}
            <div className="group relative">
              <div className="shadow-2xl overflow-hidden flex flex-col relative border-2 border-accent-red bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-[600px]">
                <div className="relative h-64">
                  <Image
                    src="/images/une experience unique.jpg"
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🌶️ Signature
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Sandwich Boulettes<br/>Mekbouba SBM</h3>
                  <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                    Découvrez notre sandwich signature aux boulettes, piment, mekbouba & oeuf, 
                    une explosion de saveurs tunisiennes authentiques.
                  </p>
                  <div className="bg-orange-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-orange-800 text-center font-semibold">
                      🚚 Livraison gratuite pour 5 SBM
                    </p>
                  </div>
                  <a 
                    href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-auto"
                  >
                    🥪 Commander 26€
                  </a>
                </div>
              </div>
            </div>

            {/* Box Boulettes Mekbouba */}
            <div className="group relative">
              <div className="shadow-2xl overflow-hidden flex flex-col relative border-2 border-accent-red bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-[600px]">
                <div className="relative h-64">
                  <Image
                    src="/images/nos specialites.jpg"
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🍽️ Complet
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Box Boulettes<br/>Mekbouba BBM</h3>
                  <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                    La même que le SBM boulettes, piment, mekbouba & oeuf dans une box complète 
                    avec accompagnements traditionnels.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-green-800 text-center font-semibold">
                      🚚 Livraison gratuite pour 5 BBM
                    </p>
                  </div>
                  <a 
                    href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-auto"
                  >
                    🍽️ Commander 26€
                  </a>
                </div>
              </div>
            </div>

            {/* Tajines Shabbat */}
            <div className="group relative">
              <div className="shadow-2xl overflow-hidden flex flex-col relative border-2 border-accent-red bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-[600px]">
                <div className="relative h-64">
                  <Image
                    src="/images/mekbouba1.jpeg"
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🔜 Bientôt
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Tajines Shabbat</h3>
                  <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                    Nos tajines traditionnels, loubia, hams, nikitouche, classique légume, 
                    5 salades et sa semoule, parfaits pour vos repas entre amis.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 text-center font-semibold">
                      👥 Minimum 6 personnes
                    </p>
                  </div>
                  <button 
                    className="block w-full bg-gray-400 text-white text-center py-4 rounded-xl font-semibold cursor-not-allowed mt-auto"
                    disabled
                  >
                    🔜 Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Diner Room</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/images/mekbouba1.jpeg',
              '/images/nos specialites.jpg',
              '/images/une experience unique.jpg',
              '/images/slider4-small.jpg',
              '/images/une experience unique-small.jpg',
              '/images/nos specialites-small.jpg'
            ].map((image, index) => (
              <div key={index} className="group relative overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={image}
                    alt={`Galerie ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-2xl">📸</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/une experience unique.jpg"
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Prenez le micro 🎙️</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Essentiel</h3>
              <div className="space-y-4 flex-grow text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl">📞</div>
                  <div>
                    <div className="text-white font-semibold">Téléphone</div>
                    <a href="https://wa.me/33652696976" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-red transition-colors">
                      +33 6 52 69 69 76
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl">📧</div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <a href="mailto:contact@mekbouba.fr" className="text-white hover:text-accent-red transition-colors">
                      contact@mekbouba.fr
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <div className="text-white font-semibold">Localisation</div>
                    <div className="text-white hover:text-accent-red transition-colors duration-300">Ibiza, Espagne</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Pré-commande obligatoire</h3>
              <div className="space-y-4 text-white flex-grow text-center">
                <div className="hover:text-accent-red transition-colors duration-300">
                  Lundi - Jeudi max 12h
                </div>
                <div className="hover:text-accent-red transition-colors duration-300">
                  Kosher Friendly
                </div>
                <div className="text-sm mt-4 hover:text-accent-red transition-colors duration-300">
                  Cuisine certifiée 100% Judéo-Tunisienne
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6">Commander maintenant</h3>
              <p className="text-white hover:text-accent-red transition-colors duration-300 mb-6 flex-grow text-center leading-relaxed px-4">
                Prêt à découvrir nos saveurs authentiques ?<br />
                Commandez directement via WhatsApp !
              </p>
              <a 
                href="https://wa.me/33652696976?text=Bonjour ! Je souhaite commander vos délicieuses spécialités Mekbouba. Pouvez-vous me donner plus d'informations ?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto"
              >
                <span className="text-2xl">💬</span>
                <span>Commander sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Amélioré */}
      <footer className="bg-accent-red text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MEKBOUBA</h3>
              <p className="text-sm text-gray-200 mb-4">
                Cuisine certifiée 100% Judéo-Tunisienne, transmise de génération en génération.
              </p>
              <div className="flex space-x-4">
                <div className="text-2xl">🌶️</div>
                <div className="text-2xl">🥘</div>
                <div className="text-2xl">👨‍🍳</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <a href="https://wa.me/33652696976" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-200 transition-colors">
                  📞 +33 6 52 69 69 76
                </a>
                <a href="mailto:contact@mekbouba.fr" className="block hover:text-gray-200 transition-colors">
                  📧 contact@mekbouba.fr
                </a>
                <div className="text-gray-200">
                  🌍 Ibiza, Espagne
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Informations</h3>
              <div className="space-y-2 text-sm text-gray-200">
                <div>📅 Pré-commande obligatoire</div>
                <div>⏰ Lundi - Jeudi max 12h</div>
                <div>🌶️ Cuisine 100% Judéo-Tunisienne</div>
                <div className="mt-4">
                  <a href="https://wa.me/33608251223" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-gray-200 transition-colors">
                    Website design by ©MEKBOUBA STUDIO 🌶️
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-200">
              © 2025 MEKBOUBA, BOULETTES & PIMENTS 🌶️ - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 