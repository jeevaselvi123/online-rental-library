import SharedLayout from "./components/SharedLayout";
import books_by_genre from '../../data/mock_data.json' 
import GenreSection from "./components/GenreSection";

type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

type BooksByGenre = {
  [genre: string]: Book[]; // Index signature allowing dynamic string keys
};

const typedBooksByGenre = books_by_genre as BooksByGenre;

export default function Home() {
  return (
    <SharedLayout>
      <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
        <div className="bg-cover bg-center bg-local h-96 bg- w-full pb-4" style={{ backgroundImage: `url(/background.jpg)` }}>
          <h1 className="text-3xl md:text-4xl font-bold items-center justify-center">
            Rental Booking Library
          </h1>
          <p className="text-lg md:text-xl text-gray-700 items-center justify-center">
            Your one-stop shop for renting books online.
          </p>
        </div>
        {Object.keys(typedBooksByGenre).map((genre) => (
          <GenreSection key={genre} genre={genre} books={typedBooksByGenre[genre]} />
        ))}
      </div>
    </SharedLayout>
  );
}
