// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();

// Route to set a session value
router.get("/set-session", (req, res) => {
  req.session.username = "John Doe";
  res.send("Session value set");
});

// Route to get the session value
router.get("/get-session", (req, res) => {
  if (req.session.username) {
    res.send(`Hello, ${req.session.username}!`);
  } else {
    res.send("No session value found");
  }
});

module.exports = router;
