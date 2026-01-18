const express = require("express");
const fetch = require("node-fetch");
const app = express();

let expenses = [];

app.use(express.json());
app.use(express.static(__dirname));

// ADD EXPENSE
app.post("/add-expense", async (req, res) => {
  try {
    const { description, amount } = req.body;

    const aiRes = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description })
    });

    const aiData = await aiRes.json();

    const expense = {
      description,
      amount: Number(amount),
      category: aiData.category
    };

    expenses.push(expense);
    res.json(expense);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET EXPENSES
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// DELETE ALL (HARD RESET)
app.delete("/expenses", (req, res) => {
  expenses = [];
  res.json([]);
});
// DELETE ONE EXPENSE BY INDEX
app.delete("/expenses/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    res.json(expenses);
  } else {
    res.status(400).json({ error: "Invalid index" });
  }
});


app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on network");
});

