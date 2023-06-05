
const headShop = require('../models/headShopModel')
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const sendResponse = (data, status, statusCode, res,message) => {
    res.status(statusCode).json({
      status: status,
      data,
      message
    });
  };

exports.getAllheadShop = catchAsync( async(req, res,next) => {
    const data = await headShop.find();
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.addheadShop = catchAsync( async(req, res,next) => {
    const data = await headShop.create(req.body);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res);
  });

exports.getheadShop = catchAsync( async(req, res,next) => {
    const data = await headShop.findById(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
     sendResponse(data, 'success', 200, res);
  });
exports.updateheadShop = catchAsync( async(req, res,next) => {
    const data = await headShop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    if(!data){
      return next(new AppError('No Data found',404))
    }
    sendResponse(data, 'success', 200, res,'successfully update');
  });
exports.deleteheadShop = catchAsync( async(req, res,next) => {
    const data = await headShop.findByIdAndDelete(req.params.id);
    if(!data){
      return  next(new AppError('No Data found',404))
    }
    sendResponse(null, 'success', 200, res,'seccessfully Delete');
  });


  