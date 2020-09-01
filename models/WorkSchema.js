const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const workSchema = new schema({
    name: String,
    createDate: Date,
    progress: { type: String, enum: ['1', '2', '3', '4', 'complete'] },
    modifiedDate: Date,
    user: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    company: {
        type: schema.Types.ObjectId,
        ref: 'companies'
    },
    department: {
        type: schema.Types.ObjectId,
        ref: 'departments'
    },
    insideAreas: {
        areas: [{
            type: schema.Types.ObjectId,
            ref: 'areas'
        }],
        activities: [{
            type: schema.Types.ObjectId,
            ref: 'activities'
        }]
    },
    outsideAreas: {
        areas: [{
            type: schema.Types.ObjectId,
            ref: 'areas'
        }],
        activities: [{
            type: schema.Types.ObjectId,
            ref: 'activities'
        }]
    },
    evaluateworks: [{
        type: schema.Types.ObjectId,
        ref: 'evaluateworks'
    }]
});
module.exports.workSchema = workSchema;