const express = require("express");
const router = express.Router();
const { loginCounselor, logoutCounselor, registerCounselor } = require("../controllers/counselorController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/register", registerCounselor);
router.post("/login", loginCounselor);
router.post("/logout", authMiddleware, logoutCounselor);

// Test route
router.get("/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Counselor routes working",
    endpoints: {
      register: "POST /api/counselor/register",
      login: "POST /api/counselor/login",
      logout: "POST /api/counselor/logout"
    }
  });
});

module.exports = router;