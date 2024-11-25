'use client';
import BookCard from 'app/components/BookCard';
import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { BookDetails } from 'app/page';

export default function GenreSection({ genre, books }: { genre: string, books: BookDetails[] }) {

    const [current_page, set_current_page] = useState<number>(1);

    const handle_prev = () => {
        set_current_page((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handle_next = () => {
        set_current_page((prevPage) => Math.min(prevPage
            + 1, Math.ceil(books.length / 4))); 
    };

    const books_per_page = 4;
    const start_index = (current_page - 1) * books_per_page;
    const end_index = Math.min(start_index + books_per_page, books.length); 

    const displayed_books = books?.slice(start_index, end_index);

    return (
        <div className="mb-8 w-full max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-center my-6">
                <h2 className="text-2xl font-bold">{genre}</h2>
                <div className="flex items-center">
                    <button type="button" onClick={handle_prev} disabled={current_page === 1}>
                        <KeyboardArrowLeftIcon className="mr-2 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    </button>
                    <button type="button" onClick={handle_next} disabled={current_page === Math.ceil(books.length / books_per_page)}>
                        <KeyboardArrowRightIcon className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {displayed_books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}
