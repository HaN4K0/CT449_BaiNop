const db = require('./db/db');

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const ApiError = require('./api-error');
const routes = require('./routes');
dotenv.config({ path: '../.env' });

const PORT = 8080;

db.connect();

app.use(cors());

app.use(
    express.urlencoded({
        limit: '10mb',
        extended: true,
    }),
);
app.use(express.json());

routes(app);

app.use((req, res, next) => {
    return next(new ApiError('400', 'Resource not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error',
    });
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
