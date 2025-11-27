"use client"

import Image from "next/image"; 
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function YourReadingList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?genre=self&page=1')
      .then(r => r.json())
      .then(data => {
        const bookList = data.books ?? data.data ?? [];
        
        const getString = (value) => {
          if (typeof value === 'string') return value;
          if (typeof value === 'object' && value?.name) return value.name;
          return null;
        };
        
        const mappedBooks = bookList.slice(0, 4).map(b => ({
          title: b.title ?? "Untitled",
          image: b.cover_image ?? "https://placehold.co/256x384",
          price: b.details?.price,
          genre: getString(b.category) ?? "Unknown"
        }));
        
        setBooks(mappedBooks);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (book) => console.log("Clicked:", book);

  if (loading) return <section className="w-full bg-[#FAFAFA] py-12"><div className="max-w-6xl mx-auto px-4 text-center">Loading...</div></section>;

  return (
    <section className="w-full bg-[#FAFAFA] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-6">
          <h2 className="h1semibold text-[#252B42]">Your Reading List</h2>
          <div className="mt-3 h-px bg-gray-200" />
        </header>

        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={1.5}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          className="pb-4!"
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <article className="w-full aspect-2/3 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col" onClick={() => handleClick(book)}>
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
                  <p className="lablesemibold text-[#252B42] mt-1">{book.genre}</p>
                  {book.price && <p className="bodysemibold text-[#23856D]">{book.price}</p>}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

