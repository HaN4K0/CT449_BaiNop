const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');

router.get('/', bookController.getAll);
router.post('/', bookController.add);
router.patch('/', bookController.update);
router.delete('/:masach', bookController.delete);

module.exports = router;
