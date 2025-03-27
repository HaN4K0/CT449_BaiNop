const NhanVien = require('../models/Nhanvien');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class NhanvienRepo {
    async SignUp(data) {
        const userIsExist = await NhanVien.exists({ SoDienThoai: data.SoDienThoai });

        if (!userIsExist) {
            const user = new NhanVien({
                HoTenNV: data.HoTenNV,
                password: bcrypt.hashSync(data.password, 10),
                ChucVu: data.ChucVu,
                DiaChi: data.DiaChi,
                SoDienThoai: data.SoDienThoai,
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
        const checkUser = await NhanVien.findOne({ SoDienThoai: user?.SoDienThoai });

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
