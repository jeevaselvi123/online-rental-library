import BookCard from 'app/components/BookCard';
import React from 'react';

export default function GenreSection({ genre, books }: { genre: string, books: any }) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{genre}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book: any) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}
