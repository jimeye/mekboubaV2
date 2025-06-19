"use client";

import Image from 'next/image';
import HeroSlider from './components/HeroSlider';
import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />

      {/* Menu Section */}
      <section id="menu" className="relative min-h-screen overflow-hidden">
        <div className="relative w-full min-h-screen">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/une experience unique.jpg"
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 h-full flex items-center py-20">
            <div className="w-full">
              <h2 className="text-4xl font-bold text-center mb-12 text-white">Notre Menu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
                {/* Sandwich Boulettes Mekbouba */}
                <div className="rounded-lg shadow-lg overflow-hidden flex-1 max-w-sm flex flex-col relative border-2 border-accent-red mx-auto w-full lg:min-h-[600px]">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/une experience unique.jpg"
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-center text-white">Sandwich Boulettes<br/>Mekbouba SBM</h3>
                    <p className="text-white mb-2 text-center flex-grow">Découvrez notre sandwich signature aux boulettes, piment, mekbouba & oeuf, une explosion de saveurs tunisiennes.</p>
                    <p className="text-white mb-6 text-center">*free delivery pour 5 SBM</p>
                    <a 
                      href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-300 mt-auto"
                    >
                      Commander 26€
                    </a>
                  </div>
                </div>

                {/* Box Boulettes Mekbouba */}
                <div className="rounded-lg shadow-lg overflow-hidden flex-1 max-w-sm flex flex-col relative border-2 border-accent-red mx-auto w-full lg:min-h-[600px]">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/nos specialites.jpg"
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-center text-white">Box Boulettes<br/>Mekbouba BBM</h3>
                    <p className="text-white mb-2 text-center flex-grow">La mème que le SBM boulettes, piment,<br />mekbouba & oeuf dans une box.</p>
                    <p className="text-white mb-6 text-center">*free delivery pour 5 BBM</p>
                    <a 
                      href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-300 mt-auto"
                    >
                      Commander 26€
                    </a>
                  </div>
                </div>

                {/* Tajines Shabbat */}
                <div className="rounded-lg shadow-lg overflow-hidden flex-1 max-w-sm flex flex-col relative border-2 border-accent-red mx-auto w-full lg:min-h-[600px]">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/mekbouba1.jpeg"
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-center text-white">Tajines Shabbat</h3>
                    <p className="text-white mb-2 text-center flex-grow">Nos tajines traditionnels, loubia, hams, nikitouche, clasique legume, 5 salades et sa semoule, parfaits pour vos repas entre amis.</p>
                    <p className="text-white mb-6 text-center">*min 6 personnes</p>
                    <button 
                      className="block w-full bg-gray-500 text-white text-center py-3 rounded-lg font-semibold cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent-red text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <a href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-200 transition-colors block mb-2">Téléphone: +33 6 52 69 69 76</a>
              <a href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-200 transition-colors">Email: contact@mekbouba.fr</a>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Pré-Commande Obligatoire</h3>
              <p className="text-sm mb-2">Lundi - Jeudi max 12h</p>
              <p className="text-sm">Cuisine certifiée 100% Judéo-Tunisienne</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 