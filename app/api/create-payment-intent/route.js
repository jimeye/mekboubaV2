import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, paymentType, orderData } = await request.json();

    let paymentIntent;

    if (paymentType === 'cash_validation') {
      // Validation 0€ pour paiement cash
      const { sbmItems, bbmItems, notes, ...otherData } = orderData;
      const simplifiedOrderData = {
        ...otherData,
        sbmItemsCount: sbmItems.length,
        bbmItemsCount: bbmItems.length,
        notes: notes.substring(0, 100) // Tronquer les notes pour être sûr
      };

      paymentIntent = await stripe.paymentIntents.create({
        amount: 0, // 0€ pour validation
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: {
          orderData: JSON.stringify(simplifiedOrderData),
          paymentType: 'cash_validation'
        }
      });
    } else {
      // Paiement complet
      const { sbmItems, bbmItems, notes, ...otherData } = orderData;
      const simplifiedOrderData = {
        ...otherData,
        sbmItemsCount: sbmItems.length,
        bbmItemsCount: bbmItems.length,
        notes: notes.substring(0, 100)
      };

      paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Montant en centimes (2600 = 26€)
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: {
          orderData: JSON.stringify(simplifiedOrderData),
          paymentType: 'full_payment'
        }
      });
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Erreur création payment intent:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
} 