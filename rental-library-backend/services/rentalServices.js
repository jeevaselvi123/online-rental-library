const rentalModel = require('../models/rentalModel');

// Rent a book
const rentBook = async (userId, bookId) => {
    const isAvailable = await rentalModel.isBookAvailable(bookId);
    if (!isAvailable) {
        throw new Error('Book is not available');
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Due date is 7 days from now

    return await rentalModel.createRental(userId, bookId, dueDate);
};

// Return a book and calculate fine
const returnBook = async (rentalId) => {
    const rental = await rentalModel.getRentalById(rentalId);
    if (!rental) {
        throw new Error(`Rental with ID ${rentalId} not found`);
    }

    const returnDate = new Date();
    const dueDate = new Date(rental.due_date);
    const fine = returnDate > dueDate ? (returnDate - dueDate) / (1000 * 60 * 60 * 24) * 10 : 0; // $10/day fine

    return await rentalModel.updateRentalReturn(rentalId, returnDate, fine);
};

module.exports = {
    rentBook,
    returnBook,
};
