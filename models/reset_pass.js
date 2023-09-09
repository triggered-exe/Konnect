const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetPassSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: false,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  isValid: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Set the 'expires' option to automatically delete the document
    // 1 hour (3600 seconds) after the 'createdAt' timestamp
    expires: 3600, // 3600 seconds = 1 hour
  },
});

const ResetPassword = mongoose.model("ResetPassword", resetPassSchema);

module.exports = ResetPassword;
