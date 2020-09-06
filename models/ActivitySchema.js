const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const activitySchema = new schema({
    name: String,
    activityType: {
        type: String,
        enum: ['routine', 'non-routine']
    }, // routine or non-routine
    location: {
        type: String,
        enum: ['inside', 'outside']
    }, // inside or outside
    operation: {
        staff: Boolean,
        vendor: Boolean,
        customer: Boolean,
        community: Boolean,
        etc: {
            enable: Boolean,
            detail: String
        }
    },
    effect: {
        staff: Boolean,
        vendor: Boolean,
        customer: Boolean,
        community: Boolean,
        etc: {
            enable: Boolean,
            detail: String
        }
    },
});
//create collection
module.exports.activitySchemas = activitySchema;
module.exports.ActivityModel = connectDB.mongoose.model('activities', activitySchema);