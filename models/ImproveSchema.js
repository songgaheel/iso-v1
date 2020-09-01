const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const improveSchema = new schema({
    risk: {
        type: schema.Types.ObjectId,
        ref: 'risks'
    },
    environment: {
        p1: {
            0: [String],
            2: [String]
        },
        p2: {
            0: [String],
            2: [String]
        },
        p3: {
            0: [String],
            2: [String]
        },
        p4: {
            0: [String],
            2: [String]
        },
        p5: {
            0: [String],
            2: [String]
        }
    },
    security: {
        p1: {
            0: [String],
            2: [String]
        },
        p2: {
            0: [String],
            2: [String]
        },
        p3: {
            0: [String],
            2: [String]
        },
        p4: {
            0: [String],
            2: [String]
        },
        p5: {
            0: [String],
            2: [String]
        }
    }
});
module.exports.improveSchema = improveSchema;