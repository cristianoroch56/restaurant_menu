var adminModel = require('../admin-model/adminModel');

var nodemailer = require('nodemailer');
var moment = require('moment');
var crypto = require('crypto');
const bcrypt = require('bcrypt');




module.exports.forgot_password = function (req, res, next) {

  var email = req.body.email;


  adminModel.email_exit({ email: email }).then(function (results) {


    if (results.length > 0) {

      if (email == results[0].email) {

        console.log(email == results[0].email);

        var token = crypto.randomBytes(32).toString('hex');
        var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');

        var params1 = {

          "resetPasswordToken": token,
          "resetPasswordExpires": mysqlTimestamp
        }


        adminModel.update_token([params1, req.body.email]).then(function (result) {



        }).catch(function (err) {
         
          next(err);
        
        })

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'nishit.wappnet@gmail.com',
            pass: 'wappnet@123'
          }
        });



        var mailOptions = {
          from: 'nishit.wappnet@gmail.com',
          to: req.body.email,
          subject: 'Sending Email using Node.js',
          html: `<p style='font-weight:bold'>Hello ${token} user ${results[0].id} ${results[0].name} Click <a href="<%= baseURL %>admin/reset_password/${token}" >here</a>to reset your password</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            req.flash('successMessage', 'Email Successfully Sent !');
            res.redirect('/admin/login');
            res.end();
          }
        });

        //res.render('login.ejs');

      } else {


        console.log("invalid email");

        var message = 'Invalid Email !';
        res.render('login.ejs', { message: message });

      }

    }
  }).catch(function (err) {

    next(err);
  })

}



module.exports.reset_password_get = function (req, res, next) {


  console.log(req.params.token);

  adminModel.check_token(1).then(function (results) {

    if (req.params.token == results[0].resetPasswordToken) {

      console.log("a2");

      res.render('reset_password.ejs', { std: results[0] });

    } else {

      console.log("expird link");
      var message = 'Oops! Reset Password link is expired!';
      res.render('login.ejs', { message: message });

    }

  }).catch(function (err) {

    next(err);
  })



};


module.exports.reset_password_post = function (req, res, next) {


  var mysqlTimestamp_now = moment(Date.now() + 3600000).format('YYYY-MM-DD HH:mm:ss');

  var user_id = req.body.id;

  console.log(mysqlTimestamp_now);
  console.log(user_id);


  adminModel.check_token(req.body.id).then(function (results) {
    // console.log( moment( results[0].resetPasswordExpires).format('YYYY-MM-DD HH:mm:ss'));

    var resetPasswordExpires = moment(results[0].resetPasswordExpires).format('YYYY-MM-DD HH:mm:ss');

    console.log(resetPasswordExpires);

    console.log(mysqlTimestamp_now < resetPasswordExpires);

    //  var d = "0000-00-00 00:00:00";

    if (mysqlTimestamp_now < resetPasswordExpires) {

      var params2 = {

        "resetPasswordToken": '',
        "resetPasswordExpires": undefined

      }


      adminModel.update_token([params2, req.body.email]).then(function (results) {



        console.log(JSON.stringify(results));


        const saltRounds = 10;

        var password = req.body.password;

        var email = req.body.email;

        bcrypt.hash(password, saltRounds, function (err, hash_new_password) {

          var params3 = {
            "password": hash_new_password
          }

          adminModel.change_pass([params3, req.body.id]).then(function (results) {

            //console.log("post3");

            res.redirect('login');


          }).catch(function (err) {

            next(err);
          })



        });

      }).catch(function (err) {

        next(err);
      })


    } else {

      var message = 'Oops!Password reset token is invalid or has expired !';
      res.render('login.ejs', { message: message });

    }


  }).catch(function (err) {

    next(err);
  })



};



// what hoisting is...
// var name, email;

//    name = "hii";
//    email = "hi@gmail.com";

