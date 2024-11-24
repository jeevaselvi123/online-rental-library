const express = require('express');
const rentalController = require('../controllers/rentalController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/rent', authMiddleware, rentalController.rentBook);
router.patch('/return/:rentalId', authMiddleware, rentalController.returnBook);

module.exports = router;
