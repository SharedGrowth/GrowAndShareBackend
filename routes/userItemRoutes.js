const express = require('express');
const { check } = require('express-validator');
const userItemController = require('../controllers/userItemController');
const router = express.Router();
const fileUpload = require('../middlewares/userItem-upload')
router.route('/')

  .get(userItemController.getAlluserItem)
  .post(fileUpload.any('photo'),[
  check('userId').not().isEmpty(),
  check('strainType').not().isEmpty(),
  check('grownType').not().isEmpty(),
  ],userItemController.adduserItem);
 router.route('/itemByUser/:uid').get(userItemController.userItemsByUserId);
  
router
  .route('/:id')
  .get(userItemController.getuserItem)
  .patch(fileUpload.single('photo'),[
    check('userId').not().isEmpty(),
    check('strainType').not().isEmpty(),
    check('grownType').not().isEmpty(),
  ],userItemController.updateuserItem)
  .delete(userItemController.deleteuserItem);
module.exports = router;
