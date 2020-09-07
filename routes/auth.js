const express = require('express');
const router = express.Router();
const loginController = require("../controllers/login-controller");
const homeController = require("../controllers/home-controller");
router
    .get("/login", loginController.login)
    .post("/login", loginController.auth)
    .get("/home/work", homeController.WorkList);
module.exports = router;