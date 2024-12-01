const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
export const rentalBooks = async (book_id) => {
    try {
        const userToken = localStorage.getItem('token'); 

        const response = await fetch(`${API_BASE_URL}/rental`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` 
            },
            body: JSON.stringify({ bookId: book_id })
        });

        return await response.json();
    } catch (error) {
        console.error('Failed to rent the books:', error);
    }
};

export const returnBook = async (rentalId) => {
    try {
        const userToken = localStorage.getItem('token'); 

        const response = await fetch(`${API_BASE_URL}/rental/return/${rentalId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` 
            }
        });

        return await response.json();
    } catch (error) {
        console.error('Error occurred while returning the book', error);
    }
};
