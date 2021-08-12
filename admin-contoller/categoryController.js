var categoryModel = require('../admin-model/categoryModel');
var dynamicModel = require('../admin-model/dynamicModel');

const upload = require('../multer/category_storage');


var moment = require('moment');
var session = require('express-session');
var express = require("express");
var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }


}));



module.exports.get_all_category = async function (req, res, next) {

    userId = req.session.userId;



    if (userId == null) {
        
        res.redirect("login");
        return;


    } else {



        try {
            let result = await dynamicModel.show_on()

            let results = await categoryModel.getAllCategory()

            res.render('food_category.ejs', { jsn: results, std: result, enable: 'Enabled', disable: 'Disabled', messages: req.flash('successMessage') , message : req.flash('ErrorMessage') })

        } catch (err) {

            next(err);
        }


    }

}






module.exports.edit_category = async function (req, res, next) {
    userId = req.session.userId;



    if (userId == null) {
        res.redirect("login");
        return;


    } else {

        try {

            let result = await dynamicModel.show_on()

            let results = await categoryModel.category_getById({ id: req.params.id })
           
            if (results <= 0) {

                res.redirect('/admin/food_category');

            } else {
                
                res.render('edit_category.ejs', { jsn: results[0], std: result })
            }


        } catch (err) {

            next(err);
        }



    }




}




module.exports.update_category = function (req, res, next) {
    userId = req.session.userId;
  


    if (userId == null) {
        res.redirect("login");
        return;


    } else {




        upload(req, res, function (err) {

            if (err) {
                console.log(req.fileValidationError);
                req.flash('ErrorMessage', req.fileValidationError);
                //res.locals.messages = req.flash();
                res.redirect('/admin/edit_category/:id');
                //throw err;
                return;
            }


            console.log(!req.file)
            console.log(req.file == '')
            var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;


            if (!req.file) {
                var param = {

                    'category_name': req.body.category_name,
                    'category_detail': req.body.category_detail,

                    'created_at': mysqlTimestamp,
                    'created_ip': ip,
                    'updated_ip': ip

                }
               
                console.log("hiii");
                console.log(req.params.id);
                categoryModel.updateCategory([param, req.params.id]).then(function (results) {


                    req.flash('successMessage', 'Category successfully updated!');
                    res.redirect('/admin/food_category');


                }).catch(function (err) {

                    next(err);

                })

            } else {

                var params = {

                    'category_name': req.body.category_name,
                    'category_detail': req.body.category_detail,
                    'category_image': req.file.filename,
                    'created_at': mysqlTimestamp,
                    'created_ip': ip,
                    'updated_ip': ip

                }

               
                categoryModel.updateCategory([params, req.params.id]).then(function (results) {

                    res.redirect('/admin/food_category');


                }).catch(function (err) {

                    next(err);



                })
            }

        });

    }




}



module.exports.add_new_category = async function (req, res, next) {

    userId = req.session.userId;
    


    if (userId == null) {
        res.redirect("login");
        return;


    } else {



        try {

            let result = await dynamicModel.show_on()

            res.render('add_category.ejs', { std: result,message : req.flash('ErrorMessage') })

        } catch (err) {

            next(err);

        }




    }

}





module.exports.post_new_category = function (req, res ,next) {

    userId = req.session.userId;



    if (userId == null) {
        res.redirect("/admin/login");
        return;


    } else {




        upload(req, res, function (err) {

            if (err) {
                console.log(req.fileValidationError);
                req.flash('ErrorMessage', req.fileValidationError);
                res.redirect('/admin/add_category');
                //throw err;
                return;
            }

            var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            var params = {

                'category_name': req.body.category_name,
                'category_detail': req.body.category_detail,
                'category_image': req.file.filename,
                'created_at': mysqlTimestamp,
                'created_ip': ip,
                'updated_ip': ip

            }

           

            categoryModel.addCategory(params).then(function (results) {

                req.flash('successMessage', 'New Category Added!');
                res.redirect('/admin/food_category')


            }).catch(function (err) {

                next(err);
            })




        });





    }



}


module.exports.delete_category = async function (req, res, next) {

    userId = req.session.userId;
    


    if (userId == null) {
        res.redirect("login");
        return;


    } else {



        try {

            let result = await dynamicModel.show_on()

            let results = await categoryModel.deleteCategory(req.query.id)

            res.redirect('food_category')

        } catch (err) {

            next(err);
        }




    }

}



module.exports.status_chng = async function (req, res, next) {

    try {

        var params = {

            "status": req.query.status

        }

        let results = await categoryModel.updateCategory([params, req.query.id])

        res.redirect('food_category')

    } catch (err) {

        next(err);


    }


}; 
