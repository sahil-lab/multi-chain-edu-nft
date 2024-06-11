import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeCheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.createPayment({
      payment_method: {
        card: cardElement,
      },
      amount,
      currency: 'usd',
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentIntent:', paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay with Stripe
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
