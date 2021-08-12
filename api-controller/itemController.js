let itemModel = require('../api-model/itemModel');


//-------------------------------------------------------------get_item_by_category-----------------------------------//


module.exports.get_item_byCategory = async function(req, res){


    try {
            if (!req.body.id ) {
                res.json({
                    status: "error",
                    message: "items not found !"
                });
            return;
            }

            let results = await itemModel.get_item_by_category(req.body.id)
        

            const data = results.map((results) =>{

                return {
                    id : results.id,
                    item_name : results.item_name,
                    item_detail : results.item_detail,
                    image_name : req.protocol + '://' + req.get('host')  + '/images/items_images/'+results.image_name
                }
            });  
            
            res.json({
                 status: "success",
                 message: "All item by category food !",
                 data : data
            });
       
           
        } catch (err) {
           
            res.json({
                'status': 'error',
                'message': 'Error Occurred. Try Again!'
                
            });
            return;
       
        }  

        
}

//-------------------------------------------------------------get_item_detail----------------------------------------//

module.exports.get_itemList = async function(req, res){


    try {
            if (!req.body.id ) {
               
                res.json({
                    status: "error",
                    message: "item details not found !!"
                });
                return;
            }

           let results = await itemModel.item_list(req.body.id)
        
           const data = results.map((results) =>{     // give object to store entire result..
            
          
                var image_name = results.image_name;    //convert_jsonString to json_array
                var json =   JSON.parse(image_name);
          
                    const image_data = json.map((json) =>{       //for_give_full_path_to_everyImage in JSON_ARRAY
                        return {
                            image : req.protocol + '://' + req.get('host')  + '/images/items_images/' + json
                        }
                    });
          
                return {
                    id : results.id,
                    item_name : results.item_name,
                    item_detail : results.item_detail,
                    image_name : image_data
                }
       
          
            }); 
           
                res.json({
                   status: "success",
                   message: "All item by category food !",
                   data : data
                });
        
        } catch(err) {
           
                res.json({
                    'status': 'error',
                    'message': 'Error Occurred. Try Again!'
                 
                });
                return;
        
        }
  
        
}
