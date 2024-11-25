'use client'
import { updateBookAvailability } from "api/books";
import { rentalBooks } from "api/booksRent";
import { BookDetails } from "app/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookCard({ book }: { book: BookDetails }) {
    const router = useRouter();

    const handle_card_click = () => {
        router.push(`/product/${book.id}`)
    }
    const handle_rent_button_click = async () => {
       router.push(`/product/${book.id}`)
    }
    return (
        <div className='bg-white rounded-lg shadow-md p-4 hover:cursor-pointer hover:shadow-2xl' onClick={handle_card_click}>
            <Image
                src={book.image_url}
                alt={book.title}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            {book.description && <p className="text-gray-700 mb-2">{book.description}</p>}
            <p className="text-gray-700">{book.author_name}</p>
            {book.is_available !== undefined && (
                <p className={`text-${book.is_available ? 'green-500' : 'red-600'}`}>
                    {book.is_available ? 'Available for rent!!' : 'Currently Unavailable!!'}
                </p>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded mt-4" disabled={!book.is_available} onClick={() => handle_rent_button_click}>
                Rent Now
            </button>
        </div>
    );
}
