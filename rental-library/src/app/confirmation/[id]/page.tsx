'use client';
import { fetchBookById, updateBookAvailability } from "api/books";
import { rentalBooks } from "api/booksRent";
import SharedLayout from "app/components/SharedLayout";
import { BookDetails } from "app/page";
import { RentalDetails } from "app/product/[id]/page";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(6);
    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [rentalDetails, setRentalDetails] = useState<RentalDetails | null>(null);
    const [isRentalSuccess, setIsRentalSuccess] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    // Fetch book details (read-only)
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetchBookById(params.id);
                setBookDetails(response);
            } catch (err) {
                // setError('Failed to fetch book details.');
                console.log(err);
            }
        };

        fetchBookDetails();
    }, [params.id]);

    // Handle user confirmation of rental
    const handleConfirmRental = async () => {
        setIsLoading(true);
        try {
            // Insert rental record
            const rentedDetails = await rentalBooks(params.id);
            setRentalDetails(rentedDetails);

            // Update book availability
            const isAvailable = bookDetails!.total_copies > bookDetails!.rented_copies + 1;
            await updateBookAvailability(params.id, isAvailable, bookDetails!.rented_copies + 1);

            // Set rental success flag
            setIsRentalSuccess(true);

            // Start countdown before redirect
            let countdownValue = countdown;
            const intervalId = setInterval(() => {
                setCountdown(--countdownValue);
                if (countdownValue <= 0) {
                    clearInterval(intervalId);
                    if (rentedDetails?.id) {
                        router.push(`/product/${params.id}?rental_id=${rentedDetails.id}`);
                    }
                }
            }, 1000);
        } catch (err) {
            // setError('Failed to confirm rental.');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <p>Processing your rental request...</p>;
    }

    return (
        <SharedLayout>
            <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
                <div className="container w-1/2 items-center justify-center mx-auto">
                    <h2 className="text-2xl font-bold py-4">Confirm Your Rental</h2>
                    <p className="text-lg font-normal pb-2">Book: {bookDetails?.title}</p>
                    {!isRentalSuccess ? <p className=' text-lg font-normal pb-2'>Please pay the rental fee of {bookDetails?.rental_price}</p> : <p className=' text-lg font-normal pb-2'>Amount Paid: ${bookDetails?.rental_price}</p>}
                    <p>
                        Status:
                        {bookDetails?.is_available ? (
                            <span className="text-green-500">Available</span>
                        ) : (
                            <span className="text-red-500">Not Available</span>
                        )}
                    </p>
                    {!isRentalSuccess && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                            onClick={handleConfirmRental}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Confirm Rental"}
                        </button>
                    )}
                    {isRentalSuccess && (
                        <div>
                            <p>Due Date: {new Date(rentalDetails?.due_date ?? '').toLocaleDateString()}</p>
                            <p>Your rental request has been submitted! Redirecting to the product page in {countdown} seconds...</p>
                        </div>
                    )}
                </div>
            </div>
        </SharedLayout>
    );
}
