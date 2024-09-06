/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React from "react";

interface BookCardProps {
  book: {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      imageLinks?: {
        thumbnail?: string;
      };
      infoLink: string;
    };
  };
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter();

  const handleMoreInfo = () => {
    router.push(`/book/${book.id}`);
  };

  return (
    <div key={book.id} className="bg-white p-4 rounded-md shadow-md flex">
      {book.volumeInfo.imageLinks && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
          className="w-24 h-32 object-cover mr-4"
        />
      )}
      <div>
        <h2 className="text-lg font-semibold">{book.volumeInfo.title}</h2>
        <p className="text-gray-600">
          {book.volumeInfo.authors
            ? book.volumeInfo.authors.join(", ")
            : "Unknown Author"}
        </p>
        <p className="text-sm text-gray-500">{book.volumeInfo.publishedDate}</p>
        <button
          onClick={handleMoreInfo}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Book Details
        </button>
      </div>
    </div>
  );
};
