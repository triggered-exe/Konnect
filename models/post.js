const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps : true});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;