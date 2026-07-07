const multer = require('multer');
const path = require('path');

// Multer Storage Configuration - Store in RAM temporarily
const storage = multer.memoryStorage();

// File Filter (Images Only)
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! Allowed formats: jpeg, jpg, png, webp, gif, svg'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;