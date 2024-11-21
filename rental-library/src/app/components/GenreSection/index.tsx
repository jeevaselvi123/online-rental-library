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

    return (
        <div className="mb-8 flex flex-col">
                <h2 className="text-2xl font-bold">{genre}</h2>
            <div className="grid grid-cols-4"> 
                {books.map((book:GenreBooks) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}
