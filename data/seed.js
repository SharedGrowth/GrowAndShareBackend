const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const User = require('../models/userModel')
const userItem = require('../models/userItemModel')

const DB = process.env.DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/user.json`, 'utf-8')
);
const userItems = JSON.parse(
  fs.readFileSync(`${__dirname}/userType.json`, 'utf-8')
);


const importData = async () => {
  try {
    await User.create(users,{validateBeforeSave:false});
    await userItem.create(userItems);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => { 
  try {
    await User.deleteMany();
    await userItem.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
