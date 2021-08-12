var connection = require('../conn');
var Promise = require('promise');

var multer = require('multer');
var fs  = require('fs');
var path = require('path');



module.exports.getAllCategory = function(){
    return new Promise(function(resolve, reject){

        var sql = "SELECT * FROM `rm_category`";
        connection.query(sql, function(err, results){
        
            if (err) {
               
                reject(Error(err));
                
            }else{

                resolve(results);

            }
         
            

        });

    });


}


module.exports.category_getById = function(condition){
    return new Promise(function(resolve, reject){

        var sql = "SELECT * FROM `rm_category` WHERE ? ";
        connection.query(sql,condition, function(err, results){
        
            if (err) {
               
                reject(Error(err));
                
            }else{

                resolve(results);

            }
         
            

        });

    });




}

module.exports.updateCategory = function([data, condition]){
    return new Promise(function(resolve, reject){

        var sql = "UPDATE rm_category SET ? WHERE id = ?";
        connection.query(sql,[data, condition], function(err, results){
        
            if (err) {
               
                reject(Error(err));
                
            }else{

                resolve(results);

            }
         
            

        });

    });




}



module.exports.addCategory = function(data){
    return new Promise(function(resolve, reject){

        var sql = "INSERT INTO `rm_category` SET ?";
        connection.query(sql, data, function(err, results){
        
            if (err) {
               
                reject(Error(err));
                
            }else{
               
                resolve(results);

            }
         
            

        });

    });



}


module.exports.deleteCategory = function(condition){
    return new Promise(function(resolve, reject){

        var sql = "DELETE FROM rm_category WHERE id = ?";
        connection.query(sql,condition, function(err, results){
        
            if (err) {
               
                reject(Error(err));
                
            }else{
               
                resolve(results);

            }
         
            

        });

    });



}