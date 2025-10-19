import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/api";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ courseId, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    API.post("/payment/create-payment-intent", { courseId })
      .then(res => setClientSecret(res.data.clientSecret))
      .catch(err => console.error(err));
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful! You are now enrolled.");
      // frontend can refresh enrollment list here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow w-96 mx-auto mt-10">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="mt-4 w-full bg-green-600 text-white p-2 rounded"
      >
        Pay ${price}
      </button>
    </form>
  );
}

export default function PaymentWrapper({ courseId, price }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm courseId={courseId} price={price} />
    </Elements>
  );
}
