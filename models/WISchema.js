const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const wiSchema = new schema({
    evaluatework: {
        type: schema.Types.ObjectId,
        ref: 'evaluateworks'
    },
    createdate: Date,
    wiNumber: Number,
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
        wi: {
            resource: {
                enable: Boolean,
                detail: String,
            },
            pollution: {
                enable: Boolean,
                detail: String,
            },
            safety: {
                enable: Boolean,
                detail: String,
            },
            health: {
                enable: Boolean,
                detail: String,
            },
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
        wi: {
            resource: {
                enable: Boolean,
                detail: String,
            },
            pollution: {
                enable: Boolean,
                detail: String,
            },
            safety: {
                enable: Boolean,
                detail: String,
            },
            health: {
                enable: Boolean,
                detail: String,
            },
        }
    }]

});
module.exports.wiSchema = wiSchema;