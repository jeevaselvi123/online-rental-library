'use client'
import SharedLayout from 'app/components/SharedLayout';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchBookById, updateBookAvailability } from 'api/books';
import { BookDetails } from 'app/page';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import BoxModal from 'app/components/BoxModal';
import { returnBook } from 'api/booksRent';

export interface RentalDetails {
    id: number;
    user_id: number;
    book_id: number;
    rent_date: string;
    due_date: string;
    fine: number;
    payment_status: boolean;
    return_date: string;
}

export default function ProductPage() {
    const router = useRouter();
    const params = useParams();
    const search_params = useSearchParams();
    const { id } = params;
    const token = localStorage.getItem('token');

    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [is_modal_open, set_is_open_modal] = useState<boolean>(false);
    const [rentalReturn, setRentalReturn] = useState<RentalDetails | null>(null);

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
            if (!token) {
                router.push('/login');
                return;
            }
            // Redirect to the mock payment page
            router.push(`/confirmation/${bookDetails?.id}`);

        } catch (err) {
            console.log('Error occurred while processing the payment', err);
        }
    }

    const handleShareClick = () => {
        set_is_open_modal(true);
    };

    const handleReturnBook = async () => {
        try {
            if (!token) {
                router.push('/login');
                return;
            }
            const rentalId = search_params.get('rental_id');

            const response = await returnBook(rentalId);
            if (!response) {
                throw new Error("Something error occurred!");
            }
            setRentalReturn(response);
            const isAvailable = bookDetails!.total_copies > bookDetails!.rented_copies - 1;
            const updatedBookDetails = await updateBookAvailability(params.id, isAvailable, bookDetails!.rented_copies - 1);
            setBookDetails(updatedBookDetails);
            alert('Successfully Returned the book!');
        } catch (err) {
            console.log(err);
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
                        <button className="text-gray-500 hover:text-gray-700 p-6" onClick={handleShareClick}>
                            <ShareIcon />
                        </button>
                    </div>
                    <BoxModal open={is_modal_open} onClose={() => set_is_open_modal(false)} />
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
                    {bookDetails.is_available ? <p className='text-green-600'>
                        Available for rent!!
                    </p> : <p className='text-red-600'>
                        Currently unavailable!!
                    </p>}
                    {rentalReturn &&
                        <>
                            <h4 className='font-semibold mb-4'>Return Detail:</h4>
                            <div className='flex flex-row mb-2'>
                                <p><strong>Returned Date: </strong> {new Date(rentalReturn.return_date).toLocaleDateString()}</p>
                                <p className='pl-6'><strong>Fine: </strong> {rentalReturn.fine}</p>
                            </div>
                        </>}
                    <div className="flex gap-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handle_rent_button_click} disabled={!bookDetails.is_available}>
                            Rent Now
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReturnBook}>
                            Return
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