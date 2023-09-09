const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Changed "require" to "required"
        refPath: "onModel"
    },
    onModel:{
        type: String,
        required: true, // Changed "require" to "required"
        enum: ["Post", "Comment"]
    }
}, { timestamps: true });

const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;