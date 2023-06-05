const express = require('express');
const cannabisLoungController = require('../controllers/cannabisLoungController');
const router = express.Router();
router.route('/')
  .get(cannabisLoungController.getAllCannabisLounge)
  .post(cannabisLoungController.addCannabisLounge);
router
  .route('/:id')
  .get(cannabisLoungController.getCannabisLounge)
  .patch(cannabisLoungController.updateCannabisLounge)
  .delete(cannabisLoungController.deleteCannabisLounge);
module.exports = router;
