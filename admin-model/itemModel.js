var connection = require('../conn');
var Promise = require('promise');


module.exports.getAllItems = function (condition) {
    return new Promise(function (resolve, reject) {

        // var sql = "SELECT * FROM `rm_food_item`";

        var sql = "SELECT \
                    rm_food_item.`id`,rm_food_item.`item_name`,rm_food_item.`item_detail`,\
                    rm_item_image.`image_name`,rm_item_image.`is_main`,rm_item_image.`id` AS 'i_id',rm_item_image.`item_id`,rm_category.`category_name`\
                FROM \
                    rm_food_item \
                    INNER JOIN rm_category ON rm_category.id = rm_food_item.category_id \
                    INNER JOIN rm_item_image ON rm_item_image.item_id = rm_food_item.id \
                    where rm_item_image.is_main=1";
        connection.query(sql, condition, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });




}

module.exports.slide_images = function (condition) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT id,item_id, image_name FROM `rm_item_image` WHERE is_main = 0 ";
        connection.query(sql, condition, function (err, results) {
            if (err) {
console.log(err);
                reject(Error(err));
            } else {
                resolve(results);
            }
        });
    });
}




module.exports.item_getById = function (condition) {
    return new Promise(function (resolve, reject) {

        /* var sql = "SELECT \
                    rm_food_item.`id`,rm_food_item.`item_name`,rm_food_item.`item_detail`,\
                    rm_item_image.`image_name`,rm_item_image.`id` AS 'i_id',rm_category.`category_name`\
                FROM \
                    rm_food_item \
                    INNER JOIN rm_category ON rm_category.id = rm_food_item.category_id INNER JOIN rm_item_image ON rm_item_image.item_id = rm_food_item.id  \
                    WHERE rm_food_item.id = ?";  */

        var sql2 = "SELECT rm_food_item.`id`,rm_food_item.`item_name`,rm_food_item.`item_detail`,\
                                rm_item_image.`id` AS 'i_id',rm_item_image.`image_name`,rm_category.`category_name`,rm_category.`id` AS 'c_id' \
                                FROM rm_food_item INNER JOIN rm_item_image ON rm_food_item.id = rm_item_image.item_id INNER JOIN rm_category ON rm_category.id = rm_food_item.category_id \
                                WHERE rm_item_image.id = ? "
        connection.query(sql2, condition, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });




}



module.exports.updateItem = function ([data, condition]) {
    return new Promise(function (resolve, reject) {

        var sql = "UPDATE rm_food_item SET ? WHERE id = ?";
        connection.query(sql, [data, condition], function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });




}



module.exports.updateItemImage = function ([data, condition]) {
    return new Promise(function (resolve, reject) {

        var sql = "UPDATE rm_item_image SET ? WHERE id = ? ";
        connection.query(sql, [data, condition], function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });




}


module.exports.categoryId = function (data) {
    return new Promise(function (resolve, reject) {

        var sql2 = "SELECT `id`,`category_name` FROM `rm_category`";
        connection.query(sql2, data, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {


                resolve(results);



            }



        });

    });

}


module.exports.addItems = function (data) {
    return new Promise(function (resolve, reject) {

        var sql = "INSERT INTO `rm_food_item` SET ?";

        connection.query(sql, data, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {


                resolve(results);



            }



        });

    });



}


module.exports.addItemsImages = function (data) {
    return new Promise(function (resolve, reject) {


        var sql2 = "INSERT INTO `rm_item_image` SET ?";
        connection.query(sql2, data, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {


                resolve(results);



            }



        });

    });



}



module.exports.deleteItem = function (condition) {
    return new Promise(function (resolve, reject) {

        var sql = "DELETE FROM rm_food_item WHERE id = ?";
        connection.query(sql, condition, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });

}



module.exports.deleteItemImage = function (condition) {
    return new Promise(function (resolve, reject) {



        var sql2 = "DELETE FROM rm_item_image WHERE id = ?";
        connection.query(sql2, condition, function (err, results) {


            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });



}



module.exports.getAllImages = function (condition) {
    return new Promise(function (resolve, reject) {

        var sql = "SELECT * FROM `rm_item_image` WHERE is_main = ? AND item_id = ? ";

        connection.query(sql, condition, function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });




}



module.exports.updateOneImage = function ([data, condition]) {
    return new Promise(function (resolve, reject) {

        var sql = "UPDATE rm_item_image SET ? WHERE id = ? ";

        connection.query(sql, [data, condition], function (err, results) {

            if (err) {

                reject(Error(err));

            } else {

                resolve(results);

            }



        });

    });




}





