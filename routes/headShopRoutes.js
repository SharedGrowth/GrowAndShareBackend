const express = require('express');
const headShopController = require('../controllers/headShopController');
const router = express.Router();
router.route('/')
  .get(headShopController.getAllheadShop)
  .post(headShopController.addheadShop);
router
  .route('/:id')
  .get(headShopController.getheadShop)
  .patch(headShopController.updateheadShop)
  .delete(headShopController.deleteheadShop);
module.exports = router;
