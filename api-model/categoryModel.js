var connection = require('../conn');
var Promise = require('promise');




module.exports.get_all_category_list = function(condition){
    return new Promise(function(resolve, reject){

        var sql="SELECT `id`,`category_name`, `category_detail` , `category_image` FROM `rm_category` WHERE status= 'Enabled'"; 
       
        connection.query(sql, condition, function (err, results){
            if (err) {
             
                reject(Error(err));
            
            }else{
                
                resolve(results);
            }
           
    
        });

    });
    


}

