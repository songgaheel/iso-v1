const express = require('express');
const router = express.Router();
const workController = require("../controllers/work-controller");
router
    .get("/work/create/1", workController.workCreate1)
    .get("/work/create/2", workController.workCreate2)
    .get("/work/create/3", workController.workCreate3)
    .get("/work/create/4", workController.workCreate4)
    .get("/work/registration", workController.workRegistration);

module.exports = router;