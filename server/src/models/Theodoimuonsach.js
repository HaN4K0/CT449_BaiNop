const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const borrowSchema = new mongoose.Schema(
    {
        mamuon: Number,
        madocgia: { type: mongoose.Schema.ObjectId, ref: 'Docgia', require: true },
        masach: { type: mongoose.Schema.ObjectId, ref: 'Sach', require: true },
        manhanvien: { type: mongoose.Schema.ObjectId, ref: 'Nhanvien' },
        ngaymuon: { type: Date },
        ngaytra: { type: Date },
        chiphi: { type: Number },
        trangthai: { type: String, required: true, default: 'pending' }, // pending / borrow / paid
    },
    { timestamps: true, minimize: false },
);

borrowSchema.plugin(AutoIncrement, { inc_field: 'mamuon', start_seq: 1000 });

module.exports = mongoose.models?.Theodoimuonsach || mongoose.model('Theodoimuonsach', borrowSchema);

// const secondDay = new Date('2024-04-15T02:50:33.265+00:00');
// const firstDay = new Date('2024-04-13T02:05:14.020+00:00');

// const MinusDate = (secondDay - firstDay) / (1000 * 60 * 60 * 24);

// console.log(MinusDate.toFixed(0));
