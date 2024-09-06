"use client";

import { useState } from "react";
import { BookCard } from "./components/BookCard";

// Define the types for the book structure returned by the API
export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    publisher?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    description?: string;
    infoLink: string;
  };
}

export default function Home() {
  const [query, setQuery] = useState<string>(""); // Search query state
  const [books, setBooks] = useState<Book[]>([]); // Books array state
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [startIndex, setStartIndex] = useState<number>(0); // Pagination state
  const [totalItems, setTotalItems] = useState<number>(0); // Total number of books
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!query.trim()) return; // Do nothing if the query is empty
    setLoading(true); // Start loading
    setError(null); // Reset error
    setStartIndex(0); // Reset startIndex for a new query
    setIsFirstLoad(false);
    setBooks([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&startIndex=0&maxResults=20`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(() => data.items || []); // Set the books or empty if no items
      setTotalItems(data.totalItems); // Store the total number of items
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchMoreBooks = async () => {
    const newStartIndex = startIndex + 20;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&startIndex=${newStartIndex}&maxResults=20`
      );
      if (!res.ok) throw new Error("Failed to fetch more books");
      const data = await res.json();
      setBooks((prevBooks) => [...prevBooks, ...(data.items || [])]); // Append new books
      setStartIndex(newStartIndex); // Update startIndex for next page
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-slate-600">
          Google Books API 📚🔎
        </h1>
      </header>

      {/* form */}

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex items-center mb-6"
      >
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>

      {books.length > 0 && books.length < totalItems && (
        <div className="flex justify-center mt-6">
          <button
            onClick={fetchMoreBooks}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            Load More
          </button>
        </div>
      )}

      {books.length === 0 &&
        !loading &&
        !error &&
        (isFirstLoad ? (
          ""
        ) : (
          <p className="text-center text-gray-500">
            No books found. Please try again.
          </p>
        ))}
    </div>
  );
}
