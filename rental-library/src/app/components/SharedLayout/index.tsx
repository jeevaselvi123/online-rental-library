import Header from "../Header";
import Footer from "../Footer";
export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <h3 className="text-center font-bold p-4">Contact us anytime between 10:00 AM & 07:00 PM on all days!</h3>
      <Footer />
    </main>
  );
}
