var session = require('express-session');
var express=require("express");
var app = express();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
  

}));
 



module.exports.loggout=function(req,res){
    
    req.session.destroy(function(err) {
       
    
        res.redirect("login");
    
    })
 

};