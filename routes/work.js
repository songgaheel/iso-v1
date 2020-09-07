const express = require('express');
const router = express.Router();
const workController = require("../controllers/work-controller");
router
    .get("/work/create/1", workController.workCreate1)
    .post("/work/create/2", workController.workCreate2)
    .post("/work/create/3", workController.workCreate3)
    .get("/work/create/4", workController.workCreate4)
    .get("/work/registration", workController.workRegistration);

module.exports = router;