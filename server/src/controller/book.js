const Book = require('../repository/SachRepo');
const jwt = require('jsonwebtoken');

exports.getAll = async function (req, res, next) {
    try {
        const book = new Book();
        const result = await book.getAll();
        res.status(result.statusCode).json(result);
    } catch (err) {
        console.log(err);
        return next(new ApiError('500', 'Resource not found'));
    }
};
exports.add = async function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const book = new Book();
                const result = await book.add(req.body);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
exports.update = async function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const book = new Book();
                const result = await book.update(req.body);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
exports.delete = async function (req, res, next) {
    const token = req.headers['authorization'];
    const { masach } = req.params;

    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const book = new Book();
                const result = await book.delete(masach);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
