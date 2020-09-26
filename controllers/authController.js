const { promisify } = require('util'); //to import promisify method
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/AppError');


const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res
        .status(201)
        .json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ where: { email: email } })
        .then(user => { return user })
        .catch(() => {
            return next(new AppError('The entered user does not exist!', 401));
        });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password!', 401));
    }

    const token = signToken(user._id);

    res
        .status(200)
        .json({
            status: 'success',
            token
        });

});


exports.protect = catchAsync(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Your are not logged in, Please login to get access', 401));
    }



    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
        new AppError('The user belonging to this token does no londger exists.', 401);
    }



    if (freshUser.changedPasswordAfter(decoded.iat)) {//secs value of issued at - iat
        return new AppError('User recently changed password! Please login again.', 401)
    }


    req.user = freshUser;

    next();

});