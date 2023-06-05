const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./userModel')


const userItemSchema = new mongoose.Schema({
  strainType: {
    type: String,
    required: [true, 'Please add strainType!']
  },
  grownType: {
    type: String,
    required: [true, 'Please add grownType!']
  },
  photo: {
    type: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{ timestamps: true });
       
const userItem = mongoose.model('userItem', userItemSchema);

module.exports = userItem;
  

