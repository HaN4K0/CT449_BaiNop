const Book = require('../models/Sach');
const Borrow = require('../models/Theodoimuonsach');

module.exports = class TheodoimuonsachRepo {
    async getAllForUser(_id) {
        try {
            const borrow = await Borrow.find({ madocgia: _id }).populate('masach');
            return {
                borrows: borrow,
                statusCode: 200,
            };
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }

    async getAllForAdmin() {
        try {
            const borrow = await Borrow.find()
                .populate('masach')
                .populate('manhanvien', ['HoTenNV', 'ChucVu', 'DiaChi', 'SoDienThoai'])
                .populate('madocgia', ['DiaChi', 'GioiTinh', 'NgaySinh', 'SoDienThoai', 'Ten']);
            return {
                borrows: borrow,
                statusCode: 200,
            };
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }

    async add(data, user_id) {
        try {
            const borrow = new Borrow({
                madocgia: user_id,
                masach: data.masach,
            });
            return await borrow.save().then(async () => {
                await Book.findByIdAndUpdate(data.masach, { $inc: { soquyendamuon: 1 } });
                return {
                    message: 'Mượn sách thành công, đến thư viện để nhận sách',
                    borrow: borrow,
                    statusCode: 200,
                };
            });
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }

    async deleteBorrowUser(_id, user_id) {
        try {
            const borrow = await Borrow.findOneAndDelete({ _id: _id, madocgia: user_id, trangthai: 'pending' });
            if (borrow) {
                await Book.findByIdAndUpdate(borrow.masach, { $inc: { soquyendamuon: -1 } });
                return {
                    message: 'Xóa thành công',
                    borrow: borrow,
                    statusCode: 200,
                };
            }

            return {
                message: 'Xóa thất bại',
                statusCode: 500,
            };
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }

    async deleteBorrow(_id) {
        try {
            const borrow = await Borrow.findOneAndDelete({ _id: _id });
            if (borrow) {
                if (borrow.trangthai != 'paid') {
                    await Book.findByIdAndUpdate(borrow.masach, { $inc: { soquyendamuon: -1 } });
                }
                return {
                    message: 'Xóa thành công',
                    borrow: borrow,
                    statusCode: 200,
                };
            }
            return {
                message: 'Xóa thất bại',
                statusCode: 500,
            };
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }

    async update(data, nv_id) {
        try {
            if (data.trangthai == 'borrow') {
                const borrow = await Borrow.findOneAndUpdate(
                    { _id: data._id },
                    { trangthai: data.trangthai, ngaymuon: Date.now(), manhanvien: nv_id },
                    { new: true },
                )
                    .populate('masach')
                    .populate('manhanvien', ['HoTenNV', 'ChucVu', 'DiaChi', 'SoDienThoai'])
                    .populate('madocgia', ['DiaChi', 'GioiTinh', 'NgaySinh', 'SoDienThoai', 'Ten']);
                return {
                    message: 'Cập nhật thành công',
                    borrow: borrow,
                    statusCode: 200,
                };
            } else if (data.trangthai == 'paid') {
                const borrow = await Borrow.findOne({ _id: data._id });
                const book = await Book.findOne({ _id: borrow.masach });
                const currentDay = Date.now();
                const borrowDay = new Date(borrow.ngaymuon);
                const price = ((currentDay - borrowDay) / (1000 * 60 * 60 * 24)).toFixed(0) * book.dongia;
                // Edit
                borrow.trangthai = data.trangthai;
                borrow.manhanvien = nv_id;
                borrow.ngaytra = currentDay;
                borrow.chiphi = price.toFixed(3);
                return borrow.save().then(async (res) => {
                    await Book.findByIdAndUpdate(borrow.masach, { $inc: { soquyendamuon: -1 } });
                    const result = await Borrow.findOne({ _id: data._id })
                        .populate('masach')
                        .populate('manhanvien', ['HoTenNV', 'ChucVu', 'DiaChi', 'SoDienThoai'])
                        .populate('madocgia', ['DiaChi', 'GioiTinh', 'NgaySinh', 'SoDienThoai', 'Ten']);
                    return {
                        message: 'Cập nhật thành công',
                        borrow: result,
                        statusCode: 200,
                    };
                });
            }
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }
};
