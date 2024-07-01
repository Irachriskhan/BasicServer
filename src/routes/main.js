const express = require("express");
const { mainController } = require("../controllers/main");
const router = express.Router();

router.get("/api/hello", mainController);

module.exports = router;
