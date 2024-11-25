const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const fetchBooks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Failed to fetch books:', error);
    }
};

export const fetchBookById = async(id: string | string[]) => {
    try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`);
        return response.json();;
    } catch (error) {
        console.error(`Failed to fetch book-${id} details:`, error);
    }
}

