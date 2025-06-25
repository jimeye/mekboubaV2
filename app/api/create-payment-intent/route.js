import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { kv } from '@vercel/kv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, paymentType, orderData } = await request.json();

    // Génère un identifiant unique pour la commande
    const commandeId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

    // Stocke la commande complète dans KV (expire dans 7 jours)
    await kv.set(`commande:${commandeId}`, JSON.stringify(orderData), { ex: 60 * 60 * 24 * 7 });

    let paymentIntent;

    if (paymentType === 'cash_validation') {
      paymentIntent = await stripe.paymentIntents.create({
        amount: 0, // 0€ pour validation
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: { commandeId }
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Montant en centimes (2600 = 26€)
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: { commandeId }
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
