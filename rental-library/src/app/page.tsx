'use client';
import SharedLayout from "./components/SharedLayout";
import GenreSection from "./components/GenreSection";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchBooks } from "api/books";
import groupBooksByCategory from "helper";

export type BookDetails = {
    id: number;
    title: string;
    description: string;
    author_name: string;
    image_url: string;
    is_available: boolean;
    category: string;
    published_date: string;
    added_at: string;
    rental_price: number;
    rating: number;
    total_copies: number;
    rented_copies: number;
}
type BooksByCategory = {
  [category: string]: BookDetails[];
};

export default function Home() {

  const [bookDetails, setBookDetails] = useState<BookDetails [] | null>(null);
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      set_is_loading(true);
      set_error(null);

      try {
        const response = await fetchBooks();
        setBookDetails(response);
      } catch (err) {
        // set_error(err?.message);
        console.log(err);
      } finally {
        set_is_loading(false);
      }
    };
    fetchAllBooks()
  }, []);

  if (is_loading) {
      return <p>Loading book details...</p>;
  }

  if (error) {
      return <p>Error: {error}</p>; // Display error message
  }

  // if (!bookDetails) {
  //     return <p>Something Went Wrong!!</p>;
  // }
  const books_by_category = groupBooksByCategory(bookDetails) as BooksByCategory;

  return (
    <SharedLayout>
      <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
        <div className="relative h-96 w-full mb-4">
          <Image
            src="/bg_image.avif"
            alt="Background Image"
            fill
            className="object-cover w-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Rental Booking Library
            </h1>
            <p className="text-lg md:text-xl text-white">
              Your one-stop shop for renting books online.
            </p>
          </div>
        </div>
        {Object.keys(books_by_category).map((category) => (
          <GenreSection key={category} genre={category} books={books_by_category[category]} />
        ))}
      </div>
    </SharedLayout>
  );
}
