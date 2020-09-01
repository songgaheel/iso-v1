const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const riskSchema = new schema({
    name: String,
    defaultData: Boolean,
    sources: {
        type: String,
        enum: [
            'Environment/Physical',
            'Environment/Biological',
            'Environment/Chemical',
            'Environment/Ergonomic',
            'Equipment',
            'Material',
            'Unsafe Activity Security/Heath',
            'Unsafe Activity Environment/Energy',
            'Unsafe Condition Security/Heath',
            'Unsafe Condition Environment/Energy',
            'People and Social / Pysical Error',
            'People and Social / Psycological Error',
            'People and Social / Pysical Strain',
            'People and Social / Psycological Strain',
            'People and Social / Lack of knowledge',
            'People and Social / Non-motivation',
        ]
    },
    environment: {
        resource: Boolean,
        pollution: Boolean,
        aspect: String,
        impact: String,
        status: {
            normal: Boolean,
            abnormal: Boolean,
            emergency: Boolean,
            law: Boolean
        },
    },
    security: {
        safety: Boolean,
        health: Boolean,
        risk: String,
        harzard: String,
        status: {
            normal: Boolean,
            abnormal: Boolean,
            emergency: Boolean,
            law: Boolean
        },
    }
});
module.exports.riskSchema = riskSchema;