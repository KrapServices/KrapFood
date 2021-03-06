const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const restaurantsRouter = require('./routes/restaurants');
const promoRouter = require('./routes/promotions');
const ordersRouter = require('./routes/orders');
const foodRouter = require('./routes/food');
const managerRouter = require('./routes/manager');
const customerRouter = require('./routes/customer');
const riderRouter = require('./routes/rider');
const staffRouter = require('./routes/staff');
const summaryRouter = require('./routes/summary');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/registrations', registrationRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/promotions', promoRouter);
app.use('/orders', ordersRouter);
app.use('/food', foodRouter);
app.use('/managers', managerRouter);
app.use('/customers', customerRouter);
app.use('/riders', riderRouter);
app.use('/staffs', staffRouter);
app.use('/summary', summaryRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
