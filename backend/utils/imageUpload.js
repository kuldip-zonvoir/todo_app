const multer = require("multer");

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "images",
  filename: (req, file, cb) => {
    console.log("my files", file);
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const imageUpload = multer({
//   storage: imageStorage,
//   limits: {
//     fileSize: 1000000, // 1000000 Bytes = 1 MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png | jpg | jpeg)$/)) {
//       // upload only png and jpg format
//       console.log("Uploading", file.originalname);
//       return cb(new Error("Please upload a Image"));
//     }
//     cb(undefined, true);
//   },
// });

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileType = file.type;
    console.log(fileType);
    col;
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var imageUpload = multer({ storage: storage });

module.exports = { imageUpload };
