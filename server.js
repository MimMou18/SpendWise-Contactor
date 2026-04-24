const express = require("express");
const path = require("path");

const app = express();

// static file serve করবে (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});