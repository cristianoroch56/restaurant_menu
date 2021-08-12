var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wappnet@123',
  database : 'restaurant_menu'
});
connection.connect(function(err){
if(!err) {
    console.log("connected!");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection; 


//sql Methods

//FIND_IN_SET()
//JSON_ARRAYAGG()
//GROUP BY()....HAVING CLAUSE
//GROUP_CONCAT
//ORDER BY ASC/DEC



//moment Date Different..

// var a = moment('7/11/2010','DD-MM-YYYY');
// var b = moment('10/11/2010','DD-MM-YYYY');
// var diffDays = b.diff(a, 'days');
// alert(diffDays);


// what hoisting is...
// var name, email;

//    name = "hii";
//    email = "hi@gmail.com";

//impo logic 

// $company_asset_ids = Asset::where('company_id', $company_id)->where('asset_type', 'Vehicle asset')->where('status', 'Enabled')->pluck('id')->toArray();

        // $insurance_assets = Vehicle_Insurance::select('asset_id', 'status')
        //     ->where('status', '!=', 'Expired')
        //     ->groupBy('asset_id', 'status')
        //     ->havingRaw('COUNT(*)=2')->get()->toArray();

        // foreach ($insurance_assets as $items) { 

        //     foreach (array_keys($company_asset_ids, $items['asset_id']) as $key) {
        //         unset($company_asset_ids[$key]);
        //     }
        // }

        // $this->data['asset_data'] = $asset_data = Asset::where('asset_type', 'Vehicle Asset')
        //     ->where('status', 'Enabled')
        //     ->whereIn('id', $company_asset_ids)
        //     ->get(['id', 'asset_1', 'name'])->toArray();



        


  

        //SELECT `user_id`, GROUP_CONCAT(`balance`) FROM `leave_master` WHERE `user_id`=1 ORDER BY `leave_category_id` ASC

                //SELECT * FROM `leave_master` ORDER BY `user_id` ASC, `leave_category_id` ASC


//use const. let. var.
//not to use const in  iteration  Ex= for loop, forEach loop..etc..
//that time use let..
//