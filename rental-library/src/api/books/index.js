const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const userToken = localStorage.getItem('token'); 

export const fetchBooks = async () => {
    try {
        console.log('called fetch books', userToken);
        // const response = await fetch(`${API_BASE_URL}/books`);
        const response = await fetch(`${API_BASE_URL}/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Failed to fetch books:', error);
    }
};

export const fetchBookById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`);
        return await response.json();;
    } catch (error) {
        console.error(`Failed to fetch book-${id} details:`, error);
    }
}

export const updateBookAvailability = async (id, is_available, rented_copies) => {
    try {
        const response = await fetch(`${API_BASE_URL}/books/${id}/availability`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_available, rented_copies }),
        });

        if (!response.ok) {
            throw new Error('Failed to update book availability');
        }
        return await response.json()
    }
    catch (error) {
        console.error('Error occurred while updating the availability:', error);
    }
}
