var adminModel = require('../admin-model/adminModel');
const bcrypt = require('bcrypt');
var express = require("express");
var app = express();
var session = require('express-session');



app.use(session({

   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 3600000 }



}));


module.exports.primary = function (req, res) {

   message = '';

   res.render('login.ejs', { message: message, messages: req.flash('SuccessMessage')  });


}




module.exports.authenticate = function (req, res, next) {

   var message = '';

   if (req.method == "POST") {

      var post = req.body;
      var email = post.email;
      var password = post.password;



      adminModel.check_user({ email: email }).then(function (results) {

         if (results.length === 0) {

            var message = 'Invalid username !';
            res.render('login.ejs', { message: message });

            return;
         }

         if (results.length > 0) {



            if (bcrypt.compareSync(password, results[0].password) && email == results[0].email) {

               req.session.userId = results[0].id;
               req.session.user = results[0];

               res.redirect('dashboard');

            } else {

               var message = 'Invalid username or password';
               res.render('login.ejs', { message: message });

            }

         }

      }).catch(function (err) {
         next(err);

      })

   } else {


      res.render('login.ejs', { message: message });
   }

};




/*-----------------------------------change_password-----------------------------------------*/

module.exports.change_password = function (req, res) {

   var user = req.session.user,
      userId = req.session.userId;

   if (userId == null) {
      res.redirect("/admin/login");
      return;
   } else {

      res.render('change_password');
   }



};



module.exports.update_password = function (req, res, next) {

   var user = req.session.user,
      userId = req.session.userId;

   if (userId == null) {
      res.redirect("login");
      return;
   } else {



      var new_password = req.body.password;
      var oldpassword = req.body.old_password;

      console.log(oldpassword);


      adminModel.email_exit().then(function (results) {

         if (results.length > 0) {



            console.log(bcrypt.compareSync(oldpassword, results[0].password));

            if (bcrypt.compareSync(oldpassword, results[0].password)) {

               // console.log(oldpassword == results[0].password);

               const saltRounds = 10;


               bcrypt.hash(new_password, saltRounds, function (err, hash_password) {

                  var params = {

                     "password": hash_password
                  };

                  adminModel.change_pass([params, req.body.id]).then(function (results) {


                     req.flash('successMessage', 'Successfully Updated Password!');
                     res.redirect('dashboard');

                  }).catch(function (err) {

                     next(err);
                  })

               });

            } else {

               var message = 'Incorrect current password!';
               res.render('change_password.ejs', { message: message });

            }

         } else {

            var message = 'Something Went Wrong !';
            res.render('change_password.ejs', { message: message });

         }

      }).catch(function (err) {
         var message = 'Something Went Wrong !';
         res.render('change_password.ejs', { message: message });
         console.log(err);

      });





   }

}
