let expenses = [];
let chart;

async function loadExpenses() {
  const res = await fetch("/expenses");
  expenses = await res.json();
  render();
}

async function addExpense() {
  const desc = document.getElementById("desc").value;
  const amt = document.getElementById("amt").value;

  if (!desc || !amt) return alert("Fill all fields");

  await fetch("/add-expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: desc, amount: amt })
  });

  document.getElementById("desc").value = "";
  document.getElementById("amt").value = "";

  loadExpenses(); // ALWAYS reload from server
}

async function clearAll() {
  await fetch("/expenses", { method: "DELETE" });
  expenses = [];
  render();
}
async function deleteOne(index) {
  await fetch(`/expenses/${index}`, { method: "DELETE" });
  loadExpenses();
}


function render() {
  const list = document.getElementById("list");
  const summary = document.getElementById("summary");

  list.innerHTML = "";
  let total = 0;
  let categoryCount = {};

  expenses.forEach((e, index) => {
    total += e.amount;
    categoryCount[e.category] = (categoryCount[e.category] || 0) + e.amount;

    list.innerHTML += `
  <div class="card">
    ${e.description} - ₹${e.amount}
    <span class="badge">${e.category}</span>
    <button class="del" onclick="deleteOne(${index})">❌</button>
  </div>`;

  });
  


  summary.innerText = `₹ ${total}`;
  drawChart(categoryCount);
}

function drawChart(data) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}
async function deleteOne(index) {
  await fetch(`/expenses/${index}`, { method: "DELETE" });
  loadExpenses(); // reload fresh data
}


loadExpenses();
