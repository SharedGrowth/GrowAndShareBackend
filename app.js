const express = require('express');
const morgan = require('morgan');
const path = require('path');
const userRouter = require('./routes/userRoutes');
const cannabisLoungRoutes = require('./routes/cannabisLoungRoutes');
const addressRoutes = require('./routes/addressRoutes');
const dispensaryRoutes = require('./routes/dispensaryRoutes');
const headShopRoutes = require('./routes/headShopRoutes');
const userItemRoutes = require('./routes/userItemRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use('/uploads/userItem', express.static(path.join('uploads', 'userItem')));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cannabisLoung', cannabisLoungRoutes);
app.use('/api/v1/dispensary', dispensaryRoutes);
app.use('/api/v1/headShop', headShopRoutes);
app.use('/api/v1/address', addressRoutes);
app.use('/api/v1/userItem', userItemRoutes);
app.all('*',(req,res,next)=>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404))
})
app.use(globalErrorHandler)

module.exports = app;




