
const Address = require('../models/addressModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendResponse = (data, status, statusCode, res,message) => {
    res.status(statusCode).json({
      status: status,
      data,
      message
    });
  };

exports.getAllAddress = catchAsync( async(req, res,next) => {
    const data = await Address.find({});
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.addAddress = catchAsync( async(req, res,next) => {
    const data = await Address.create(req.body);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.getAddress = catchAsync( async(req, res,next) => {
    const data = await Address.findById(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
     sendResponse(data, 'success', 200, res);
  });
exports.updateAddress = catchAsync( async(req, res,next) => {
    const data = await Address.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    if(!data){
      return next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res,'successfully update');
  });
exports.deleteAddress = catchAsync( async(req, res,next) => {
    const data = await Address.findByIdAndDelete(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(null, 'success', 200, res,'seccessfully Delete');
  });


  