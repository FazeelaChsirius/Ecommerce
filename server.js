// server.js
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const stripe = Stripe('sk_test_51QGOlSRtGbxG8XdkLjrqWeByX8FJGgDtoMesa9lSkfygf5PqpBWsDXyGUHqRE2TJjKdJ3vPzTfbxECZMKKPIfQRe00gabNDude'); // Use your secret key

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
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
      cancel_url: "http://localhost:3000/cancel",   // Redirect URL on payment cancel
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
