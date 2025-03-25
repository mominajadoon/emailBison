const express = require("express");
const {
  createInboxTest,
  getInboxTest,
  getAllInboxTests,
} = require("../Controllers/placementTestController");

const router = express.Router();

router.post("/create", createInboxTest);
router.get("/:id", getInboxTest);

router.get("/inbox-tests", getAllInboxTests);

module.exports = router;
