const pool = require('../config/database.config');

// Fetch all books
const getAllBooks = async () => {
    const query = 'SELECT * FROM books ORDER BY added_at DESC';
    const { rows } = await pool.query(query);
    return rows;
};

// Get book by ID
const getBookById = async (id) => {
    const query = 'SELECT * FROM books WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Add a new book
const createBook = async (bookData) => {
    const { title, description, author_name, image_url, category, published_date, rental_price, total_copies } = bookData;
    const query = `
        INSERT INTO books (title, description, author_name, image_url, category, published_date, rental_price, total_copies)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const values = [title, description, author_name, image_url, category, published_date, rental_price, total_copies];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Update a book's availability
const updateBookAvailability = async (id, is_available, rented_copies) => {
    const query = 'UPDATE books SET is_available = $1, rented_copies = $2 WHERE id = $3 RETURNING *';
    const values = [is_available, rented_copies, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Delete a book
const deleteBook = async (id) => {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBookAvailability,
    deleteBook,
};