var connection = require('../conn');
var Promise = require('promise');

/*---------------------------------------------------Dashboard------------*/

module.exports.dash_mdl = function() {
    return new Promise(function(resolve, reject) {

        var sql="SELECT * FROM rm_admin"; 
        connection.query(sql, function (err, results) {
          if (err) {
             
           reject(Error(err));
          }
      
           resolve(results);
        
  
        })

    });
    


}

module.exports.category_rows_count = function() {
    return new Promise(function(resolve, reject) {

        var sql="SELECT COUNT(*) AS NUMBER FROM rm_category"; 
        connection.query(sql, function (err, results) {
          if (err) {
             
           reject(Error(err));
          }
      
           resolve(results);
           

  
        })

    });
    


}



module.exports.items_rows_count = function() {
    return new Promise(function(resolve, reject) {

        var sql="SELECT COUNT(*) AS NUMBER FROM rm_food_item"; 
        connection.query(sql, function (err, results) {
          if (err) {
             
           reject(Error(err));
          }
      
           resolve(results);
        
  
        })

    });
    


}


