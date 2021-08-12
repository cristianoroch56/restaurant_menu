let categoryModel = require('../api-model/categoryModel');


module.exports.get_all_category = async function(req, res){

    try {
            let results = await categoryModel.get_all_category_list()

            const data = results.map((results) =>{

                return {
                    id : results.id,
                    category_name : results.category_name,
                    category_detail : results.category_detail,
                    category_image : req.protocol + '://' + req.get('host')  + '/images/category_images/'+results.category_image
                }
            });  
            
            res.json({
                status: "success",
                message: "All Category food !",
                data : data
            });
    
    } catch(err){
        
            res.json({
                'status': 'error',
                'message': 'Error Occurred. Try Again!'
            
            });
            return;
   
    }


}