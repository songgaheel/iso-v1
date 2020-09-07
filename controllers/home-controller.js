const WorkSchema = require('../models/WorkSchema');
const CompanySchema = require('../models/CompanySchema');
const DepartmentSchema = require('../models/DepartmentSchema');
const UserSchema = require('../models/UserSchema');

const Work = WorkSchema.workModel;
const Company = CompanySchema.CompanyModel;
const Department = DepartmentSchema.DepartmentModel;
const User = UserSchema.userModel;

async function home(req, res, next) {
    const sess = req.session;
    if (sess.username) {
        res.render("home", {
            data: {
                pageName: "Home",
                message: "ISO Risk Evaluation Software",
            }
        });
    }
    res.redirect('/login');
}

async function WorkList(req, res, next) {
    const sess = req.session;
    if (sess.username) {
        const data = await Work.find({})
            .populate('company')
            .populate('department')
            .populate('user');
        console.log(data);
        var html = '<div id="table" class="table-responsive"><table class="table table-bordered "><thead class="thead-dark"><tr><th width="30%" class="text-center">ชื่องาน</th><th class="text-center">บริษัท</th><th class="text-center">หน่วยงาน</th><th class="text-center">ผู้จัดทำ</th><th class="text-center">วันที่จัดทำ</th><th class="text-center">สถานะ</th><th class="text-center" width="15%"></th></tr></thead></tbody>';
        for (let index = 0; index < data.length; index++) {

            html = html + '<tr>';
            html = html + '<td>' + data[index].name + '</td>';
            html = html + '<td>' + data[index].company.name + '</td>';
            html = html + '<td>' + data[index].department.name + '</td>';
            html = html + '<td>' + data[index].user.name + '</td>';
            html = html + '<td>' + data[index].createDate + '</td>';
            html = html + '<td>' + data[index].progress + '</td>';
            html = html + '<td><a type="button" name="activityLink" href="/work/registration/' + data[index]._id + '" class="btn btn-success btn-xs activityLink"><i class="fas fa-list"></i> Detail</a> ';
            html = html + '<button type="button" name="deleteWork" data-id="' + data[index]._id + '" class="btn btn-danger btn-xs deleteWork"><i class="fas fa-window-close"></i> Delete</button></td>';
            html = html + '</tr>'
        }
        html = html + '</tbody></table></div>'
        res.send(html);
    }
    res.redirect('/login');
}

module.exports.home = home;
module.exports.WorkList = WorkList;