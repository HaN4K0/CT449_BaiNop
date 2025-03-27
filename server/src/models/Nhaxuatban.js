const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const publisherSchema = new mongoose.Schema(
    {
        manxb: Number,
        TenNxb: { type: String, require: true },
        Diachi: { type: String, require: true },
    },
    { timestamps: true, minimize: false },
);

publisherSchema.plugin(AutoIncrement, { inc_field: 'manxb', start_seq: 1000 });

module.exports = mongoose.models?.Nhaxuatban || mongoose.model('Nhaxuatban', publisherSchema);
