import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load your publishable key
const stripePromise = loadStripe('pk_test_51QGOlSRtGbxG8XdkGhkzfZbkHxCtw79RMZfOAOPRcT5omu4crAwobQ1KUn5iw7MA1bOOsUvurT85RKxYaPoHsjRd00SZBNYuQg');


function CheckoutButton() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      // Make a request to your backend to create a checkout session
      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000, // Amount in cents
          currency: "usd", // Currency code
        }),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        // Parse the JSON response to get the session data
        const session = await response.json();

        // Redirect to Stripe Checkout using the session ID
        const result = await stripe.redirectToCheckout({
          sessionId: session.id, // Use the session ID from the response
        });

        if (result.error) {
          // Handle any errors that occur during the redirection
          console.error("Stripe redirection error:", result.error.message);
        }
      } else {
        throw new Error("Received non-JSON response from the server");
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error creating Stripe checkout session:", error.message);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Pay with Stripe
    </button>
  );
}


export default CheckoutButton;
