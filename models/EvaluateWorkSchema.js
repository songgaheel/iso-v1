const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const evaluateworkSchema = new schema({
    name: String,
    work: {
        type: schema.Types.ObjectId,
        ref: 'works'
    },
    progress: { type: String, enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'complete'] },
    evaluateDate: Date,
    evaluateNumber: Number,
    evaluateType: {
        type: String,
        enum: ['Year', 'Before Changing', 'Continue', 'After Changing', 'Accident']
    },
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
        evaluateEnv: {
            envRisks: {
                type: schema.Types.ObjectId,
                ref: 'risks'
            },
            p1: Number,
            p2: Number,
            p3: Number,
            p4: Number,
            p5: Number,
            p: Number,
            r1: Number,
            r2: Number,
            r: Number,
            pr: Number,
            level: String, //N, L, M, H and D
        },
        evaluateSec: {
            SecRisks: {
                type: schema.Types.ObjectId,
                ref: 'risks'
            },
            p1: Number,
            p2: Number,
            p3: Number,
            p4: Number,
            p5: Number,
            p: Number,
            r1: Number,
            r2: Number,
            r: Number,
            pr: Number,
            level: String, //N, L, M, H and D
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
        evaluateEnv: {
            envRisks: {
                type: schema.Types.ObjectId,
                ref: 'risks'
            },
            p1: Number,
            p2: Number,
            p3: Number,
            p4: Number,
            p5: Number,
            p: Number,
            r1: Number,
            r2: Number,
            r: Number,
            pr: Number,
            level: String, //N, L, M, H and D
        },
        evaluateSec: {
            SecRisks: {
                type: schema.Types.ObjectId,
                ref: 'risks'
            },
            p1: Number,
            p2: Number,
            p3: Number,
            p4: Number,
            p5: Number,
            p: Number,
            r1: Number,
            r2: Number,
            r: Number,
            pr: Number,
            level: String, //N, L, M, H and D
        }
    }],
    wi: [{
        type: schema.Types.ObjectId,
        ref: 'wis'
    }]
});
module.exports.evaluateworkSchema = evaluateworkSchema;