var itemModel = require('../admin-model/itemModel');
var dynamicModel = require('../admin-model/dynamicModel');
var categoryModel = require('../admin-model/categoryModel');

const upload = require('../multer/storage');




var moment = require('moment');
const upload_single = require('../multer/item_storage');

var session = require('express-session');
var express = require("express");
var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }


}));



module.exports.get_all_items = function (req, res, next) {

    userId = req.session.userId;

    if (userId == null) {
        res.redirect("login");
        return;


    } else {

        dynamicModel.show_on().then(function (result) {

            itemModel.getAllItems().then(function (results) {
                
                    itemModel.slide_images().then(function (result2) {

                    res.render('food_items.ejs', { jsn: results,rows :result2, std: result, messages: req.flash('successMessage'), message: req.flash('ErrorMessage') })
                
                }).catch(function (err) {

                    console.log("a1" + err);

                })
            }).catch(function (err) {

                console.log("a2" + err);

            })

        }).catch(function (err) {
            console.log("a3" + err);

        })


    }

}




module.exports.get_one_item = async function (req, res, next) {
    userId = req.session.userId;



    if (userId == null) {
        res.redirect("login");
        return;


    } else {

        try {

            let result = await dynamicModel.show_on()

            let result2 = await categoryModel.getAllCategory()

            let results = await itemModel.item_getById(req.params.id)

            if (results <= 0) {

                res.redirect('/admin/food_items');

            } else {

                res.render('edit_items.ejs', { jsn: results[0], std: result, jsp: result2, message: req.flash('ErrorMessage') })

            }


        } catch (err) {

            next(err);
        }



    }




}




module.exports.update_item = async function (req, res, next) {
    userId = req.session.userId;



    if (userId == null) {
        res.redirect("login");
        return;


    } else {

        upload_single(req, res, async function (err) {

            if (err) {


                req.flash('ErrorMessage', req.fileValidationError);
                return res.redirect('/admin/edit_items/:id');


            } else {


                try {

                    var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                    if (req.file == null || req.file == undefined) {

                        var params = {

                            'item_name': req.body.item_name,
                            'item_detail': req.body.item_detail,
                            'category_id': req.body.category_id,
                            'created_at': mysqlTimestamp,
                            'created_ip': ip,
                            'updated_ip': ip

                        }


                        let results = await itemModel.updateItem([params, req.params.id])


                        req.flash('successMessage', 'Item Successfully Updated!');
                        res.redirect('/admin/food_items');


                    } else {

                        var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
                        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                        var params2 = {

                            "item_name": req.body.item_name,
                            "item_detail": req.body.item_detail,
                            'created_at': mysqlTimestamp,
                            'updated_ip': ip


                        }

                        var params3 = {

                            "image_name": req.file.filename,
                            "created_at": mysqlTimestamp,
                            "updated_ip": ip

                        }

                        let results = await itemModel.updateItem([params2, req.params.id])





                        let result = await itemModel.updateItemImage([params3, req.params.image_id])

                        res.redirect('/admin/food_items');

                    }



                } catch (err) {

                    next(err);

                }


            }

        })





    }




}



module.exports.add_new_items = async function (req, res, next) {

    userId = req.session.userId;

    if (userId == null) {
        res.redirect("login");
        return;


    } else {


        try {


            let result = await dynamicModel.show_on()

            let results = await itemModel.categoryId()

            res.render('add_items.ejs', { std: result, jsn: results, message: req.flash('ErrorMessage') })

        } catch (err) {

            next(err);

        }


    }

}




module.exports.post_new_items = async function (req, res, next) {

    userId = req.session.userId;

    if (userId == null) {
        res.redirect("login");
        return;


    } else {


        upload(req, res, async function (err) {

            if (err) {

                req.flash('ErrorMessage', req.fileValidationError);
                res.redirect('/admin/food_items');

                return;


            } else {



                try {


                    var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                    var params = {

                        "item_name": req.body.item_name,
                        "item_detail": req.body.item_detail,
                        "category_id": req.body.category_id,
                        'created_at': mysqlTimestamp,
                        'created_ip': ip,
                        'updated_ip': ip

                    }



                    let result = await dynamicModel.show_on()

                    let results = await itemModel.addItems(params)

                    const item_id = results.insertId;
                    console.log(JSON.stringify(req.files.myFile.length));
                    const jsn = req.files.myFile

                    const file_name = jsn.map((jsn) => {

                        return jsn.filename


                    });

                    //console.log(file_name);

                    for (i = 0; i < file_name.length; i++) {

                        // console.log(file_name[i])

                        var params2 = {

                            "item_id": item_id,
                            "image_name": file_name[i],
                            "is_main": 1,
                            'created_at': mysqlTimestamp,
                            'created_ip': ip,
                            'updated_ip': ip
                        }



                        let data = await itemModel.addItemsImages(params2)

                    }
                    const jsp = req.files.myFiles;
                    console.log(JSON.stringify(req.files.myFiles.length));
                    const file = jsp.map((jsp) => {

                        return jsp.filename


                    });



                    for (i = 0; i < file.length; i++) {

                        //console.log(file[i])


                        var params3 = {

                            "item_id": item_id,
                            "image_name": file[i],
                            "is_main": 0,
                            'created_at': mysqlTimestamp,
                            'created_ip': ip,
                            'updated_ip': ip
                        }




                        let data2 = await itemModel.addItemsImages(params3)

                    }
                    //res.setHeader('Content-type' , false);
                    req.flash('successMessage', 'New Item Added!');
                    res.redirect('/admin/food_items');
                    res.end();









                } catch (err) {


                    next(err);

                }

            }


        })






    }

}



module.exports.delete_item = async function (req, res, next) {

    userId = req.session.userId;



    if (userId == null) {
        res.redirect("login");
        return;


    } else {



        try {


            let result = await itemModel.deleteItemImage(req.query.id)

            req.flash('successMessage', 'Item Successfully Deleted!');
            res.redirect('/admin/food_items')

        } catch (err) {

            next(err);

        }




    }

}




module.exports.delete_image = async function (req, res) {

    userId = req.session.userId;



    if (userId == null) {


        res.json({
            status: false,
            message: 'Image successfully deleted'
        })
        return;


    } else {



        try {



            let result = await itemModel.deleteItemImage(req.body.id)
           
           // res.send( { status: true, message: 'Image Succesfully Deleted !' } );
            res.json({
              status: true,
             message: 'Image successfully deleted'
           });

        } catch (err) {
            //res.send( { status: false, message: 'Something went Wrong !' } );
            res.json({
                status: false,
                message: 'Something Went Wrong !'
            });

        }




    }

}


module.exports.get_all_images = async function (req, res, next) {
    userId = req.session.userId;



    if (userId == null) {
        res.redirect("login");
        return;


    } else {


        try {


            let result = await dynamicModel.show_on()

            var is_main = 0;
            let id = req.params.id;


            let results = await itemModel.getAllImages([is_main, id])

           
            res.render('item_images', { std: result, data_id: id, jsn: results, message: req.flash('ErrorMessage') })
            res.end();


        } catch (err) {

            next(err);


        }
    }




}



module.exports.update_one_image = async function (req, res, next) {
    userId = req.session.userId;



    if (userId == null) {

        res.json({
            status: false,
            message: 'Something went wrong !'
        })
        return;


    } else {


        upload_single(req, res, async function (err) {

            if (err) {

                res.json({
                    status: false,
                    message: 'Something Went Wrong !'
                })
                return;

            } else {

                try {


                    var params = {

                        'image_name': req.file.filename
                    }


                    let results = await itemModel.updateOneImage([params, req.body.id])

                    res.json({
                        status: true,
                        message: 'Image successfully updated'
                    })
                    return;

                } catch (err) {



                    res.json({
                        status: false,
                        message: 'Error while updating !'
                    })
                    return;
                }


            }

        });




    }




}


var upload_multiple = require('../multer/multipleItem_storage');


module.exports.insert_item_images = function (req, res, next) {




    upload_multiple(req, res, function (err) {

        if (err) {


            req.flash('ErrorMessage', req.fileValidationError);
            res.redirect('/admin/food_items');

            return;

        }

        var mysqlTimestamp = moment(Date.now() + 2 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        for (let i = 0; i < req.files.length; i++) {

            var params = {

                "item_id": req.body.item_id,
                "image_name": req.files[i].filename,
                "is_main": 0,
                'created_at': mysqlTimestamp,
                'created_ip': ip,
                'updated_ip': ip

            }

            itemModel.addItemsImages(params).then(function (results) {

                res.redirect('item_images/' + req.body.item_id);

            }).catch(function (err) {

                next(err);
            })
        }

    })


}






