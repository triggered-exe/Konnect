const mongoose = require("mongoose");

const friendshipSchema = mongoose.Schema({
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;