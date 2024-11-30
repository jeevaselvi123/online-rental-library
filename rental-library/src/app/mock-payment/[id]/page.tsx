'use client'
import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import SharedLayout from 'app/components/SharedLayout';

const MockPaymentPage = () => {
    const router = useRouter();
    const params = useParams();
    const search_params = useSearchParams();
    const rental_price = search_params.get('rentalPrice');
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);

        // replace with actual payment integration
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2-second delay

        setIsLoading(false);
        router.push(`/product/${params.id}`);
    };

    return (
        <SharedLayout>
            <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
                <div className="container w-1/2 items-center justify-center mx-auto ">
                    <h2 className='text-2xl font-bold py-4'>Mock Payment Page</h2>
                    <p className=' text-lg font-normal pb-2'>Please pay the rental fee of {rental_price}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" onClick={handlePayment} disabled={isLoading}>
                        {isLoading ? 'Processing Payment...' : 'Pay Now'}
                    </button>
                </div>

            </div>
        </SharedLayout>
    );
};

export default MockPaymentPage;