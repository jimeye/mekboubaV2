'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement, PaymentElement } from '@stripe/react-stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';

// Charger Stripe (remplacer par ta clé publique)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

const PaymentForm = ({ orderData, paymentType, amount, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        setSuccess(true);
        const successUrl = paymentType === 'cash_validation' 
          ? `/payment-success?type=cash&orderData=${encodeURIComponent(JSON.stringify(orderData))}`
          : `/payment-success?type=full&orderData=${encodeURIComponent(JSON.stringify(orderData))}`;
        router.push(successUrl);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          {paymentType === 'cash_validation' 
            ? '💰 Validation pour paiement en espèces' 
            : '💳 Paiement complet'
          }
        </h3>
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            {paymentType === 'cash_validation' 
              ? 'Votre carte sera validée (0€) pour confirmer votre commande. Le paiement se fera en espèces à la livraison.'
              : `Montant à payer : ${amount}€`
            }
          </p>
        </div>
        <PaymentElement />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 font-bold text-center my-4">
            Paiement validé ! Merci pour votre commande.
          </div>
        )}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-accent-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-red/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Traitement...' : 
            paymentType === 'cash_validation' 
              ? '✅ Valider ma commande (0€)' 
              : `💳 Payer ${amount}€`
          }
        </button>
      </div>
    </form>
  );
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const orderDataParam = searchParams.get('orderData');
    const paymentTypeParam = searchParams.get('paymentType');
    const amountParam = searchParams.get('amount');
    const clientSecretParam = searchParams.get('clientSecret');

    if (orderDataParam) {
      setOrderData(JSON.parse(decodeURIComponent(orderDataParam)));
    }
    if (paymentTypeParam) {
      setPaymentType(paymentTypeParam);
    }
    if (amountParam) {
      setAmount(parseInt(amountParam));
    }
    if (clientSecretParam) {
      setClientSecret(clientSecretParam);
    }
  }, [searchParams]);

  if (!orderData || !paymentType) {
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {paymentType === 'cash_validation' ? 'Validation' : 'Paiement'}
            </h1>
            <p className="text-gray-600">
              {paymentType === 'cash_validation' 
                ? 'Confirmez votre commande' 
                : 'Finalisez votre commande'
              }
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm 
              orderData={orderData} 
              paymentType={paymentType} 
              amount={amount}
              clientSecret={clientSecret}
            />
          </Elements>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              ← Retour à la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 