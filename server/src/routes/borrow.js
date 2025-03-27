const express = require('express');
const router = express.Router();
const borrowManager = require('../controller/borrow');

router.get('/', borrowManager.getAllForUser);
router.get('/admin', borrowManager.getAllForAdmin);
router.post('/', borrowManager.addBorrow);
router.patch('/', borrowManager.editBorrow);
router.delete('/user/:id', borrowManager.deleteBorrowUser);
router.delete('/:id', borrowManager.deleteBorrow);

module.exports = router;
