const rentalService = require('../services/rentalServices');

// Rent a book
const rentBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id;

    try {
        const rental = await rentalService.rentBook(userId, bookId);
        res.status(201).json(rental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Return a book
const returnBook = async (req, res) => {
    const { rentalId } = req.params;

    try {
        const rental = await rentalService.returnBook(rentalId);
        res.status(200).json(rental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    rentBook,
    returnBook,
};
