import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, paymentType, orderData } = await request.json();

    let paymentIntent;

    // On extrait uniquement les champs essentiels pour le metadata Stripe
    const { deliveryDate, deliveryTime, firstName, lastName, phone, notes, sbmItems, bbmItems } = orderData;
    const simplifiedOrderData = {
      deliveryDate,
      deliveryTime,
      firstName,
      lastName,
      phone,
      sbmItemsCount: sbmItems && Array.isArray(sbmItems) ? sbmItems.length : 0,
      bbmItemsCount: bbmItems && Array.isArray(bbmItems) ? bbmItems.length : 0,
      notes: notes ? notes.substring(0, 100) : ''
    };

    if (paymentType === 'cash_validation') {
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