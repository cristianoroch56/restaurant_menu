var adminModel = require('../admin-model/adminModel');
var upload = require('../multer/profileImage_storage');
var fs = require('fs');
var path = require('path');

var session = require('express-session');
var express = require("express");

var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }


}));



module.exports.edit_profile = function (req, _res, next) {

    //var user =  req.session.user,
    userId = req.session.userId;
    console.log('ddd=' + userId);

    if (userId == null) {

        _res.redirect("login");
        return;

    } else {

        adminModel.check_user({ id: userId }).then(function (results) {

            _res.render('edit_profile.ejs', { std: results, messages: req.flash('successMessage'), message: req.flash('ErrorMessage') });

        }).catch(function (err) {

            next(err);
        });



    }

};




//---------------------------------------------------------Update profile-----------------------------------------------------------------//



const pify = require('pify')

const upload_new = pify(upload)

module.exports.update_new = async function (req, res, next) {

    try {

        await upload_new(req, res)

        if (!req.file) {

            var params = {
                "name": req.body.name,
                "email": req.body.email,

            };


            let results = await adminModel.profile_update([params, req.body.id])

            req.flash('successMessage', 'Profile detail successfully updated!');
            res.redirect('edit_profile');

        } else {


            if (req.body.old_myFile !== '') {

                fs.unlink(`public/images/upload_images/${req.body.old_myFile}`, function () {
                    console.log("removed");

                });

            }

            var params2 = {
                "name": req.body.name,
                "email": req.body.email,
                "profile_image": req.file.filename
            };

            let results = await adminModel.profile_update([params2, req.body.id])


            req.flash('successMessage', 'Profile detail successfully updated!');
            res.redirect('edit_profile');



        }



    } catch (err) {


        if (req.fileValidationError) {
            req.flash('ErrorMessage', req.fileValidationError);
            res.redirect('edit_profile');
            return;

        }

        next(err);


    }

}; 