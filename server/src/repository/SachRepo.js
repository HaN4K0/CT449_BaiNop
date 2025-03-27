const Book = require('../models/Sach');

module.exports = class SachRepo {
    async getAll() {
        try {
            const books = await Book.find().populate('manxb');
            return {
                books: books,
                statusCode: 200,
            };
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    }

    async add(data) {
        try {
            let book = new Book(data);
            return await book
                .save()
                .then(async () => {
                    await book.populate('manxb');
                    return {
                        book: book,
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

    async update(data) {
        try {
            let book = await Book.findOneAndUpdate(
                { _id: data._id },
                {
                    tensach: data.tensach,
                    dongia: data.dongia,
                    soquyen: data.soquyen,
                    namxuatban: data.namxuatban,
                    tacgia: data.tacgia,
                    manxb: data.manxb,
                    image: data.image,
                },
                {
                    new: true,
                },
            );
            await book.populate('manxb');
            return {
                book: book,
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

    async delete(masach) {
        try {
            const book = await Book.findOneAndDelete({ masach: masach });
            return {
                book: book,
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
