import { BookDetails } from "app/page";

export default function groupBooksByCategory(books: BookDetails[] | null) {
    if(!books)
        return [];
    const categorizedBooks: any = {};

    books?.forEach((book) => {
        const category = book.category;

        // Create a new array for the category if it doesn't exist
        if (!categorizedBooks[category]) {
            categorizedBooks[category] = [];
        }

        // Add the current book to the corresponding category array
        categorizedBooks[category].push(book);
    });

    return categorizedBooks;
}