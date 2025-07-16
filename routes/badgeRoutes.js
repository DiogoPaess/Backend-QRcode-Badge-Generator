const express = require("express");
const router = express.Router();
const {
  generateBadge,
  getBadgeById,
} = require("../controllers/badgeController");

router.post("/generate", generateBadge);
router.get("/:id", getBadgeById);

module.exports = router;
