const pool = require('../config/database.config');

// Create a rental record
const createRental = async (userId, bookId, dueDate, paymentStatus) => {
    const query = `
        INSERT INTO rentals (user_id, book_id, due_date, payment_status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, bookId, dueDate,paymentStatus]);
    return rows[0];
};

// Get rental by ID
const getRentalById = async (rentalId) => {
    const query = 'SELECT * FROM rentals WHERE id = $1';
    const { rows } = await pool.query(query, [rentalId]);
    return rows[0];
};

// Update rental with return date and fine
const updateRentalReturn = async (rentalId, returnDate, fine) => {
    const query = `
        UPDATE rentals
        SET return_date = $1, fine = $2
        WHERE id = $3
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [returnDate, fine, rentalId]);
    return rows[0];
};

// Check book availability
const isBookAvailable = async (bookId) => {
    const query = `
        SELECT COUNT(*) AS active_rentals
        FROM rentals
        WHERE book_id = $1 AND return_date IS NULL;
    `;
    const { rows } = await pool.query(query, [bookId]);
    return parseInt(rows[0].active_rentals) === 0;
};

module.exports = {
    createRental,
    getRentalById,
    updateRentalReturn,
    isBookAvailable,
};
