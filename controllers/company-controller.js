const CompanySchema = require('../models/CompanySchema');
const DepartmentSchema = require('../models/DepartmentSchema');
const AreaSchema = require('../models/AreaSchema');

const Company = CompanySchema.CompanyModel
const Department = DepartmentSchema.DepartmentModel
const Area = AreaSchema.AreaModel

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
    var html = '<br/><h3 align="center">Department List</h3><table class="table table-bordered table-striped"><tr><th>Department Name</th><th></th></tr>';
    for (let index = 0; index < data[0].departments.length; index++) {

        html = html + '<tr>';
        html = html + '<td>' + data[0].departments[index].name + '</td>';
        html = html + '<td><a type="button" name="areaLink" href="/company-structure/company/department/' + data[0].departments[index]._id + '" class="btn btn-success btn-xs areaLink"><span class="glyphicon glyphicon-list-alt"></span> Detail</a> ';
        html = html + '<button type="button" name="deleteDepartment" data-id="' + data[0].departments[index]._id + '" class="btn btn-danger btn-xs deleteDepartment"><span class="glyphicon glyphicon-remove"></span> Delete</button></td>';
        html = html + '</tr>'
    }
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
    console.log(data);
    var html = '<br/><h3 align="center">Department List</h3><table class="table table-bordered table-striped"><tr><th>Department Name</th><th></th></tr>';
    for (let index = 0; index < data.areas.length; index++) {

        html = html + '<tr>';
        html = html + '<td>' + data.areas[index].name + '</td>';
        html = html + '<td><a type="button" name="areaLink" href="/company-structure/company/department/' + data.areas[index]._id + '" class="btn btn-success btn-xs areaLink"><span class="glyphicon glyphicon-list-alt"></span> Detail</a> ';
        html = html + '<button type="button" name="deleteDepartment" data-id="' + data.areas[index]._id + '" class="btn btn-danger btn-xs deleteDepartment"><span class="glyphicon glyphicon-remove"></span> Delete</button></td>';
        html = html + '</tr>'
    }
    res.send(html);
}



module.exports.CompanyRender = CompanyRender;
module.exports.DepartmentList = DepartmentList;
module.exports.DepartmentCreate = DepartmentCreate;
module.exports.DepartmentDelete = DepartmentDelete;
module.exports.DepartmentRender = DepartmentRender;
module.exports.AreaList = AreaList;