'use client'
import SharedLayout from 'app/components/SharedLayout';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchBookById } from 'api/books';
import { BookDetails } from 'app/page';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {rentalBooks} from '../../../api/booksRent'


function ProductPage() {
    const params = useParams();
    const { id } = params;

    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [rented_details, set_rented_details] = useState(null);
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
        try{
            const rented_details = await rentalBooks(bookDetails?.id)
            alert('Book rented!');
            set_rented_details(rented_details)
        } catch(err){
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
                    <div className="mb-4">
                        <p><strong>Rented Till Now:</strong> {bookDetails.rented_copies}</p>
                        <p><strong>Published At:</strong> {new Date(bookDetails.published_date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-green-500 mb-4">{bookDetails.is_available ? 'Available' : 'Unavailable'}</p>
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