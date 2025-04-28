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