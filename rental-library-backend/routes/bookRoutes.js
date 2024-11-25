const express = require('express');
const {getAllBooks, getBookById,createBook, updateBookAvailability, deleteBook} = require('../controllers/bookController');

const router = express.Router();
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.patch('/:id/availability', updateBookAvailability);
router.delete('/:id', deleteBook);

module.exports = router;