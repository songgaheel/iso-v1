const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const companySchema = new schema({
    name: String,
    departments: [{
        type: schema.Types.ObjectId,
        ref: 'departments'
    }]
});
module.exports.companySchema = companySchema;
module.exports.CompanyModel = connectDB.mongoose.model('companies', companySchema);