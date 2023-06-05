const mongoose = require('mongoose');
const validator = require('validator');

const dispensarySchema = new mongoose.Schema({
  postStrain: {
    type: String,
    required: [true, 'Please add poststrain!']
  },
  quantity: {
    type: String,
    required: [true, 'Please add Quantity!']
  },
  cost: {
    type: String,
    required: [true, 'Please add cost!']
  },
  strainName: {
    type: String,
    required: [true, 'Please add strainname!']
  },
  description: {
    type: String,
    required: [true, 'Please add description!']
  },
  photo: String,
},{ timestamps: true });
       
const dispensary = mongoose.model('Dispensary', dispensarySchema);

module.exports = dispensary;
  