const DocGia = require('../models/Docgia');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class DocgiaRepo {
    async SignUp(data) {
        const userIsExist = await DocGia.exists({ SoDienThoai: data.SoDienThoai });

        if (!userIsExist) {
            const user = new DocGia({
                Holot: data.Holot,
                Ten: data.Ten,
                password: bcrypt.hashSync(data.password, 10),
                SoDienThoai: data.SoDienThoai,
                GioiTinh: data.GioiTinh,
                DiaChi: data.DiaChi,
            });
            return await user
                .save()
                .then((res) => {
                    return {
                        message: 'Đăng ký thành công! bạn đã có thể đăng nhập',
                    };
                })
                .catch((error) => {
                    return { message: error };
                });
        } else {
            return { message: 'Số điện thoại đã tồn tại' };
        }
    }

    async SignIn(user) {
        const checkUser = await DocGia.findOne({ SoDienThoai: user?.SoDienThoai });

        if (checkUser) {
            if (await bcrypt.compare(user?.password, checkUser.password)) {
                const { password, ...userInfor } = checkUser._doc;

                var token = jwt.sign(userInfor, 'CT449', { expiresIn: '24h' });

                return { data: { user: userInfor, token }, message: 'Đăng nhập thành công' };
            } else {
                return { message: 'Mật khẩu không đúng' };
            }
        } else {
            return { message: 'Tài khoản không đúng' };
        }
    }
};
