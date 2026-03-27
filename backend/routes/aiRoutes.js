const express = require("express");
const router = express.Router();

const { getInsights } = require("../controllers/aiController");
console.log(getInsights);
router.post("/insights", getInsights); // ❌ error yahi hai

module.exports = router;