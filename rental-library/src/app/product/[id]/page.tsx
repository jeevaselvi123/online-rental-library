'use client'
import SharedLayout from 'app/components/SharedLayout';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchBookById, updateBookAvailability } from 'api/books';
import { BookDetails } from 'app/page';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { rentalBooks } from '../../../api/booksRent'

interface RentalDetails {
    id: number;
    user_id: number;
    book_id: number;
    rent_date: string;
    due_date: string;
    fine: number;
    payment_status: boolean;
}

function ProductPage() {
    const params = useParams();
    const { id } = params;

    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [rented_details, set_rented_details] = useState<RentalDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            setIsLoading(true);
            setError(null);

            if (!id) {
                return;
            }
            try {
                const response = await fetchBookById(id);
                setBookDetails(response);
            } catch (err) {
                // setError(err);
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchBookDetails();
        }
    }, [id]);

    const handle_rent_button_click = async () => {
        try {
            const rented_details = await rentalBooks(bookDetails?.id)
            set_rented_details(rented_details)
            let rented_copies = bookDetails?.rented_copies && bookDetails?.rented_copies + 1;
            let is_available = (bookDetails?.total_copies && rented_copies) && bookDetails?.total_copies <= rented_copies ? true : false;
            const updated_book_details = await updateBookAvailability(bookDetails?.id, is_available, rented_copies);
            setBookDetails(updated_book_details);
            alert('Books rented!')
        } catch (err) {
            console.log('Error occurred while processing the payment', err);
        }
    }

    if (isLoading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!bookDetails) {
        return <p>Book Not Found</p>
    }
    console.log(rented_details);
    return (
        <SharedLayout>
            <div className="flex flex-col md:flex-row gap-8 pt-12 pl-20 md:pl-0">
                <div className='flex flex-col w-1/2'>
                    <div className="justify-center items-center text-center md:w-1/2 mx-auto">
                        <Image src='/background.jpg' alt='Title' width={200} height={200} className="w-full h-96 object-cover rounded-lg" />
                    </div>
                    <div className="flex justify-center">
                        <button className="text-gray-500 hover:text-gray-700 mr-2 p-6">
                            <FavoriteBorderIcon />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-6">
                            <ShareIcon />
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{bookDetails.title}</h1>
                    <p className="text-gray-700 mb-4">{bookDetails.author_name}</p>
                    <p className="text-gray-700 mb-4">{bookDetails.description}</p>
                    <div className="flex flex-row mb-4">
                        <p><strong>Total Copies:</strong> {bookDetails.total_copies}</p>
                        <p className='pl-6'><strong>Rented:</strong> {bookDetails.rented_copies}</p>
                    </div>
                    <div className="flex flex-row mb-4">
                        <p><strong>Published At: </strong> {new Date(bookDetails.published_date).toLocaleDateString()}</p>
                        <p className='pl-6'><strong>Total Rent: </strong> {bookDetails.rental_price}</p>
                    </div>
                    {/* TODO: Update the due date in product page */}
                    {/* {rented_details && <div className="flex flex-row mb-4">
                        <p><strong>Due Date: </strong> {new Date(rented_details?.due_date).toDateString()}</p>
                        <p className='pl-6'><strong>Fine: </strong> {rented_details?.fine || 0}</p>
                    </div>} */}
                    <p className={`text-${bookDetails.is_available ? 'green-500' : 'red-600'}`}>
                        {bookDetails.is_available ? 'Available for rent!!' : 'Currently Unavailable!!'}
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handle_rent_button_click} disabled={!bookDetails.is_available}>
                            Rent Now
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                            Review
                        </button>
                    </div>
                </div>
            </div>
        </SharedLayout>
    );
}

export default ProductPage;