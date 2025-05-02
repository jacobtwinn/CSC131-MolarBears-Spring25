import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import React from "react";

function CheckoutForm()
{
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true);

    try
    {
      // Create a PaymentIntent on the server
      const { data } = await axios.post('http://localhost:5003/api/payments/create-payment-intent',
      {
        amount: 5000,
      });

      const clientSecret = data.clientSecret;

      // Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret,
      {
        payment_method:
        {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error)
      {
        console.error(result.error.message);
        alert('Payment failed!');
      }
      else if (result.paymentIntent.status === 'succeeded')
      {
        alert('Payment successful!');
      }
    }
    catch (error)
    {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}

export default CheckoutForm;