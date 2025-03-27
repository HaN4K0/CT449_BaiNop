// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const borrowSchema = new mongoose.Schema(
//     {
//         madocgia: { type: mongoose.Schema.ObjectId, ref: 'Docgia', required: true },
//         masach: { type: mongoose.Schema.ObjectId, ref: 'Sach', required: true },
//         manhanvien: { type: mongoose.Schema.ObjectId, ref: 'Nhanvien' },
//         ngaymuon: { type: Date, require: true },
//         ngaytra: { type: Date, required: true },
//     },
//     { timestamps: true, minimize: false },
// );

// module.exports = mongoose.models?.Theodoimuonsach || mongoose.model('Theodoimuonsach', borrowSchema);


const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const borrowSchema = new mongoose.Schema(
    {
        mamuonsach: Number, // Tự động tăng ID mượn sách
        madocgia: { type: mongoose.Schema.ObjectId, ref: 'Docgia', required: true },
        masach: { type: mongoose.Schema.ObjectId, ref: 'Sach', required: true },
        manhanvien: { type: mongoose.Schema.ObjectId, ref: 'Nhanvien' },
        ngaymuon: { type: Date, required: true },
        ngaytra: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.ngaymuon;
                },
                message: 'Ngày trả phải lớn hơn ngày mượn!',
            },
        },
    },
    { timestamps: true, minimize: false },
);

// Kích hoạt tự động tăng ID
borrowSchema.plugin(AutoIncrement, { inc_field: 'mamuonsach' });

module.exports = mongoose.models?.Theodoimuonsach || mongoose.model('Theodoimuonsach', borrowSchema);
