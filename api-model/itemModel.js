var connection = require('../conn');
var Promise = require('promise');




module.exports.get_item_by_category = function(condition){
    return new Promise(function(resolve, reject){
  
        var sql="SELECT \
                    rm_food_item.`id`,rm_food_item.`item_name`,rm_food_item.`item_detail`,\
                    rm_item_image.`image_name`\
                FROM \
                    rm_food_item \
                    INNER JOIN rm_item_image ON rm_food_item.id = rm_item_image.item_id AND rm_item_image.is_main = 1 \
                    WHERE rm_food_item.category_id= ? "; 
       
        connection.query(sql, condition, function (err, results){
            if (err) {
                
              reject(Error(err));
            
            }else{
                
              resolve(results);
            }
          
            

        });
    
    });
    
  
}



module.exports.item_list = function(condition){
    return new Promise(function(resolve, reject){
  
        var sql="SELECT \
                     rm_food_item.`id`, rm_food_item.`item_name`,rm_food_item.`item_detail`, \
                     JSON_ARRAYAGG(rtm.`image_name`) as image_name\
                FROM \
                    rm_food_item \
                    INNER JOIN rm_item_image rtm ON rm_food_item.id = rtm.item_id \
                    WHERE rm_food_item.id= ? GROUP BY rm_food_item.`id`, rm_food_item.`item_name` "; 
       
        connection.query(sql, condition, function (err, results){
            if (err) {
               
              reject(Error(err));
            }else{
                
               resolve(results);
            }
          
        });
  
    });
    
  
  
}



