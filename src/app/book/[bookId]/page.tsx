/* eslint-disable @next/next/no-img-element */
"use client";
import { Book } from "@/app/page";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookDetailPage = ({ params }: { params: { bookId: string } }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { bookId } = params;

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) {
      fetchBookDetails();
    } else {
      router.push("/");
    }
  }, [bookId, router]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center text-gray-500">No book found.</p>;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={handleBack}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      >
        Back to home
      </button>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        {book.volumeInfo.imageLinks && (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            className="w-48 h-64 object-cover mx-auto mb-6"
          />
        )}
        <h1 className="text-3xl font-semibold mb-4">{book.volumeInfo.title}</h1>
        <h1 className="text-xl font-semibold mb-4">
          {book.volumeInfo.subtitle ? book.volumeInfo.subtitle : ""}
        </h1>
        <p className="text-gray-700 mb-2">
          <strong>Authors: </strong>
          {book.volumeInfo.authors
            ? book.volumeInfo.authors.join(", ")
            : "Unknown"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Publisher: </strong> {book.volumeInfo.publisher}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Published: </strong> {book.volumeInfo.publishedDate}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description: </strong>
          <span
            dangerouslySetInnerHTML={{
              __html:
                book.volumeInfo.description || "No description available.",
            }}
          />

          {/* {book.volumeInfo.description || "No description available."} */}
        </p>
        <a
          href={book.volumeInfo.infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on Google Books
        </a>
      </div>
    </div>
  );
};

export default BookDetailPage;
