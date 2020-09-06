const express = require('express');
const router = express.Router();
const compController = require("../controllers/company-controller");
router
    .get("/company-structure", compController.CompanyRender)
    .get("/company-structure/company", compController.DepartmentList)
    .post("/company-structure/company/department/create", compController.DepartmentCreate)
    .delete("/company-structure/company/department/delete", compController.DepartmentDelete)
    .get("/company-structure/company/department/:id", compController.DepartmentRender)
    .get("/company-structure/company/department/:id/area", compController.AreaList)
    .post("/company-structure/company/department/:id/area/create", compController.AreaCreate)
    .delete("/company-structure/company/department/:id/area/delete", compController.AreaDelete)
    .get("/company-structure/company/department/area/:id", compController.AreaRender)
    .get("/company-structure/company/department/area/:id/activity", compController.ActivityList);

module.exports = router;