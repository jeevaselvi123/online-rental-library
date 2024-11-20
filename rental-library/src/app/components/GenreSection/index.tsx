'use client';
import BookCard from 'app/components/BookCard';
import React from 'react';

interface GenreBooks {
    id: number;
    title: string;
    author: string;
    imageUrl: string;
}

export default function GenreSection({ genre, books }: { genre: string, books: GenreBooks[] }) {
    // const [currentIndex, setCurrentIndex] = useState(0);

    // const handlePrevClick = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
    // };

    // const handleNextClick = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    // };
    return (
        <div className="mb-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{genre}</h2>
                <div className="flex space-x-4">
                    <button type="button" className="text-gray-500 hover:text-gray-700">Previous</button>
                    <button type="button" className="text-gray-500 hover:text-gray-700">Next</button>
                </div>
            </div>
            <div className="grid grid-cols-4"> {/* Changed to one column */}
                {books.map((book:GenreBooks) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}
