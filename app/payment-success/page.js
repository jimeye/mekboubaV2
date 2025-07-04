'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [whatsappSent, setWhatsappSent] = useState(false);

  useEffect(() => {
    const orderDataParam = searchParams.get('orderData');
    const paymentTypeParam = searchParams.get('type');
    const paymentIntentId = searchParams.get('payment_intent');

    if (orderDataParam) {
      setOrderData(JSON.parse(decodeURIComponent(orderDataParam)));
    }
    if (paymentTypeParam) {
      setPaymentType(paymentTypeParam);
    }

    // Sauvegarder la commande complète
    if (orderDataParam && paymentIntentId) {
      saveCommande(JSON.parse(decodeURIComponent(orderDataParam)), paymentIntentId);
    }
  }, [searchParams]);

  const saveCommande = async (orderData, paymentIntentId) => {
    try {
      await fetch('/api/save-commande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          orderData
        })
      });
    } catch (error) {
      console.error('Erreur sauvegarde commande:', error);
    }
  };

  // useEffect(() => {
  //   // On envoie le message WhatsApp pour tous les types de paiement
  //   if (orderData && !whatsappSent) {
  //     sendWhatsAppMessage();
  //     setWhatsappSent(true);
  //   }
  // }, [orderData, whatsappSent]);

  const sendWhatsAppMessage = () => {
    if (!orderData) return;

    const { deliveryDate, deliveryTime, firstName, lastName, phone, sbmLots, bbmLots, notes, isHotel, selectedHotel, roomNumber, otherHotelName, otherHotelAddress, otherHotelPostalCode, otherHotelCity, otherHotelCountry, address, postalCode, city, country } = orderData;

    // Extraire le jour et mois de la date de livraison
    const deliveryDateParts = deliveryDate.split(' ');
    const day = deliveryDateParts[1];
    const month = deliveryDateParts[2];
    
    const monthNames = {
      'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
      'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
      'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
    };
    const monthNumber = monthNames[month.toLowerCase()];
    
    // Récupérer le compteur depuis localStorage
    const lastOrderNumber = localStorage.getItem('lastOrderNumber') || '55500';
    const currentCounter = parseInt(lastOrderNumber) + 1;
    localStorage.setItem('lastOrderNumber', currentCounter.toString());
    
    const orderNumber = `CMD ${day}${monthNumber}-${currentCounter}`;

    const sbmDetails = Array.isArray(sbmLots)
      ? sbmLots.map((lot, index) => 
          `\n  SBM #${index + 1}: Piment(${lot.options?.piment ? 'Oui' : 'Non'}), Oeuf(${lot.options?.oeuf ? 'Oui' : 'Non'}), Mekbouba(${lot.options?.mekbouba ? 'Oui' : 'Non'}), Boulettes supp: ${lot.boulettesSupp || 0}`
        ).join('')
      : '';
    
    const bbmDetails = Array.isArray(bbmLots)
      ? bbmLots.map((lot, index) => 
          `\n  BBM #${index + 1}: Piment(${lot.options?.piment ? 'Oui' : 'Non'}), Oeuf(${lot.options?.oeuf ? 'Oui' : 'Non'}), Mekbouba(${lot.options?.mekbouba ? 'Oui' : 'Non'}), Boulettes supp: ${lot.boulettesSupp || 0}`
        ).join('')
      : '';

    // Construire l'adresse selon le type de livraison
    let deliveryAddress = '';
    if (isHotel === 'yes') {
      if (selectedHotel === 'Autre') {
        deliveryAddress = `Hôtel: ${otherHotelName}\nChambre: ${roomNumber}\nAdresse: ${otherHotelAddress}, ${otherHotelPostalCode}, ${otherHotelCity}, ${otherHotelCountry}`;
      } else {
        deliveryAddress = `Hôtel: ${selectedHotel}\nChambre: ${roomNumber}`;
      }
    } else {
      deliveryAddress = `Adresse: ${address}, ${postalCode}, ${city}, ${country}`;
    }

    const sbmCount = Array.isArray(sbmLots) ? sbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
    const bbmCount = Array.isArray(bbmLots) ? bbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
    const subtotal = sbmCount * 26 + bbmCount * 26;
    const totalItems = sbmCount + bbmCount;
    const deliveryFee = totalItems >= 6 ? 0 : 15;
    const total = subtotal + deliveryFee;

    const paymentInfo = paymentType === 'cash' 
      ? 'Paiement en espèces à la livraison'
      : 'Paiement CB en ligne effectué';

    const message = `
Commande ${orderNumber}
Nouvelle Commande Mekbouba
-----------------------------------
Nom: ${lastName}
Prénom: ${firstName}
Téléphone: ${phone}

Livraison :
Date: ${deliveryDate} à ${deliveryTime}
${deliveryAddress}

Détails de la commande :
SBM: ${sbmCount} x 26€${sbmDetails}
BBM: ${bbmCount} x 26€${bbmDetails}

Notes: ${notes || 'Aucune'}
-----------------------------------
Sous-total: ${subtotal}€
Livraison: ${deliveryFee}€
TOTAL PAYÉ: ${total}€

${paymentInfo}
`;

    const whatsappUrl = `https://wa.me/33652696976?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">Erreur</h2>
          <p className="text-gray-600">Données de commande manquantes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-6xl mb-4">
              {paymentType === 'cash' ? '✅' : '💳'}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {paymentType === 'cash' 
                ? 'Commande confirmée !' 
                : 'Paiement réussi !'
              }
            </h1>
            
            <p className="text-gray-600 mb-6">
              {paymentType === 'cash' 
                ? `Merci ${orderData?.firstName}, votre commande a été validée. Le paiement se fera en espèces à la livraison.`
                : `Merci ${orderData?.firstName}, votre commande a été payée et confirmée.`
              }
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">
                ⚠️ RENVOYEZ LE MESSAGE WhatsApp CI-DESSOUS POUR ENVOYER VOTRE COMMANDE EN CUISINE.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={sendWhatsAppMessage}
                className="block w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Renvoyer le message WhatsApp
              </button>
              
              <Link 
                href="/"
                className="block w-full bg-accent-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-red/90 transition-colors"
              >
                🏠 Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 