import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import CheckoutForm from "../components/ui/CheckoutForm";

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;