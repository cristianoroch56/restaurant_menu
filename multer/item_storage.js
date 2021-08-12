var multer = require('multer');
var fs = require('fs');
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        
        callback(null, "public/images/items_images");
    },
    filename: function (req, file, callback) {
        // save file with current timestamp + user email + file extension
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        // callback(null,(file.originalname));
    }


});

var upload_single = multer({ storage: storage,limits: { fileSize: 10000000 },
    fileFilter: function (req, file, callback) {
        
        if(file.mimetype!='image/png' && file.mimetype!='image/jpeg' && file.mimetype!='image/jpg'){
            req.fileValidationError = "Invalid file type";
            return callback(new Error("Invalid file type"));
        }
        callback(null, true);
    },

}).single('myFile')


module.exports = upload_single;