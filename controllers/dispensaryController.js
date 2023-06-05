
const dispensary = require('../models/dispensaryModel')
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const sendResponse = (data, status, statusCode, res,message) => {
    res.status(statusCode).json({
      status: status,
      data,
      message
    });
  };

exports.getAlldispensary = catchAsync( async(req, res,next) => {
    const data = await dispensary.find();
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.adddispensary = catchAsync( async(req, res,next) => {
    const data = await dispensary.create(req.body);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.getdispensary = catchAsync( async(req, res,next) => {
    const data = await dispensary.findById(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
     sendResponse(data, 'success', 200, res);
  });
exports.updatedispensary = catchAsync( async(req, res,next) => {
    const data = await dispensary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    if(!data){
      return next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res,'successfully update');
  });
exports.deletedispensary = catchAsync( async(req, res,next) => {
    const data = await dispensary.findByIdAndDelete(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(null, 'success', 200, res,'seccessfully Delete');
  });


  