var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

var flash = require('connect-flash');

app.set('views', path.join(__dirname, 'views/admin'));
app.set('view engine', 'ejs');




app.use('/public/asset/', express.static(__dirname + '/public'));


app.locals.baseURL = "http://68.183.80.36:3000/"
app.locals.siteURL = "http://68.183.80.36:3000/admin/"


app.use('/images/upload_images', express.static('public/images/upload_images'));

app.use('/images/category_images', express.static('public/images/category_images'));

app.use('/images/items_images', express.static('public/images/items_images'));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));


app.use(function (req, res, next) {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, private"); // HTTP 1.1.
    res.set("Pragma", "no-cache");
    res.set("Expires", "0"); // HTTP 1.0.
    next()

    //res.redirect('/');
});

app.use(flash());


let admin_routes = require('./admin-routes');
let api_routes = require('./api-routes');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

/*app.get('/', function(req, res){
 
    res.send(JSON.stringify({
        status:"HELLO REST_API NODEJS USER",
        message: "REST_API nodeJS"
    }));

}); */

app.use('/admin', admin_routes);
app.use('/api', api_routes);

/*app.all('*', function(req, res) {                // for handling unknown routes..
    res.redirect("http://localhost:3000/admin/login");
  

});*/

app.use(function (err, req, res, next) {     // middleware for err handling.... render 404 page // every next(err) redirect this view
   
    if (err) {

        res.render('404.ejs');

    }

});

app.use(function (req, res, next) {
    if (req.method != "OPTIONS") {
        res.cookie('XSRF-TOKEN', { httpOnly: false, Path: "/" });
    }
    return next();
});

app.listen(3000, function () {
    console.log('Node server is running..');
});


module.exports = app;