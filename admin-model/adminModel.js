var connection = require('../conn');
var Promise = require('promise');



/*---------------------------------------------------login------------*/


module.exports.check_user = function (condition) {
    return new Promise(function (resolve, reject) {

        var sql = "SELECT * FROM rm_admin WHERE ?";
        connection.query(sql, condition, function (err, results) {
            if (err) {

                reject(Error(err));
            } else {

                resolve(results);

            }
        })

    });



}
//



/*----------------------------------------email_exit_for_Forgot-password------------*/

module.exports.email_exit = function (condition) {
    return new Promise(function (resolve, reject) {

        var sql = "SELECT * FROM `rm_admin`";
        connection.query(sql, condition, function (err, results) {
            if (err) {

                reject(Error(err));
            } else {
                resolve(results);
            }

        })

    });



}


/*---------------------------------------------------change-password------------*/


module.exports.change_pass = function ([data, condition]) {

    return new Promise(function (resolve, reject) {

       
        connection.query("UPDATE `rm_admin` SET ? Where id = ?", [data, condition], function (err, results) {

            if (err) {
                
                reject(Error(err));
            } else {

                resolve(results);
            }
        });


    });

}


module.exports.check_token = function (condition) {
    return new Promise(function (resolve, reject) {

        connection.query("SELECT * FROM `rm_admin` WHERE id =  ?", condition, function (err, results) {

            if (err) {
                
                reject(Error(err));

            } else {

                resolve(results);
            }
        });

    });



};


module.exports.update_token = function ([data, condition]) {

    return new Promise(function (resolve, reject) {

        connection.query("UPDATE `rm_admin` SET ? Where email = ?", [data, condition], function (err, result) {

            if (err) {
             
                reject(Error(err));

            } else {

                resolve(result);
            }
        });
    });
};

/*---------------------------------------------------profile--------------*/


module.exports.profile_get = function () {
    return new Promise(function (resolve, reject) {

        var sql = "SELECT * FROM `rm_admin`";
        connection.query(sql, function (err, results) {

            if (err) {
                reject(Error(err));
            } else {

                resolve(results);
            }
        });


    });

}


module.exports.profile_update = function ([data, condition]) {
    return new Promise(function (resolve, reject) {

        var sql = "UPDATE rm_admin SET ? WHERE id = ?";
        connection.query(sql, [data, condition], function (err, results) {

            if (err) {
               
                reject(Error(err));
            } else {

                resolve(results);
            }
        });


    });

}


