'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    deliveryDate: '',
    deliveryTime: '',
    firstName: '',
    lastName: '',
    isHotel: '',
    selectedHotel: '',
    otherHotelName: '',
    otherHotelAddress: '',
    otherHotelPostalCode: '',
    otherHotelCity: '',
    otherHotelCountry: 'Espagne',
    address: '',
    postalCode: '',
    city: '',
    country: 'Espagne',
    phone: '',
    sbmItems: [],
    bbmItems: [],
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const router = useRouter();

  const prices = { sbm: 26, bbm: 26 };

  const ibizaHotels = [
    'Hôtel Montesol Ibiza',
    'Hôtel Montesol Ibiza Curio Collection by Hilton',
    'Hôtel Ibiza Gran Hotel',
    'Hôtel Ushuaïa Ibiza Beach Hotel',
    'Hôtel Hard Rock Hotel Ibiza',
    'Hôtel ME Ibiza',
    'Hôtel Nobu Hotel Ibiza Bay',
    'Hôtel Six Senses Ibiza',
    'Hôtel Aguas de Ibiza Grand Luxe Hotel',
    'Hôtel Ibiza Corso Hotel & Spa',
    'Hôtel Mirador de Dalt Vila',
    'Hôtel Cenit',
    'Hôtel Ses Figueres',
    'Hôtel Torre del Mar',
    'Palladium Hotel Playa d\'en Bossa',
    'Autre hôtel'
  ];

  const boulettesSuppTotal = formData.sbmItems.reduce((sum, item) => sum + (item.boulettesSupp || 0), 0) + formData.bbmItems.reduce((sum, item) => sum + (item.boulettesSupp || 0), 0);
  const boulettesSuppPrice = boulettesSuppTotal * 5;
  const subtotal = formData.sbmItems.length * prices.sbm + formData.bbmItems.length * prices.bbm + boulettesSuppPrice;
  const totalItems = formData.sbmItems.length + formData.bbmItems.length;
  const deliveryFee = totalItems >= 6 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Utiliser l'API de géocodage inverse pour obtenir l'adresse
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
              const address = data.display_name || '';
              const parts = address.split(', ');
              
              setFormData(prev => ({
                ...prev,
                address: parts.slice(0, 2).join(', ') || '',
                postalCode: data.address?.postcode || '',
                city: data.address?.city || data.address?.town || data.address?.village || '',
                country: data.address?.country || 'Espagne'
              }));
            })
            .catch(error => {
              console.error('Erreur lors de la récupération de l\'adresse:', error);
              alert('Impossible de récupérer l\'adresse. Veuillez la saisir manuellement.');
            });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'accéder à votre position GPS. Veuillez saisir votre adresse manuellement.');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  };

  const getCurrentLocationForHotel = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Utiliser l'API de géocodage inverse pour obtenir l'adresse
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
              const address = data.display_name || '';
              const parts = address.split(', ');
              
              setFormData(prev => ({
                ...prev,
                otherHotelAddress: parts.slice(0, 2).join(', ') || '',
                otherHotelPostalCode: data.address?.postcode || '',
                otherHotelCity: data.address?.city || data.address?.town || data.address?.village || '',
                otherHotelCountry: data.address?.country || 'Espagne'
              }));
            })
            .catch(error => {
              console.error('Erreur lors de la récupération de l\'adresse:', error);
              alert('Impossible de récupérer l\'adresse. Veuillez la saisir manuellement.');
            });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'accéder à votre position GPS. Veuillez saisir votre adresse manuellement.');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  };

  const addItem = (itemType) => {
    const newItem = { id: Date.now(), piment: true, mekbouba: true, oeuf: true, boulettes: true, boulettesSupp: 0 };
    setFormData(prev => ({
      ...prev,
      [`${itemType}Items`]: [...prev[`${itemType}Items`], newItem]
    }));
  };

  const removeItem = (itemType, itemId) => {
    setFormData(prev => ({
      ...prev,
      [`${itemType}Items`]: prev[`${itemType}Items`].filter(item => item.id !== itemId)
    }));
  };

  const updateItem = (itemType, itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [`${itemType}Items`]: prev[`${itemType}Items`].map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };
  
  const getAvailableFridays = () => {
    const fridays = [];
    const currentYear = 2025;
    
    // Générer tous les vendredis de juillet 2025
    for (let month = 6; month <= 7; month++) { // 6 = juillet, 7 = août
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day);
        if (date.getDay() === 5) { // 5 = vendredi
          fridays.push(date);
        }
      }
    }
    return fridays.sort((a, b) => a - b);
  };
  const availableFridays = getAvailableFridays();

  const availableTimes = [
    '12:30 à 13:00',
    '13:00 à 13:30', 
    '13:30 à 14:30',
    '14:30 à 15:00'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que tous les champs requis sont remplis
    if (!formData.deliveryDate || !formData.deliveryTime || !formData.firstName || 
        !formData.lastName || !formData.phone || !formData.isHotel) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Vérifier l'adresse selon le type de livraison
    if (formData.isHotel === 'yes') {
      if (!formData.selectedHotel) {
        alert('Veuillez sélectionner un hôtel.');
        return;
      }
      if (formData.selectedHotel === 'Autre hôtel' && !formData.otherHotelName) {
        alert('Veuillez saisir le nom de votre hôtel.');
        return;
      }
    } else {
      if (!formData.address || !formData.postalCode || !formData.city) {
        alert('Veuillez saisir votre adresse complète.');
        return;
      }
    }

    // Vérifier qu'il y a au moins un article
    if (totalItems === 0) {
      alert('Veuillez ajouter au moins un article à votre commande.');
      return;
    }

    // Afficher les options de paiement
    setShowPaymentOptions(true);
  };

  const handlePaymentSelection = (paymentType) => {
    setPaymentMethod(paymentType);
    
    // Rediriger vers la page de paiement
    const orderDataParam = encodeURIComponent(JSON.stringify(formData));
    const amountParam = total;
    
    const paymentUrl = `/payment?orderData=${orderDataParam}&paymentType=${paymentType}&amount=${amountParam}`;
    router.push(paymentUrl);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
        <Navbar />
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/images/une experience unique.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 container mx-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto bg-white/95 p-6 md:p-10 rounded-2xl shadow-xl my-16">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Réserver chez MEKBOUBA, BOULETTES & PIMENTS 🌶️</h1>
                <p className="text-gray-600 mt-2">Livraison uniquement le vendredi</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Section Commande */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Votre commande</h2>
                  {/* SBM */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg">🥪 Sandwich Boulettes Mekbouba 26 €</h3>
                          <button type="button" onClick={() => addItem('sbm')} className="bg-accent-red text-white px-1 md:px-2 py-0.5 md:py-1 rounded-lg font-semibold text-xs md:text-sm">+ Ajouter</button>
                      </div>
                      {formData.sbmItems.map((item, index) => (
                          <div key={item.id} className="mt-1 ml-4 p-1.5 border-l-4 border-accent-red bg-white rounded-r-lg">
                              <div className="flex justify-between items-center mb-0.5">
                                <p className="font-medium text-xs">SBM #{index + 1}</p>
                                <button type="button" onClick={() => removeItem('sbm', item.id)} className="text-red-500 font-bold text-xs">✕</button>
                              </div>
                              <div className="flex space-x-3">
                                  <label className="flex items-center text-xs"><input type="checkbox" checked={item.piment} onChange={e => updateItem('sbm', item.id, 'piment', e.target.checked)} className="mr-1"/>🌶️ Piment</label>
                                  <label className="flex items-center text-xs"><input type="checkbox" checked={item.oeuf} onChange={e => updateItem('sbm', item.id, 'oeuf', e.target.checked)} className="mr-1"/>🥚 Oeuf</label>
                                  <label className="flex items-center text-xs"><input type="checkbox" checked={item.mekbouba} onChange={e => updateItem('sbm', item.id, 'mekbouba', e.target.checked)} className="mr-1"/>🥘 Mekbouba</label>
                              </div>
                              <div className="flex items-center mt-2 space-x-2">
                                <label className="text-xs font-medium">🥘 Boulettes 5 € sup</label>
                                <select
                                  className="border rounded px-0 py-0 text-[10px] w-8 h-4"
                                  value={item.boulettesSupp || 0}
                                  onChange={e => updateItem('sbm', item.id, 'boulettesSupp', Math.max(0, Math.min(10, parseInt(e.target.value))))}
                                >
                                  {[...Array(11).keys()].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-xs text-gray-600 italic mt-1">
                                bon le kiffe c'est de ne rien enlever ! au pire le piment 🌶️ ! As you like
                              </div>
                          </div>
                      ))}
                  </div>
                  {/* BBM */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg">🍴 Box Boulettes BBM 26 €</h3>
                          <button type="button" onClick={() => addItem('bbm')} className="bg-accent-red text-white px-1 md:px-2 py-0.5 md:py-1 rounded-lg font-semibold text-xs md:text-sm">+ Ajouter</button>
                      </div>
                      {formData.bbmItems.map((item, index) => (
                          <div key={item.id} className="mt-1 ml-4 p-1.5 border-l-4 border-accent-red bg-white rounded-r-lg">
                              <div className="flex justify-between items-center mb-0.5">
                                <p className="font-medium text-xs">BBM #{index + 1}</p>
                                <button type="button" onClick={() => removeItem('bbm', item.id)} className="text-red-500 font-bold text-xs">✕</button>
                              </div>
                              <div className="flex space-x-3">
                                <label className="flex items-center text-xs"><input type="checkbox" checked={item.piment} onChange={e => updateItem('bbm', item.id, 'piment', e.target.checked)} className="mr-1"/>🌶️ Piment</label>
                                <label className="flex items-center text-xs"><input type="checkbox" checked={item.oeuf} onChange={e => updateItem('bbm', item.id, 'oeuf', e.target.checked)} className="mr-1"/>🥚 Oeuf</label>
                                <label className="flex items-center text-xs"><input type="checkbox" checked={item.mekbouba} onChange={e => updateItem('bbm', item.id, 'mekbouba', e.target.checked)} className="mr-1"/>🥘 Mekbouba</label>
                              </div>
                              <div className="flex items-center mt-2 space-x-2">
                                <label className="text-xs font-medium">🥘 Boulettes 5 € sup</label>
                                <select
                                  className="border rounded px-0 py-0 text-[10px] w-8 h-4"
                                  value={item.boulettesSupp || 0}
                                  onChange={e => updateItem('bbm', item.id, 'boulettesSupp', Math.max(0, Math.min(10, parseInt(e.target.value))))}
                                >
                                  {[...Array(11).keys()].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-xs text-gray-600 italic mt-1">
                                bon le kiffe c'est de ne rien enlever ! au pire le piment 🌶️ ! As you like
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="mt-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (allergies, etc.)</label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows="3" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                  </div>
                </div>

                {/* Section Coordonnées & Livraison */}
                <div className="border-b pb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Vos informations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Date de livraison</label>
                      <select id="deliveryDate" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                        <option value="" disabled>Sélectionnez un vendredi</option>
                        {availableFridays.map(d => <option key={d.toISOString()} value={d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}>{d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">Heure de livraison</label>
                      <select id="deliveryTime" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                        <option value="" disabled>Sélectionnez une heure</option>
                        {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Votre prénom" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Votre nom" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+33 6..." className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Êtes-vous dans un hôtel ?</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="isHotel" 
                            value="yes" 
                            checked={formData.isHotel === 'yes'} 
                            onChange={handleInputChange} 
                            className="mr-2"
                          />
                          Oui
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="isHotel" 
                            value="no" 
                            checked={formData.isHotel === 'no'} 
                            onChange={handleInputChange} 
                            className="mr-2"
                          />
                          Non
                        </label>
                      </div>
                      
                      {formData.isHotel === 'yes' && (
                        <div>
                          {formData.selectedHotel !== 'Autre hôtel' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionnez votre hôtel</label>
                              <select 
                                name="selectedHotel" 
                                value={formData.selectedHotel} 
                                onChange={handleInputChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                              >
                                <option value="" disabled>Sélectionnez un hôtel</option>
                                {ibizaHotels.map(hotel => (
                                  <option key={hotel} value={hotel}>{hotel}</option>
                                ))}
                              </select>
                            </div>
                          )}
                          
                          {formData.selectedHotel === 'Autre hôtel' && (
                            <div className="mt-4 space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'hôtel</label>
                                <input 
                                  type="text" 
                                  name="otherHotelName" 
                                  value={formData.otherHotelName} 
                                  onChange={handleInputChange} 
                                  placeholder="Nom de votre hôtel" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                  required
                                />
                              </div>
                              <div className="mt-3">
                                <button 
                                  type="button" 
                                  onClick={getCurrentLocationForHotel}
                                  className="flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors duration-200"
                                >
                                  <span>📍</span>
                                  <span>Utiliser ma position GPS</span>
                                </button>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse de l'hôtel</label>
                                <input 
                                  type="text" 
                                  name="otherHotelAddress" 
                                  value={formData.otherHotelAddress} 
                                  onChange={handleInputChange} 
                                  placeholder="Numéro et nom de rue" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input 
                                  type="text" 
                                  name="otherHotelPostalCode" 
                                  value={formData.otherHotelPostalCode} 
                                  onChange={handleInputChange} 
                                  placeholder="Code Postal" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                <input 
                                  type="text" 
                                  name="otherHotelCity" 
                                  value={formData.otherHotelCity} 
                                  onChange={handleInputChange} 
                                  placeholder="Ville" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                <input 
                                  type="text" 
                                  name="otherHotelCountry" 
                                  value={formData.otherHotelCountry} 
                                  onChange={handleInputChange} 
                                  placeholder="Pays" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {formData.isHotel === 'no' && (
                        <>
                          <div className="mt-3">
                            <button 
                              type="button" 
                              onClick={getCurrentLocation}
                              className="flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors duration-200"
                            >
                              <span>📍</span>
                              <span>Utiliser ma position GPS</span>
                            </button>
                          </div>
                          <label className="block text-sm font-medium text-gray-700">Adresse de livraison</label>
                          <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Numéro et nom de rue" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Code Postal" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                              <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Ville" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                              <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Pays" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                          </div>
                        </>
                      )}
                  </div>
                </div>

                {/* Total et Bouton de soumission */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex justify-between text-lg"><span>Sous-total</span><span>{subtotal}€</span></div>
                  <div className="flex justify-between text-lg"><span>Livraison</span><span>{deliveryFee}€</span></div>
                  {totalItems > 0 && totalItems < 6 && <p className="text-center text-sm text-gray-500">Livraison offerte pour 6 articles ou plus !</p>}
                  <div className="flex justify-between text-2xl font-bold"><span>TOTAL</span><span>{total}€</span></div>
                  
                  {!showPaymentOptions ? (
                    <button 
                      type="submit" 
                      disabled={totalItems === 0} 
                      className="w-full bg-accent-red text-white py-3 rounded-md font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      🚀 Continuer vers le paiement
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 text-center">Choisissez votre mode de paiement</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => handlePaymentSelection('cash_validation')}
                          className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-1.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-base"
                        >
                          <span>💰 Cash<br /><span className='text-xs font-normal'>Validation CB 0€ – paiement à la livraison</span></span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handlePaymentSelection('full_payment')}
                          className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-1.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-base"
                        >
                          <span>💳 Cb<br /><span className='text-xs font-normal'>Payez maintenant {total}€</span></span>
                        </button>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setShowPaymentOptions(false)}
                        className="w-full text-gray-500 hover:text-gray-700 underline text-sm"
                      >
                        ← Retour à la commande
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Amélioré */}
      <footer className="bg-accent-red text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">MEKBOUBA, BOULETTES & PIMENTS 🌶️</h3>
              <p className="text-sm text-gray-200 mb-4">
                Cuisine certifiée 100% Judéo-Tunisienne,<br />
                transmise de génération en génération. Kosher Friendly.
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
                <a href="mailto:info@mekbouba.com" className="block hover:text-gray-200 transition-colors">
                  📧 info@mekbouba.com
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
                <div>⏰ Passez votre commande du Dimanche au Jeudi max 12h</div>
                <div>Vous serez livrer vendredi !</div>
                <div>🌶️ Cuisine 100% Judéo-Tunisienne</div>
                <div>Kosher Friendly</div>
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
    </div>
  );
}