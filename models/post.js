const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    media: {
        type: {
          type: String,
          enum: ["image", "video"],
        },
        url: String, // URL or file path for the media
      
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Likes"
        }
    ]
},{timestamps : true});

const Post = mongoose.model("Post",postSchema);

module.exports = Post;