const mongoose = require('mongoose');
const validator = require('validator');

const headShopSchema = new mongoose.Schema({
  accessories: {
    type: String,
    required: [true, 'Please add accessories!']
  },
  type: {
    type: String,
    required: [true, 'Please add type!']
  },
  cost: {
    type: String,
    required: [true, 'Please add cost!']
  },
  brandName: {
    type: String,
    required: [true, 'Please add brandname!']
  },
  productName: {
    type: String,
    required: [true, 'Please add productname!']
  },
  size: {
    type: String,
    required: [true, 'Please add size!']
  },
  photo: String,
},{ timestamps: true });
       
const headShop = mongoose.model('HeadShop', headShopSchema);

module.exports = headShop;
  