const multer = require("multer");
const path = require("path");
const MEDIA_PATH = path.join("uploads/users/media/");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, MEDIA_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})


const mediaUpload = multer({ storage: storage });

module.exports = mediaUpload;
      
