import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) =>
    {
        try
        {
            const { amount } = req.body;

            const paymentIntent = await stripe.paymentIntents.create
            ({
                amount,
                currency: "usd",
                automatic_payment_methods: { enabled: true },
            });

            res.send({ clientSecret: paymentIntent.client_secret });
        } 
        catch (error)
        {
            console.error("Error creating payment intent:", error);
            res.status(500).json({ error: error.message });
        }
    };

    export const createCheckoutSession = async (req, res) => {
        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'Dental Service Payment',
                  },
                  unit_amount: 33998, // $5.00 (Stripe expects amount in cents)
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5174/payment-success',
            cancel_url: 'http://localhost:5174/financial-history',
          });
      
          res.json({ url: session.url });
        } catch (error) {
          console.error("Stripe error:", error);
          res.status(500).json({ error: "Failed to create checkout session." });
        }
      };