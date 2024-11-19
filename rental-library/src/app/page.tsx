import SharedLayout from "./components/Shared-Layout";

export default function Home() {
  return (
    <SharedLayout>
      <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
        <h1 className="text-3xl md:text-4xl font-bold">
          Rental Booking Library
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Your one-stop shop for renting books online.
        </p>
      </div>
    </SharedLayout>
  );
}
