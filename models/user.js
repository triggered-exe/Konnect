const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join('./uploads/users/avatars/');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    avatar:{
        type: String
    }
},
{
    timestamps: true
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, AVATAR_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

//   the term "statics" refers to a way of adding static methods to your Mongoose models
  userSchema.statics.upload = multer({ storage: storage }).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;

  const User = mongoose.model("User",userSchema);

  
// const upload = multer({ storage: storage })
// module.exports = upload;
module.exports = User;