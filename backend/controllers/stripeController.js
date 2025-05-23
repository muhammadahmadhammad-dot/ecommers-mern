import Stripe from "stripe";

export const payment = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents (e.g. $10 = 1000)
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
