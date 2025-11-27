"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from "./card";

export default function BooksForYou() {
  const handleClick = (book) => console.log("Clicked:", book);
  
  const genres = ["self", "fiction", "business", "technology", "history", "science", "art", "health"];

  return (
    <section className="w-full bg-neutral-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-6">
          <h2 className="h1semibold text-[#252B42]">Books For You</h2>
          <div className="mt-3 h-px bg-gray-200" />
        </header>

        <style jsx>{`
          :global(.swiper-button-next),
          :global(.swiper-button-prev) {
            width: 32px;
            height: 32px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
          :global(.swiper-button-next:after),
          :global(.swiper-button-prev:after) {
            font-size: 14px;
            font-weight: bold;
            color: #1e293b;
          }
        `}</style>

        {/* Mobile: Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1.5}
            spaceBetween={16}
            className="pb-4!"
          >
            {genres.map((genre, i) => (
              <SwiperSlide key={i}>
                <Card genre={genre} onClick={handleClick} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre, i) => (
            <Card key={i} genre={genre} onClick={handleClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
