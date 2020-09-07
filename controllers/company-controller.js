const CompanySchema = require('../models/CompanySchema');
const DepartmentSchema = require('../models/DepartmentSchema');
const AreaSchema = require('../models/AreaSchema');
const ActivitySchema = require('../models/ActivitySchema');

const Company = CompanySchema.CompanyModel;
const Department = DepartmentSchema.DepartmentModel;
const Area = AreaSchema.AreaModel;
const Activity = ActivitySchema.ActivityModel;

async function CompanyRender(req, res, next) {
    const sess = req.session;
    if (sess.username) {
        const data = await Company.find({})
        res.render("company", {
            data: {
                name: data[0].name,
                _id: data[0]._id
            }
        });
    } else { res.redirect('/login'); }
}

async function DepartmentList(req, res, next) {
    const data = await Company.find({})
        .populate('departments');
    var html = '<br/><h3 align="center">Department List</h3><div class="table-responsive"><table class="table table-bordered table-striped"><thead class="thead-dark"><tr><th width="80%">Department Name</th><th></th></tr></thead><tbody>';
    for (let index = 0; index < data[0].departments.length; index++) {

        html = html + '<tr>';
        html = html + '<td>' + data[0].departments[index].name + '</td>';
        html = html + '<td><a type="button" name="areaLink" href="/company-structure/company/department/' + data[0].departments[index]._id + '" class="btn btn-success btn-xs areaLink"><i class="fas fa-list"></i> Detail</a> ';
        html = html + '<button type="button" name="deleteDepartment" data-id="' + data[0].departments[index]._id + '" class="btn btn-danger btn-xs deleteDepartment"><i class="far fa-window-close"></i> Delete</button></td>';
        html = html + '</tr>'
    }

    html = html + '</tbody></table></div>'
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
    const sess = req.session;
    if (sess.username) {
        const department = req.params.id;
        const data = await Department.findOne({ _id: department });
        res.render("department", {
            data: {
                name: data.name,
                _id: data._id
            }
        });
    } else { res.redirect('/login'); }
}

async function AreaList(req, res, next) {
    const department_id = req.params.id;
    const data = await Department.findOne({ _id: department_id })
        .populate('areas');
    //console.log(data);
    var html = '<br/><h3 class="text-center">Area List</h3><div class="table-responsive"><table class="table table-bordered table-striped"><thead class="thead-dark"><tr><th width="60%">Area Name</th><th>Area Type</th><th></th></tr></thead><tbody>';
    for (let index = 0; index < data.areas.length; index++) {

        html = html + '<tr>';
        html = html + '<td>' + data.areas[index].name + '</td>';
        html = html + '<td>' + data.areas[index].areaType + '</td>';
        html = html + '<td><a type="button" name="activityLink" href="/company-structure/company/department/area/' + data.areas[index]._id + '" class="btn btn-success btn-xs activityLink"><i class="fas fa-list"></i> Detail</a> ';
        html = html + '<button type="button" name="deleteArea" data-id="' + data.areas[index]._id + '" class="btn btn-danger btn-xs deleteArea"><i class="fas fa-window-close"></i> Delete</button></td>';
        html = html + '</tr>'
    }
    html = html + '</tbody></table></div>'
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
    const sess = req.session;
    if (sess.username) {
        const area = req.params.id;
        const data = await Area.findOne({ _id: area });
        res.render("area", {
            data: {
                name: data.name,
                _id: data._id
            }
        });
    } else { res.redirect('/login'); }
}

async function ActivityList(req, res, next) {
    const area = req.params.id;
    const data = await Area.findOne({ _id: area })
        .populate('activities');

    var html = '<br/><h3 class="text-center">Activities List</h3><div class="table-responsive">';
    html = html + '<table class="table table-bordered table-striped"><thead class="thead-dark"><tr>';
    html = html + '<th rowspan="2" width="25%" class="text-center">Activity Name</th>';
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
        if (data.activities[index].operation.staff) {
            var OPstaff = 'checked disabled';
        } else {
            var OPstaff = 'disabled';
        }
        if (data.activities[index].operation.vendor) {
            var OPvendor = 'checked disabled';
        } else {
            var OPvendor = 'disabled';
        }
        if (data.activities[index].operation.customer) {
            var OPcustomer = 'checked disabled';
        } else {
            var OPcustomer = 'disabled';
        }
        if (data.activities[index].operation.community) {
            var OPcommunity = 'checked disabled';
        } else {
            var OPcommunity = 'disabled';
        }
        if (data.activities[index].operation.etc.enable) {
            var OPetc = 'checked disabled';
            var OPetcDetail = data.activities[index].operation.etc.detail;
        } else {
            var OPetc = 'disabled';
            var OPetcDetail = '';
        }
        //
        if (data.activities[index].effect.staff) {
            var EFstaff = 'checked disabled';
        } else {
            var EFstaff = 'disabled';
        }
        if (data.activities[index].effect.vendor) {
            var EFvendor = 'checked disabled';
        } else {
            var EFvendor = 'disabled';
        }
        if (data.activities[index].effect.customer) {
            var EFcustomer = 'checked disabled';
        } else {
            var EFcustomer = 'disabled';
        }
        if (data.activities[index].effect.community) {
            var EFcommunity = 'checked disabled';
        } else {
            var EFcommunity = 'disabled';
        }
        if (data.activities[index].effect.etc.enable) {
            var EFetc = 'checked disabled';
            var EFetcDetail = data.activities[index].effect.etc.detail;
        } else {
            var EFetc = 'disabled';
            var EFetcDetail = '';
        }
        //
        html = html + '<tr>';
        html = html + '<td >' + data.activities[index].name + '</td>';
        html = html + '<td >' + data.activities[index].activityType + '</td>';
        html = html + '<td >' + data.activities[index].location + '</td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + OPstaff + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + OPvendor + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + OPcustomer + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + OPcommunity + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + OPetc + '> ' + OPetcDetail + '</td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + EFstaff + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + EFvendor + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + EFcustomer + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + EFcommunity + '></td>';
        html = html + '<td class="text-center"><input class="form-check-inline" type="checkbox" ' + EFetc + '> ' + EFetcDetail + '</td>';
        html = html + '<td><button type="button" name="deleteActivity" data-id="' + data.activities[index]._id + '" class="btn btn-danger btn-xs deleteActivity"><i class="fas fa-window-close"></i> Delete</button></td>';
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

async function ActivityCreate(req, res, next) {
    const activity = req.body.activity;
    const area = req.body.area;
    const newActivity = [{}];

    for (let index = 0; index < activity.length; index++) {
        newActivity[index] = Activity(activity[index]);
        await newActivity[index].save();
        const UpdateDepartment = await Area.updateOne({ _id: area }, {
            $push: { activities: newActivity[index]._id }
        });
        if (index == activity.length - 1) {
            res.send('Create Activity successful');
        }
    }
    console.log('Create Activity successful');
}

async function ActivityDelete(req, res, next) {
    const activity = req.body.activity;
    const area = req.body.area;
    const Updatearea = await Area.updateOne({ _id: area }, {
        $pull: { activities: activity }
    });
    const data = await Area.deleteOne({ _id: activity });

    res.send('delete area complete');
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
module.exports.ActivityCreate = ActivityCreate;
module.exports.ActivityDelete = ActivityDelete;