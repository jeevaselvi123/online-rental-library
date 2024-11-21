'use client'
import Image from "next/image";

interface GenreBooks {
    id: number;
    title: string;
    author: string;
    imageUrl: string;
}
export default function BookCard({ book }: { book: GenreBooks}) {
    return (
        <div className='bg-white rounded-lg shadow-md p-4 flex overflow-x-auto'>
            <div className="flex">
                <Image src={book.imageUrl} alt={book.title} width={20} height={20} className="w-48 h-64 object-cover rounded-lg mr-4" />
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
