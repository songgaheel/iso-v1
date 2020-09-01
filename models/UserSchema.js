const connectDB = require('../connectDB');
const schema = connectDB.mongoose.Schema;
const userSchema = new schema({
    username: { type: String, unique: true, required: true },
    password: String,
    name: String,
    surname: String,
    //level: String,
    department: {
        type: schema.Types.ObjectId,
        ref: 'departments'
    },
});
//create collection
module.exports.userSchema = userSchema;