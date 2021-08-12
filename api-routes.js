var express = require('express');
var router = express.Router();

let categoryController = require('./api-controller/categoryController');
let itemController = require('./api-controller/itemController');

router.route('/category_list').get(categoryController.get_all_category);
router.route('/item_list_byCategory').post(itemController.get_item_byCategory);
router.route('/item_details').post(itemController.get_itemList);


module.exports = router;








