import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

console.log("Stripe secret:", process.env.STRIPE_SECRET);

const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: "2022-11-15" });

console.log("Stripe initialized:", stripe !== undefined);
