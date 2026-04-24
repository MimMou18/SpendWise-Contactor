let params = new URLSearchParams(window.location.search);
let id = params.get("id");

let contractors = JSON.parse(localStorage.getItem("contractors"));
let contractor = contractors[id];

document.getElementById("contractorTitle").innerText = contractor.name;

//show Expenses
function showExpenses() {
  let tbody = document.getElementById("expenseBody");
  let total = 0;

  tbody.innerHTML = "";

  contractor.expenses.forEach((exp, i) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.amount}</td>
      <td><button onclick="editExpense(${i})">✏️</button></td>
      <td><button onclick="deleteExpense(${i})">❌</button></td>
    `;

    tbody.appendChild(row);
    total += Number(exp.amount);
  });

  document.getElementById("total").innerText = "Total: " + total + " Tk";

  showMonthlyReport();
}

// Add expense
function addExpense() {
  let date = document.getElementById("date").value;
  let amount = document.getElementById("amount").value;

  if (date === "" || amount === "") return;

  contractor.expenses.push({
    date: date,
    amount: amount
  });

  saveAndRefresh();

  document.getElementById("date").value = "";
  document.getElementById("amount").value = "";
}

// Save & refresh
function saveAndRefresh() {
  contractors[id] = contractor;
  localStorage.setItem("contractors", JSON.stringify(contractors));
  showExpenses();
}

// Edit
function editExpense(i) {
  let newAmount = prompt("Enter new amount:", contractor.expenses[i].amount);

  if (newAmount !== null) {
    contractor.expenses[i].amount = newAmount;
    saveAndRefresh();
  }
}

// Delete
function deleteExpense(i) {
  contractor.expenses.splice(i, 1);
  saveAndRefresh();
}

// Monthly report
function showMonthlyReport() {
  let report = {};

  contractor.expenses.forEach(exp => {
    let month = exp.date.slice(0, 7);

    if (!report[month]) report[month] = 0;
    report[month] += Number(exp.amount);
  });

  let text = "📊 Monthly Report:\n";

  for (let m in report) {
    text += `${m}: ${report[m]} Tk\n`;
  }

  document.getElementById("monthlyReport").innerText = text;
}

showExpenses();