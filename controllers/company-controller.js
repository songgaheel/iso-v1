const CompanySchema = require('../models/CompanySchema');
const DepartmentSchema = require('../models/DepartmentSchema');
const AreaSchema = require('../models/AreaSchema');
const ActivitySchema = require('../models/ActivitySchema');

const Company = CompanySchema.CompanyModel;
const Department = DepartmentSchema.DepartmentModel;
const Area = AreaSchema.AreaModel;
const Activity = ActivitySchema.ActivityModel;

async function CompanyRender(req, res, next) {
    const data = await Company.find({})
    res.render("company", {
        data: {
            name: data[0].name,
            _id: data[0]._id
        }
    });
}

async function DepartmentList(req, res, next) {
    const data = await Company.find({})
        .populate('departments');
    var html = '<br/><h3 align="center">Department List</h3><div class="table-responsive"><table class="table table-bordered table-striped"><tr><th>Department Name</th><th></th></tr>';
    for (let index = 0; index < data[0].departments.length; index++) {

        html = html + '<tr>';
        html = html + '<td>' + data[0].departments[index].name + '</td>';
        html = html + '<td><a type="button" name="areaLink" href="/company-structure/company/department/' + data[0].departments[index]._id + '" class="btn btn-success btn-xs areaLink"><i class="fas fa-list"></i> Detail</a> ';
        html = html + '<button type="button" name="deleteDepartment" data-id="' + data[0].departments[index]._id + '" class="btn btn-danger btn-xs deleteDepartment"><i class="far fa-window-close"></i> Delete</button></td>';
        html = html + '</tr>'
    }

    html = html + '</table></div>'
    res.send(html);
}

async function DepartmentCreate(req, res, next) {
    const name = {
        name: req.body.department
    };
    const company = req.body.company_id;
    const department = [{}];
    const newDepartment = [{}];

    console.log(req.body);
    console.log(name);
    console.log(company);

    for (let index = 0; index < name.name.length; index++) {
        console.log(index);
        department[index] = {
            name: name.name[index],
            company: company
        }

        newDepartment[index] = Department(department[index]);
        await newDepartment[index].save();
        const Updatecompany = await Company.updateOne({ _id: company }, {
            $push: { departments: newDepartment[index]._id }
        });
        if (index == name.name.length - 1) {
            res.send('Create department successful');
        }
    }
    console.log(department);
    console.log(newDepartment);
}

async function DepartmentDelete(req, res, next) {
    const company = req.body.company;
    const department = req.body.department;
    const Updatecompany = await Company.updateOne({ _id: company }, {
        $pull: { departments: department }
    });
    const data = await Department.deleteOne({ _id: department });

    res.send('delete department complete');
}

async function DepartmentRender(req, res, next) {
    const department = req.params.id;
    //console.log(department);
    const data = await Department.findOne({ _id: department });
    //res.send(data);
    //console.log(data);
    res.render("department", {
        data: {
            name: data.name,
            _id: data._id
        }
    });
}

async function AreaList(req, res, next) {
    const department_id = req.params.id;
    const data = await Department.findOne({ _id: department_id })
        .populate('areas');
    //console.log(data);
    var html = '<br/><h3 class="text-center">Area List</h3><div class="table-responsive"><table class="table table-bordered table-striped"><tr><th>Area Name</th><th>Area Type</th><th></th></tr>';
    for (let index = 0; index < data.areas.length; index++) {

        html = html + '<tr>';
        html = html + '<td>' + data.areas[index].name + '</td>';
        html = html + '<td>' + data.areas[index].areaType + '</td>';
        html = html + '<td><a type="button" name="activityLink" href="/company-structure/company/department/area/' + data.areas[index]._id + '" class="btn btn-success btn-xs activityLink"><i class="fas fa-list"></i> Detail</a> ';
        html = html + '<button type="button" name="deleteArea" data-id="' + data.areas[index]._id + '" class="btn btn-danger btn-xs deleteArea"><i class="fas fa-window-close"></i> Delete</button></td>';
        html = html + '</tr>'
    }
    html = html + '</table></div>'
    res.send(html);
}

async function AreaCreate(req, res, next) {
    const department = req.body.department;
    const area = req.body.areas;
    const newArea = [{}];

    for (let index = 0; index < area.length; index++) {
        newArea[index] = Area(area[index]);
        await newArea[index].save();
        const UpdateDepartment = await Department.updateOne({ _id: department }, {
            $push: { areas: newArea[index]._id }
        });
        if (index == area.length - 1) {
            res.send('Create Area successful');
        }
    }
    console.log('Create Area successful');
}

async function AreaDelete(req, res, next) {
    const department = req.body.department;
    const area = req.body.area;
    const Updatecompany = await Department.updateOne({ _id: department }, {
        $pull: { departments: area }
    });
    const data = await Area.deleteOne({ _id: area });

    res.send('delete area complete');
}

async function AreaRender(req, res, next) {
    const area = req.params.id;
    //console.log(department);
    const data = await Area.findOne({ _id: area });
    //res.send(data);
    //console.log(data);
    res.render("area", {
        data: {
            name: data.name,
            _id: data._id
        }
    });
}

async function ActivityList(req, res, next) {
    const area = req.params.id;
    const data = await Area.findOne({ _id: area })
        .populate('activities');
    console.log(data);
    var html = '<br/><h3 class="text-center">Activities List</h3><div class="table-responsive">';
    html = html + '<table class="table table-bordered table-striped"><thead class="thead-dark"><tr>';
    html = html + '<th rowspan="2" width="30%" class="text-center">Activity Name</th>';
    html = html + '<th rowspan="2">Activity Type</th>';
    html = html + '<th rowspan="2">Activity Location</th>';
    html = html + '<th colspan="5" class="text-center">Activity Operation</th>';
    html = html + '<th colspan="5" class="text-center">Activity Effect</th>';
    html = html + '<th rowspan="2"></th>';
    html = html + '</tr>';
    html = html + '<tr>';
    html = html + '<th class="text-center">staff</th>';
    html = html + '<th class="text-center">vendor</th>';
    html = html + '<th class="text-center">customer</th>';
    html = html + '<th class="text-center">community</th>';
    html = html + '<th class="text-center">etc</th>';
    html = html + '<th class="text-center">staff</th>';
    html = html + '<th class="text-center">vendor</th>';
    html = html + '<th class="text-center">customer</th>';
    html = html + '<th class="text-center">community</th>';
    html = html + '<th class="text-center">etc</th>';
    html = html + '</tr></thead"><tbody>';
    for (let index = 0; index < data.activities.length; index++) {

        html = html + '<tr>';
        html = html + '<td >' + data.activities[index].name + '</td>';
        html = html + '<td >' + data.activities[index].activityType + '</td>';
        html = html + '<td >' + data.activities[index].location + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].operation.staff + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].operation.vendor + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].operation.customer + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].operation.community + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].operation.etc.enable + ' ' + data.activities[index].operation.etc.detail + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].effect.staff + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].effect.vendor + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].effect.customer + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].effect.community + '</td>';
        html = html + '<td class="text-center">' + data.activities[index].effect.etc.enable + ' ' + data.activities[index].effect.etc.detail + '</td>';
        html = html + '<td><button type="button" name="deleteActivity" data-id="' + data.activities[index]._id + '" class="btn btn-danger btn-xs deleteArea"><i class="fas fa-window-close"></i> Delete</button></td>';
        /*html = html + '<td>' + data.activities[index].name + '</td>';
        html = html + '<td>' + data.activities[index].areaType + '</td>';
        html = html + '<td><a type="button" name="activityLink" data-id="' + data.areas[index]._id + '" class="btn btn-success btn-xs activityLink"><span class="glyphicon glyphicon-list-alt"></span> Detail</a> ';
        html = html + '<button type="button" name="deleteArea" data-id="' + data.areas[index]._id + '" class="btn btn-danger btn-xs deleteArea"><span class="glyphicon glyphicon-remove"></span> Delete</button></td>';
        */
        html = html + '</tr>'

    }
    html = html + '</tbody></table></div>'
    res.send(html);
}

module.exports.CompanyRender = CompanyRender;
module.exports.DepartmentList = DepartmentList;
module.exports.DepartmentCreate = DepartmentCreate;
module.exports.DepartmentDelete = DepartmentDelete;
module.exports.DepartmentRender = DepartmentRender;
module.exports.AreaList = AreaList;
module.exports.AreaCreate = AreaCreate;
module.exports.AreaDelete = AreaDelete;
module.exports.AreaRender = AreaRender;
module.exports.ActivityList = ActivityList;