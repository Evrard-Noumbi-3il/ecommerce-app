import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

export const processPayment = async (req, res) => {
  try {
    const { titre, description, prix, location, currency = "eur" } = req.body;

    // Crée un PaymentIntent (utilisé par Stripe Elements)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(prix * 100),
      currency,
      description: `${titre} - ${description}`,
      metadata: { location },
      automatic_payment_methods: { enabled: true }, // Gère toutes les cartes, etc.
    });

    // ⚠️ Renvoie le client_secret du PaymentIntent
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Erreur lors du traitement du paiement :", error);
    res.status(500).json({ message: "Erreur serveur", details: error.message });
  }
};

export const sessionStatus = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id parameter" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    return res.json({
      status: session.status,
      customer_email: session.customer_details
        ? session.customer_details.email
        : null,
      payment_status: session.payment_status,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({ error: error.message });
  }
};
