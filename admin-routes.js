var express = require('express');
var router = express.Router();


var log_in = require('./admin-contoller/adminController');
var dash_brd = require('./admin-contoller/dashController');
var log_out = require('./admin-contoller/logoutController');
var forgot = require('./admin-contoller/forgotPassControler');
var profile = require('./admin-contoller/profileController');
var category = require('./admin-contoller/categoryController');
var items = require('./admin-contoller/itemController');



router.route('/login').get(log_in.primary);
router.route('/signup').post(log_in.authenticate);

router.route('/dashboard').get(dash_brd.dashboard);
router.route('/logout').get(log_out.loggout);

router.route('/change_password').get(log_in.change_password);
router.route('/update_password').post(log_in.update_password);

router.route('/forgot_password').post(forgot.forgot_password);
router.route('/reset_password/:token').get(forgot.reset_password_get);
router.route('/reset_password/new_password').post(forgot.reset_password_post);

router.route('/edit_profile').get(profile.edit_profile);
router.route('/update_profile').post(profile.update_new);

router.route('/food_category').get(category.get_all_category);
router.route('/add_category').get(category.add_new_category);
router.route('/post_category').post(category.post_new_category);
router.route('/edit_category/:id').get(category.edit_category);
router.route('/submit_category/:id').post(category.update_category);
router.route('/status_change').get(category.status_chng);
router.route('/delete_category').get(category.delete_category);


router.route('/food_items/').get(items.get_all_items);
router.route('/add_items').get(items.add_new_items);
router.route('/post_items').post( items.post_new_items);
router.route('/edit_items/:id').get(items.get_one_item);
router.route('/submit_items/:id/:image_id').post(items.update_item);
router.route('/delete_items').get(items.delete_item);
router.route('/item_images/:id').get(items.get_all_images);
router.route('/update_image').post(items.update_one_image);


router.route('/delete_image').post(items.delete_image);
router.route('/add_item_images').post(items.insert_item_images);



//router.route('/error').get(dash_brd.errorPage);  redirect to 404 error page..


module.exports = router;

