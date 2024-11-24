const bookModel = require('../models/bookModel');

// Fetch all books
const getAllBooks = async () => {
    return await bookModel.getAllBooks();
};

// Get a specific book
const getBookById = async (id) => {
    const book = await bookModel.getBookById(id);
    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }
    return book;
};

// Add a new book
const createBook = async (bookData) => {
    return await bookModel.createBook(bookData);
};

// Update book availability
const updateBookAvailability = async (id, is_available) => {
    const book = await bookModel.getBookById(id);
    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }
    return await bookModel.updateBookAvailability(id, is_available);
};

// Delete a book
const deleteBook = async (id) => {
    const book = await bookModel.getBookById(id);
    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }
    return await bookModel.deleteBook(id);
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBookAvailability,
    deleteBook,
};