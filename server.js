import firebaseAppConfig from "./src/utils/firebase-config.js";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

require('dotenv').config();

// Required to get `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = getFirestore(firebaseAppConfig);
const app = express();
const stripe = Stripe('sk_test_51QGOlSRtGbxG8XdkLjrqWeByX8FJGgDtoMesa9lSkfygf5PqpBWsDXyGUHqRE2TJjKdJ3vPzTfbxECZMKKPIfQRe00gabNDude'); // Use your secret key

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sample Product",
            },
            unit_amount: 1000, // Amount in cents ($10.00)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success", // Redirect URL on successful payment
      cancel_url: "http://localhost:3000/failed",   // Redirect URL on payment cancel
      metadata: req.body.metadata, // Pass metadata
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Step 3: Add a new endpoint to handle Stripe webhooks
// app.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Your webhook secret from Stripe

//   let event;
//   try {
//     // Verify the event using Stripe SDK
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     // Extract order information
//     const orderData = {
//       orderId: session.id, // Use session ID as order ID
//       userId: session.metadata?.uid || "Unknown User", 
//       //amount: session.amount_total / 100,
//       photo: session.photoURL,
//       name: session.displayName,
//       email: session.email,
//       created: new Date(), // If you want Firestore timestamp use 'serverTimestamp()' function from Firebase utils
//       status: "completed",
//     };

//     try {
//       await addDoc(collection(db, 'orders'), {
//         testField: "Test Value",
//         created: new Date()
//       });  
     
//       console.log("Order saved to Firestore successfully!");
//       res.status(200).send("Order processed and saved.");

//     } catch (error) {
//       console.error("Error saving order to Firestore:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   } else {
//     res.status(400).send("Unhandled event type");
//   }
// });

app.listen(3001, () => console.log("Server running on port 3001"));
