const express = require("express");
const app = express();
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { id, price, name, description, image } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: name,
            description: description,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success/${id}`,
    cancel_url: "http://localhost:3000/events",
  });

  res.send({ url: session.url });
});

module.exports = router;
