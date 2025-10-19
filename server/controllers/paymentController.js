import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripeSecret = process.env.STRIPE_SECRET;

if (!stripeSecret) {
  console.warn("⚠️ STRIPE_SECRET_KEY not found in .env file");
}

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

// Create Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      return res
        .status(503)
        .json({ msg: "Stripe is not configured. Missing secret key." });
    }

    const { course } = req.body;

    if (!course || !course.title || !course.price) {
      return res.status(400).json({ msg: "Invalid course data." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description || "No description",
            },
            unit_amount: Math.round(course.price * 10),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error);
    res.status(500).json({ msg: "Payment failed", error: error.message });
  }
};
