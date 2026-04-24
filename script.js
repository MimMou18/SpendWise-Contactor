// ===== CURRENT USER CHECK =====
let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "auth.html";
}

// ===== USER BASED DATA =====
let key = currentUser + "_contractors";
let contractors = JSON.parse(localStorage.getItem(key)) || [];

// ===== SHOW CONTRACTORS =====
function showContractors() {
  let list = document.getElementById("contractorList");
  list.innerHTML = "";

  contractors.forEach((c, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span>
        <a href="contractor.html?id=${index}">${c.name}</a>
      </span>
      <div>
        <button onclick="deleteContractor(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// ===== ADD CONTRACTOR =====
function addContractor() {
  let name = document.getElementById("contractorName").value;

  if (name === "") return;

  contractors.push({
    name: name,
    expenses: []
  });

  saveData();

  document.getElementById("contractorName").value = "";
  showContractors();
}

// ===== DELETE CONTRACTOR =====
function deleteContractor(index) {
  if (confirm("Delete this contractor?")) {
    contractors.splice(index, 1);
    saveData();
    showContractors();
  }
}

// ===== SEARCH CONTRACTOR =====
function searchContractor() {
  let value = document.getElementById("search").value.toLowerCase();
  let list = document.getElementById("contractorList");
  list.innerHTML = "";

  contractors.forEach((c, index) => {
    if (c.name.toLowerCase().includes(value)) {
      let li = document.createElement("li");

      li.innerHTML = `
        <span>
          <a href="contractor.html?id=${index}">${c.name}</a>
        </span>
      `;

      list.appendChild(li);
    }
  });
}

// ===== SAVE FUNCTION =====
function saveData() {
  localStorage.setItem(key, JSON.stringify(contractors));
}

// ===== LOGOUT (optional but recommended) =====
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ===== INIT =====
showContractors();