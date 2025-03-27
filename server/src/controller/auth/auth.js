// user
const DocgiaRepo = require('../../repository/DocgiaRepo');
const Staff = require('../../repository/NhanvienRepo');

exports.signup = async function (req, res, next) {
    try {
        const data = await req.body;

        const docgia = new DocgiaRepo(data);

        const result = await docgia.SignUp(data);

        res.status(200).json({
            status: 200,
            message: result.message,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
};

exports.signin = async function (req, res) {
    try {
        const data = await req.body;
        const docgia = new DocgiaRepo(data);
        const result = await docgia.SignIn(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
};

// NV
exports.staffSignup = async function (req, res) {
    try {
        const data = await req.body;
        const staff = new Staff(data);
        const result = await staff.SignUp(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
};

exports.staffSignin = async function (req, res) {
    try {
        const data = await req.body;
        const staff = new Staff(data);
        const result = await staff.SignIn(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
};
