const mongoose = require("mongoose")
const postsSchema = mongoose.Schema({
    quote: { type: String},
    photo: { type: String },
    device: { type: String},
    commentsCount: { type: String},
    userID:{type:String}
    , 
}, { versionKey: false })

const postsModel = mongoose.model("posts", postsSchema);

module.exports = { postsModel }