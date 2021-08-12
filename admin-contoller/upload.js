var multer = require('multer');
var fs = require('fs');
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/images/upload_images");
    },
    filename: function (req, file, callback) {
        // save file with current timestamp + user email + file extension
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        // callback(null,(file.originalname));
    }


});


module.exports.uploadImage = function(req, res, next){

    var upload = multer({ storage: storage }).fields([{name: 'myFile', maxCount: 1}, {name: 'myFiles', maxCount:5 }])

    return upload(req, res, next)

}

