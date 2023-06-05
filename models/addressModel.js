const mongoose = require('mongoose');
const validator = require('validator');

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please add address!']
  },
  long: {
    type: String,
    required: [true, 'Please add long!']
  },
  lat: {
    type: String,
    required: [true, 'Please add lat!']
  },
  postalCode: {
    type: String,
    required: [true, 'Please add postalCode!']
  },
  city: {
    type: String,
    required: [true, 'Please add city!']
  },
  state: {
    type: String,
    required: [true, 'Please add state!']
  },
  phone: {
    type: String,
    required: [true, 'Please add state!']
  },
  country: {
    type: String,
    required: [true, 'Please add country!']
  },
},{ timestamps: true });
       
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
  

