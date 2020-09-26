/**
 * what we are doing here is creating a separate file for the application configs so that 
 * we can export app as a whole to be used in the server.js file where the actual starting point is.
*/
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const app = express(); // this is our abstract web server
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const Company = require('./models/companyModel');
const companyDivision = require('./models/companyDivisionModel');
const User = require('./models/userModel');
const Brand = require('./models/brandModel');

////////////////////////////////////////////////////////////////////////MIDDLEWARES//////////////////////////////////////////////////////////////////////////////////
//you can get recommended middleware options from the https://expressjs.com/en/resources/middleware.html
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find the ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);



module.exports = app;