import Stripe from "stripe";

export const payment = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body;
  if (!amount || amount < 150) {
    return res.status(400).json({ error: 'Amount must be at least 150 PKR in Stripe test mode.' });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency: "pkr",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
