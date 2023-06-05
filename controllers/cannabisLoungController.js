
const cannabisLounge = require('../models/cannabisLoungeModel')
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const sendResponse = (data, status, statusCode, res,message) => {
    res.status(statusCode).json({
      status: status,
      data,
      message
    });
  };

exports.getAllCannabisLounge = catchAsync( async(req, res,next) => {
    const data = await cannabisLounge.find();
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.addCannabisLounge = catchAsync( async(req, res,next) => {
    const data = await cannabisLounge.create(req.body);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.getCannabisLounge = catchAsync( async(req, res,next) => {
    const data = await cannabisLounge.findById(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
     sendResponse(data, 'success', 200, res);
  });
exports.updateCannabisLounge = catchAsync( async(req, res,next) => {
    const data = await cannabisLounge.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    if(!data){
      return next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res,'successfully update');
  });
exports.deleteCannabisLounge = catchAsync( async(req, res,next) => {
    const data = await cannabisLounge.findByIdAndDelete(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(null, 'success', 200, res,'seccessfully Delete');
  });


  