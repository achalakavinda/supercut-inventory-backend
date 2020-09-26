const User = require('./../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll().then((users) => { return users });

    res
        .status(200)
        .json({
            status: "success",
            requestedTime: req.requestTime,
            results: users.length,
            data: {
                users
            }
        });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id).then((user) => { return user });

    if (!user) {
        return next(new AppError('No User found with that ID', 404));
    }

    res
        .status(200)
        .json({
            status: "success",
            requestedTime: req.requestTime,
            data: {
                user
            }
        });

});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id).then((user) => { return user });

    if (!user) {
        return next(new AppError('No User found with that ID', 404));
    }

    User.destroy({
        where: {
            id: user.id
        }
    });

    res
        .status(200)
        .json({
            status: "success",
            requestedTime: req.requestTime,
            data: {
                user
            }
        });

});
exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id).then((user) => { return user });

    if (!user) {
        return next(new AppError('No User found with that ID', 404));
    }

    await User.update(req.body, {
        where: {
            id: user.id
        }
    }).then((updateduser) => {
        res
            .status(200)
            .json({
                status: "success",
                requestedTime: req.requestTime,
                data: {
                    updateduser
                }
            });
    });


});