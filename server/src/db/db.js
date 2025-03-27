const mongoose = require('mongoose');

async function connect() {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect('mongodb://localhost:27017/baitaplon');
            console.log('Database Connect successfully!!!');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };
