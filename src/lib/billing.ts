import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
  : null;

export const subscriptionPlans = [
  { id: 'pro', name: 'Pro Trader', price: 99, features: ['AI signals', 'scanner', 'Telegram alerts'] },
  { id: 'premium', name: 'Premium Desk', price: 249, features: ['Assistant', 'prop dashboard', 'email alerts'] },
  { id: 'institutional', name: 'Institutional', price: 999, features: ['Admin analytics', 'team seats', 'broker bridge'] },
];
