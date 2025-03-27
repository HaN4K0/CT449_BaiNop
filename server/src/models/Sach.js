const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookSchema = new mongoose.Schema(
    {
        masach: Number,
        tensach: { type: String, require: true },
        dongia: { type: Object, require: true },
        soquyen: { type: Number, require: true },
        soquyendamuon: { type: Number, require: true, default: 0 },
        namxuatban: { type: Date, require: true },
        tacgia: { type: String },
        manxb: { type: mongoose.Schema.ObjectId, ref: 'Nhaxuatban', require: true },
        image: { type: String },
    },
    { timestamps: true, minimize: false },
);

bookSchema.plugin(AutoIncrement, { inc_field: 'masach', start_seq: 1000 });

module.exports = mongoose.models?.Sach || mongoose.model('Sach', bookSchema);
