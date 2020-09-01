const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const areaSchema = new schema({
    "name": String,
    "areaType": {
        type: String,
        enum: ['inside', 'outside']
    },
    "activities": [{
        type: schema.Types.ObjectId,
        ref: 'activities'
    }]
});
module.exports.areaSchema = areaSchema;
module.exports.AreaModel = connectDB.mongoose.model('areas', areaSchema);