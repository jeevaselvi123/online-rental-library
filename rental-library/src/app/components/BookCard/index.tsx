'use client'
import React, { useState, useEffect } from 'react';

function BookCard({ book }: {book: any}) {
    const [isCarouselActive, setIsCarouselActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsCarouselActive(true);
        }, 1000); // Change 5000 to adjust auto-play interval in milliseconds

        return () => clearInterval(interval); // Cleanup function for the interval
    }, []);

    return (
        <div
            className={`bg-white rounded-lg shadow-md p-4 flex overflow-x-auto ${isCarouselActive ? 'animate-slide-left' : ''
                }`}
        >
            <div className="flex">
                <img src={book.imageUrl} alt={book.title} className="w-48 h-64 object-cover rounded-lg mr-4" />
                <div>
                    <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                    <p className="text-gray-700">{book.author}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Rent Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
