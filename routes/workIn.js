const express = require('express');
const router = express.Router();
const workInController = require("../controllers/work-in-controller");
router
    .get("/work/instruction/create", workInController.workInCreate);

module.exports = router;