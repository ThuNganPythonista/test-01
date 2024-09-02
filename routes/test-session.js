const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  if (req.session.userId) {
    // Lấy user data using req.session.userId
    res.json({
      message: "Welcome to your profile!",
      userId: req.session.userId,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
