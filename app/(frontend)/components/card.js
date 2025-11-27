"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Card({ onClick, genre }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book?genre=${genre}`)
      .then(r => r.json())
      .then(data => {
        console.log("Full API response:", data);
        const b = data.book ?? data.data ?? data;
        console.log("Book object:", b);
        
        // Helper to extract string from object or string
        const getString = (value) => {
          if (typeof value === 'string') return value;
          if (typeof value === 'object' && value?.name) return value.name;
          return null;
        };
        
        setBook({
          title: b.title ?? "Untitled",
          image: b.cover_image ?? "https://placehold.co/256x384",
          price: b.details?.price,
          genre: getString(b.category) ?? "Unknown"
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [genre]);

  if (loading) return <div className="w-64 h-96 bg-white rounded-lg shadow-sm flex items-center justify-center">Loading...</div>;
  if (!book) return null;

  return (
    <article className="w-full aspect-2/3 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col" onClick={() => onClick?.(book)}>
      <div className="w-full flex-1 bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
        width={256}
        height={384}
        src={book.image} 
        alt={book.title} 
        className="w-full h-full object-contain"
        unoptimized />
      </div>
      <div className="p-4">
        <h3 className="bodysemibold text-[#252B42] line-clamp-2">{book.title}</h3>
        <p className="lablesemibold text-[#737373] mt-1">{book.genre}</p>
        {book.price && <p className="bodysemibold text-[#23856D] mt-2">{book.price.toLocaleString()}</p>}
      </div>
    </article>
  );
}
