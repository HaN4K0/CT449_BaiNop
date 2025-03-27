const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const staffSchema = new mongoose.Schema(
    {
        HoTenNV: { type: String, require: true },
        password: { type: String, require: true },
        ChucVu: { type: String, require: true, default: 'ABC' },
        DiaChi: { type: String, require: true },
        SoDienThoai: { type: String, require: true },
    },
    { timestamps: true, minimize: false },
);

module.exports = mongoose.models?.Nhanvien || mongoose.model('Nhanvien', staffSchema);
