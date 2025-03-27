const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    Holot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date, required: true, default: Date.now() },
    GioiTinh: { type: String, required: true },
    DiaChi: { type: String, required: true },
    password: { type: String, require: true },
    SoDienThoai: { type: String, required: true },
});

module.exports = mongoose.models?.Docgia || mongoose.model('Docgia', userSchema);
