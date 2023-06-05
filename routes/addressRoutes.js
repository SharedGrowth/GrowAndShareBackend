const express = require('express');
const AddressController = require('../controllers/addressController');
const router = express.Router();
router.route('/')
  .get(AddressController.getAllAddress)
  .post(AddressController.addAddress);
router
  .route('/:id')
  .get(AddressController.getAddress)
  .patch(AddressController.updateAddress)
  .delete(AddressController.deleteAddress);
module.exports = router;
