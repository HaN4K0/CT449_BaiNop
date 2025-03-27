const Borrow = require('../repository/TheodoimuonsachRepo');
const jwt = require('jsonwebtoken');

exports.getAllForUser = function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const borrow = new Borrow();
                const result = await borrow.getAllForUser(user._id);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};

exports.getAllForAdmin = function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const borrow = new Borrow();
                const result = await borrow.getAllForAdmin();
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};

exports.addBorrow = function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                // console.log('vo day');
                const borrow = new Borrow();
                const result = await borrow.add(req.body, user._id);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
exports.editBorrow = async function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const borrow = new Borrow();
                const result = await borrow.update(req.body, user._id);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
exports.deleteBorrow = function (req, res, next) {
    const token = req.headers['authorization'];
    const { id } = req.params;

    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const borrow = new Borrow();
                const result = await borrow.deleteBorrow(id);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};

exports.deleteBorrowUser = function (req, res, next) {
    const token = req.headers['authorization'];
    const { id } = req.params;

    jwt.verify(token, 'CT449', async function (error, user) {
        if (error) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                // console.log('vo day');
                const borrow = new Borrow();
                const result = await borrow.deleteBorrowUser(id, user._id);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
