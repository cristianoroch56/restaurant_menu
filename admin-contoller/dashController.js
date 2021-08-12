
var dashModel = require('../admin-model/dashModel');
var session = require('express-session');
var express = require("express");
var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }


}));




module.exports.dashboard = async function (req, res, next) {


    var user = req.session.user,
        userId = req.session.userId;

    console.log('ddd=' + userId);

    if (userId == null) {
        res.redirect("login");
        return;
    } else {

        try {

            let result1 = await dashModel.dash_mdl()

            let results = await dashModel.category_rows_count()

            const numRows = results[0].NUMBER

            let result = await dashModel.items_rows_count()

            const numIitems = result[0].NUMBER

            res.render('dashboard.ejs', { std: result1, rows: numRows, itemsRows: numIitems, messages: req.flash('successMessage') });

        } catch (err) {
            
            next(err);

        }

    }
}


exports.errorPage = function(req, res){

    res.render('404.ejs');
 }