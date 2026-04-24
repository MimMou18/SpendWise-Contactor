let users = JSON.parse(localStorage.getItem("users")) || [];

// REGISTER
function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if (!user || !pass) return alert("Fill all fields");

  let exist = users.find(u => u.user === user);
  if (exist) return alert("User already exists");

  users.push({ user, pass });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let found = users.find(u => u.user === user && u.pass === pass);

  if (!found) return alert("Invalid login");

  localStorage.setItem("currentUser", user);

  window.location.href = "index.html";
}