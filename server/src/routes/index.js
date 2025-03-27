const authRouter = require('./auth');
const nxbRouter = require('./nxb');
const bookRouter = require('./book');
const borrowRouter = require('./borrow');
function route(app) {
    app.use('/auth', authRouter);
    app.use('/nxb', nxbRouter);
    app.use('/book', bookRouter);
    app.use('/borrow', borrowRouter);
}
module.exports = route;
