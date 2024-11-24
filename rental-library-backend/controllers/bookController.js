const bookService = require('../services/bookServices');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a book by ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookService.getBookById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Create a new book
const createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update book availability
const updateBookAvailability = async (req, res) => {
    const { id } = req.params;
    const { is_available } = req.body;
    try {
        const book = await bookService.updateBookAvailability(id, is_available);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookService.deleteBook(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBookAvailability,
    deleteBook,
};