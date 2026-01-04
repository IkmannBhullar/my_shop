// this will tell the server to save files in a folder named uploads
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// 1. CONFIGURATION: Where to save and what to name it
// 1. CONFIGURATION
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // CHANGE THIS LINE: Add "../" to go up to the root folder
    cb(null, '../uploads/'); 
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// 2. VALIDATION: Ensure it's an image
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

// 3. INITIALIZE UPLOAD
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// 4. THE ROUTE
// When frontend posts to '/', save the single file named 'image'
// and send back the file path
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;