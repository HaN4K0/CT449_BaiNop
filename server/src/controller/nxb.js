const jwt = require('jsonwebtoken');
const NXB = require('../repository/NXBRepo');

exports.add = function (req, res, next) {
    const token = req.headers['authorization'];

    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const nxb = new NXB();
                const result = await nxb.add(req.body);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};

exports.update = function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const nxb = new NXB();
                const result = await nxb.update(req.body);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};

exports.delete = function (req, res, next) {
    const token = req.headers['authorization'];
    const { manxb } = req.params;

    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const nxb = new NXB();
                const result = await nxb.delete(manxb);
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};

exports.getAll = function (req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, 'CT449', async function (error, user) {
        if (error || !user.ChucVu) {
            res.status(401).json({
                error: 'Bạn không có quyền truy cập !!!',
            });
        } else {
            try {
                const nxb = new NXB();
                const result = await nxb.getAll();
                res.status(result.statusCode).json(result);
            } catch (error) {
                console.log(error);
                return next(new ApiError('400', 'Resource not found'));
            }
        }
    });
};
