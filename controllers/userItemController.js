const userItem = require('../models/userItemModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const { validationResult } = require('express-validator');

exports.adduserItem = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next(new AppError('Invalid data received', 422));
  }
  const { strainType, grownType, userId } = req.body;
  const { files } = req;
  const userItems = [];

  if (Array.isArray(userId)) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { path } = file;
      const item = {
        userId: userId[i],
        strainType: strainType[i],
        grownType: grownType[i],
        photo: path
      };
      userItems.push(item);
    }
  } else {
    const file = req.files[0];
    const { path } = file;
    const item = {
      userId,
      strainType,
      grownType,
      photo: path
    };
    userItems.push(item);
  }

  const savedUserItems = await userItem.insertMany(userItems);
  res.status(201).send(savedUserItems);
});



exports.userItemsByUserId = catchAsync(async (req, res, next) => {
  const userId = req.params.uid;
  if(!userId){
    return next(new AppError('No user available in db' ,404))
}
const userItems = await userItem.find({userId});
if(!userItems){
  return next(new AppError('No user Items add on this user' ,404))
}
  res.status(200).json({
    userItems
  });
});
exports.updateuserItem =  catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { strainType, grownType} = req.body;
  const path = req.file?.path;
  let updatedFields = {
    strainType,
    grownType,
    photo: path
  };
const userItems = await userItem.findByIdAndUpdate(id,updatedFields, {
  new: true
});
if(!userItems){
  return next(new AppError('No user Items add on this id' ,404))
}
  res.status(200).json({
    userItems
  });
});

exports.getuserItem = factory.getOne(userItem,'userId');
exports.deleteuserItem = factory.deleteOne(userItem);
exports.getAlluserItem = factory.getAll(userItem,'userId');

