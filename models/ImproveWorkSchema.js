const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const improveworkSchema = new schema({
    evaluatework: {
        type: schema.Types.ObjectId,
        ref: 'evaluateworks'
    },
    createdate: Date,
    ImproveNumber: Number,
    riskinsideAreas: [{
        order: Number,
        areas: {
            type: schema.Types.ObjectId,
            ref: 'areas'
        },
        activities: {
            type: schema.Types.ObjectId,
            ref: 'activities'
        },
        risks: {
            type: schema.Types.ObjectId,
            ref: 'risks'
        },
        improve: {
            type: schema.Types.ObjectId,
            ref: 'improves'
        }
    }],
    riskoutsideAreas: [{
        order: Number,
        areas: {
            type: schema.Types.ObjectId,
            ref: 'areas'
        },
        activities: {
            type: schema.Types.ObjectId,
            ref: 'activities'
        },
        risks: {
            type: schema.Types.ObjectId,
            ref: 'risks'
        },
        improve: {
            type: schema.Types.ObjectId,
            ref: 'improves'
        }
    }]

});
module.exports.improveworkSchema = improveworkSchema;