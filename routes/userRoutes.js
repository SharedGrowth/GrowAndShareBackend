const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();
const { check } = require('express-validator');
router.post('/signup',[  
check('fullName').not().isEmpty(),
check('email').not().isEmpty(),
check('password').not().isEmpty(),
check('passwordConfirm').not().isEmpty(),
check('userType').not().isEmpty(),
],authController.signup)
router.post('/login',authController.login)
router.post('/forgotpassword',authController.forgotpassword)
router.patch('/updateUser/:id',userController.updateUser)
router.patch('/resetPassword/:otp',authController.resetPassword)
router.patch('/updatePassword',authController.protect,authController.updatePassword)

  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);



module.exports = router;
