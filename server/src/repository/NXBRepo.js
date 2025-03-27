const NXB = require('../models/Nhaxuatban');

module.exports = class NXBRepo {
    async add(data) {
        try {
            const nxb = new NXB(data);
            return await nxb
                .save()
                .then(() => {
                    return {
                        nxb: nxb,
                        statusCode: 200,
                        message: 'Thêm thành công',
                    };
                })
                .catch((error) => {
                    return {
                        statusCode: 500,
                        message: 'Thêm thất bại',
                    };
                });
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }
    async getAll() {
        try {
            const nxb = await NXB.find();
            return {
                nxb: nxb,
                statusCode: 200,
                message: 'Lấy thành công',
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Lấy thất bại',
            };
        }
    }

    async update(data) {
        try {
            const nxb = await NXB.findOneAndUpdate(
                { manxb: data.manxb },
                { TenNxb: data.TenNxb, Diachi: data.Diachi },
                {
                    new: true,
                },
            );
            return {
                nxb: nxb,
                statusCode: 200,
                message: 'Cập nhật thành công',
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Cập nhật thất bại',
            };
        }
    }

    async delete(manxb) {
        try {
            const nxb = await NXB.findOneAndDelete({ manxb: manxb });
            return {
                nxb: nxb,
                statusCode: 200,
                message: 'Xóa thành công',
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Xóa thất bại',
            };
        }
    }
};
