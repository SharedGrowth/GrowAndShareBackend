const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please tell us your fullName!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  userType: {
    type: String,
    enum: ['Retailer', 'Consumer'],
    required: true
  },
  retailerType: {
    type: String,
  },
  address: {
    addressname: {
      type: String,
    },
    phone: {
      type: String,
    },
    lng: {
      type: String,
    },
    lat: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    // city: {
    //   type: String,
    // },
    // state: {
    //   type: String,
    // },
    // country: {
    //   type: String,
    // }
  },
  active:{
    type:Boolean,
    default:true
  },
  passwordChangedAt:Date,
  passwordResetotp :String,
  passwordResetExpires:Date,
},{ timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetOtp = async function() {
  const otp = `${Math.floor(1000 + Math.random() * 900)}`
  this.passwordResetotp = otp;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return otp;
 };
 
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});




userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};


       
const User = mongoose.model('User', userSchema);

module.exports = User;
  