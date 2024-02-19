const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city:{type:String}, 
    age:{type:Number},
    gender:{type:String}
}, { versionKey: false })

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel }