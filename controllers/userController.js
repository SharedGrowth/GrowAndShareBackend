const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


exports.updateUser = catchAsync(async (req, res, next) => {
  const uid = req.params.id;
  console.log(uid)
  if (!uid) {
    return next(new AppError('No User Exist in DataBase with this ID, please check again', 400));
  }
  const { addressname, lng, lat, postalCode, city, state, country , retailerType} = req.body;
  console.log(req.body)
  const user = await User.findById(uid);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if(user.userType === "Retailer" && addressname===undefined ){
   user.retailerType = retailerType
  }
  user.address.addressname = addressname;
  user.address.lng = lng;
  user.address.lat = lat;
  user.address.postalCode = postalCode;
  user.address.city = city;
  user.address.state = state;
  user.address.country = country;
  await user.save({validateBeforeSave:false});
  res.status(200).json({
    user: user,
    message: 'User Update Successfully'
  });
});


exports.deleteUser = factory.deleteOne(User);
// exports.updateUser = factory.updateOne(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);