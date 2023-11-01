const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join('uploads/users/avatars/');

console.log(AVATAR_PATH)
// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, AVATAR_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

const avatarUpload = multer({ storage: storage });

module.exports = avatarUpload;
      
