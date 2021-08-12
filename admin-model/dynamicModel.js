var connection = require('../conn');
var express=require("express");
var Promise = require('promise');



module.exports.show_on =function(){

    return new Promise(function(resolve, reject){
  
        connection.query('SELECT * FROM rm_admin' ,function(err, result){
          
            if (err) {
            
                reject(Error(err));
        
            }else{

                resolve(result);

            }
       
        
          
        });
  
      
    });
  
    
   
};

