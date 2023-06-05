const express = require('express');
const dispensaryController = require('../controllers/dispensaryController');
const router = express.Router();
router.route('/')
  .get(dispensaryController.getAlldispensary)
  .post(dispensaryController.adddispensary);
router
  .route('/:id')
  .get(dispensaryController.getdispensary)
  .patch(dispensaryController.updatedispensary)
  .delete(dispensaryController.deletedispensary);
module.exports = router;
