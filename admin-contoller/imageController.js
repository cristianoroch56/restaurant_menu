var multer = require('multer');
var fs = require('fs');
var path = require('path');


var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
        callback(null, "public/images/upload_images");
        },
        filename: function (req, file, callback) {
        // save file with current timestamp + user email + file extension
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        // callback(null,(file.originalname));
    }
    
    
    })
}) 


module.exports.upload_single = function(req, res , next){


   //return upload.single('myFile')(req, res, next)
   const upload = multer({
    storage: storage
  }).fields([{name: "pp"}, {name: "banner"}]);
   var upload_single = upload.single('files')

   return upload_single(req, res, next)



}


//var upload_single = multer({ storage: storage }).single('myFile');

//var upload_multiple = multer({ storage: storage }).array('myFiles', 5);



module.exports.upload_multiple = function(req, res , next){


    

   //return upload.single('myFile')(req, res, next)
   var upload_multiple = upload.array('imageFile', 5);

   return upload_multiple(req, res , next)


}
