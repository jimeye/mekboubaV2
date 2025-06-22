"use client";

import Image from 'next/image';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HeroSliderNew from './components/HeroSliderNew';

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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const handleSliderScroll = (isScrolledOnSlider) => {
    setIsHeaderVisible(!isScrolledOnSlider);
  };
  
  useEffect(() => {
    const handlePageScroll = () => {
      // Si on a scrollé au-delà de la section hero, on ré-affiche le header
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom) {
          setIsHeaderVisible(true);
        } else if (window.scrollY < 100) { // Pour le cas où on remonte tout en haut
          // La visibilité est déjà gérée par handleSliderScroll, on ne fait rien ici
        }
      }
    };

    window.addEventListener('scroll', handlePageScroll);
    return () => window.removeEventListener('scroll', handlePageScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar isVisible={isHeaderVisible} />
      
      {/* Hero Section avec Images à la Suite */}
      <section id="hero" className="relative">
        <HeroSliderNew images={heroImages} onSliderScroll={handleSliderScroll} />
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-white py-20 hidden">
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
              <div className="relative h-full min-h-[500px] overflow-hidden shadow-2xl border-2 border-accent-red">
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
            className="object-cover opacity-45"
              unoptimized
            />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Notre Menu</h2>
            <div className="w-24 h-1 bg-accent-red mx-auto mb-6"></div>
            <p className="text-xl text-black max-w-2xl mx-auto">
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
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Sandwich Boulettes<br/>Mekbouba SBM<br/>26 €</h3>
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
                    href="/reservation"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-auto"
                  >
                    🥪 Réserver
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
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Box Boulettes<br/>Mekbouba BBM<br/>26 €</h3>
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
                    🍽️ Réserver
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
                    🔜 Coming Soon
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Tajines Shabbat<br/>35 €</h3>
                  <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                    Nos tajines traditionnels, loubia, hams, nikitouche, classique légumes, 
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
      <section id="gallery" className="relative min-h-screen bg-white py-20 hidden">
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
              '/images/slider4-small.jpg'
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
              <h3 className="text-[1.7rem] font-bold text-white mb-6 text-center">Essentiel</h3>
              <div className="space-y-4 flex-grow text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-[1.2rem]">📞</div>
                  <div>
                    <div className="text-white font-semibold text-base">Téléphone</div>
                    <a href="https://wa.me/33652696976" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-red transition-colors text-base">
                      +33 6 52 69 69 76
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-[1.2rem]">📧</div>
                  <div>
                    <div className="text-white font-semibold text-base">Email</div>
                    <a href="mailto:contact@mekbouba.fr" className="text-white hover:text-accent-red transition-colors text-base">
                      contact@mekbouba.fr
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-[1.2rem]">🌍</div>
                  <div>
                    <div className="text-white font-semibold text-base">Localisation</div>
                    <a 
                      href="https://maps.google.com/maps?q=38.96426,1.47936&z=15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-accent-red transition-colors duration-300 cursor-pointer text-base"
                      title="Ouvrir dans Plans, Waze ou Google Maps"
                    >
                      Ibiza, Espagne
                    </a>
                  </div>
                </div>
                  </div>
                </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
              <h3 className="text-[1.7rem] font-bold text-white mb-6 text-center">Pré-commande obligatoire</h3>
              <div className="space-y-4 flex-grow text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-[1.2rem]">⏰</div>
                  <div className="text-base text-white hover:text-accent-red transition-colors duration-300">
                    Passez votre commande du<br />
                    Dimanche au Jeudi max 12h<br />
                    Vous serez livrés le vendredi
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2 mt-4">
                  <div className="text-base text-white hover:text-accent-red transition-colors duration-300">
                    Kosher Friendly
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
              <h3 className="text-[1.7rem] font-bold text-white mb-6 text-center">Commander maintenant</h3>
              <p className="text-white hover:text-accent-red transition-colors duration-300 mb-6 flex-grow text-center leading-relaxed px-4 text-base">
                Prêt à découvrir nos saveurs authentiques ?<br />
                Commandez directement via WhatsApp !
              </p>
              <a 
                href="https://wa.me/33652696976?text=Bonjour ! Je souhaite commander vos délicieuses spécialités Mekbouba. Pouvez-vous me donner plus d'informations ?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-1.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto text-base"
              >
                <span className="text-[1.84rem]">💬</span>
                <span>Réserver</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Amélioré */}
      <footer className="bg-accent-red text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">MEKBOUBA, BOULETTES & PIMENTS 🌶️</h3>
              <p className="text-sm text-gray-200 mb-4">
                Cuisine certifiée 100% Judéo-Tunisienne,<br />
                transmise de génération en génération.
              </p>
              <div className="flex space-x-4 justify-center">
                <div className="text-2xl">🌶️</div>
                <div className="text-2xl">🥘</div>
                <div className="text-2xl">👨‍🍳</div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Prenez le micro 🎙️</h3>
              <div className="space-y-2 text-sm">
                <a href="https://wa.me/33652696976" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-200 transition-colors">
                  📞 +33 6 52 69 69 76
                </a>
                <a href="mailto:contact@mekbouba.fr" className="block hover:text-gray-200 transition-colors">
                  📧 contact@mekbouba.fr
                </a>
                <a 
                  href="https://maps.google.com/maps?q=38.96426,1.47936&z=15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-gray-200 transition-colors"
                  title="Ouvrir dans Google Maps"
                >
                  🌍 Ibiza, Espagne
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Informations</h3>
              <div className="space-y-2 text-sm text-gray-200">
                <div>📅 Pré-commande obligatoire</div>
                <div>⏰ Passez votre commande Lundi - Jeudi max 12h</div>
                <div>Vous serez livrer vendredi !</div>
                <div>🌶️ Cuisine 100% Judéo-Tunisienne</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-200">
              © 2025 MEKBOUBA, BOULETTES & PIMENTS 🌶️ - Tous droits réservés
            </p>
            <p className="text-xs text-gray-200 mt-2">
              <a href="https://wa.me/33608251223?text=Je veux le meme site !!" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                Website design by ©MEKBOUBA STUDIO
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 