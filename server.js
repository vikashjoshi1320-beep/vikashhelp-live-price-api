const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const products = {
  "realme narzo 70 pro 5g": [
    {
      store: "Amazon",
      price: 19999,
      url: "https://www.amazon.in/"
    },
    {
      store: "Flipkart",
      price: 19499,
      url: "https://www.flipkart.com/"
    },
    {
      store: "Croma",
      price: 20999,
      url: "https://www.croma.com/"
    },
    {
      store: "Reliance Digital",
      price: 20299,
      url: "https://www.reliancedigital.in/"
    }
  ],

  "samsung galaxy m35 5g": [
    {
      store: "Amazon",
      price: 16999,
      url: "https://www.amazon.in/"
    },
    {
      store: "Flipkart",
      price: 16499,
      url: "https://www.flipkart.com/"
    },
    {
      store: "Croma",
      price: 17499,
      url: "https://www.croma.com/"
    },
    {
      store: "Reliance Digital",
      price: 16999,
      url: "https://www.reliancedigital.in/"
    }
  ]
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "vikashHelp Price API",
    status: "running"
  });
});

app.get("/api/price", (req, res) => {

  const query = (req.query.product || "")
    .trim()
    .toLowerCase();

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Product name required"
    });
  }

  const result = products[query] || [];

  if (result.length === 0) {
    return res.json({
      success: true,
      product: query,
      found: false,
      prices: []
    });
  }

  const cheapest = Math.min(
    ...result.map(item => item.price)
  );

  const prices = result.map(item => ({
    ...item,
    cheapest: item.price === cheapest
  }));

  res.json({
    success: true,
    product: query,
    found: true,
    cheapest: cheapest,
    prices: prices
  });
});

module.exports = app;
