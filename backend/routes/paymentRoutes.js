import express from 'express';
import { createPaymentIntent } from '../controllers/paymentControllers.js';
import { createCheckoutSession } from '../controllers/paymentControllers.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/create-checkout-session', createCheckoutSession);

export { router as paymentRoutes };