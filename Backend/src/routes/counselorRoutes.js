const express = require("express");
const router = express.Router();
const { loginCounselor, logoutCounselor } = require("../controllers/counselorController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", loginCounselor);
router.post("/logout", authMiddleware, logoutCounselor);

module.exports = router;