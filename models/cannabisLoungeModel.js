const mongoose = require('mongoose');
const validator = require('validator');

const cannabisLoungeSchema = new mongoose.Schema({
  evenet: {
    type: String,
    required: [true, 'Please add evenet!']
  },
  date: {
    type: Date,
    required: [true, 'Please add date!']
  },
  foodOfferd: {
    type: String,
    required: [true, 'Please add foodofferd!']
  },
  brandName: {
    type: String,
    required: [true, 'Please add brandname!']
  },
  entryFee: {
    type: String,
    required: [true, 'Please add entryfee!']
  },
  ConnectToEventbrite: {
    type: String,
    required: [true, 'Please add Connecttoeventbrite!']
  },
  photo: String, 
},{ timestamps: true });
       
const cannabisLounge = mongoose.model('CannabisLounge',cannabisLoungeSchema);

module.exports = cannabisLounge;
  