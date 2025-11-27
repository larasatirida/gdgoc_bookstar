"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const getString = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value?.name) return value.name;
    return null;
};

const mapBook = (data) => {
    const b = data.book ?? data.data ?? data;
    return {
        id: b._id ?? b.id ?? Math.random().toString(36),
        title: b.title ?? "Untitled",
        image: b.cover_image ?? "https://placehold.co/256x384",
        genre: getString(b.category) ?? "Unknown",
        price: b.details?.price ?? "N/A",
        author: getString(b.author) ?? "Unknown Author",
        pages: b.details?.total_pages ?? "N/A",
        publisher: getString(b.publisher) ?? "Unknown Publisher",
        isbn: b.details?.isbn ?? "N/A",
        published: b.details?.published_date ?? "N/A",
        description: b.summary ?? "No description available",
        inStock: b.details?.in_stock ?? true
    };
};

export default function Detail() {
    const [books, setBooks] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?sort=newest&page=1')
            .then(r => r.json())
            .then(data => {
                const bookList = data.books ?? data.data ?? [];
                const mappedBooks = bookList.slice(0, 4).map(mapBook);
                setBooks(mappedBooks);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <main className="w-full min-h-[598px] flex items-center justify-center">Loading...</main>;

    const activeBook = books[activeIndex] || books[0];

    return (
    <main>
         {/* Desktop*/}
         <div className="w-full min-h-[598px] relative hidden md:flex">
         <div className="w-1/2 relative">
         <Swiper
          cssMode={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full!"
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  width={506}
                  height={475}
                  className="max-w-[506px] max-h-[475px] object-contain" 
                  src={book.image} 
                  alt={book.title}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-[510px] h-[475px] relative">
            <div className="px-4 py-1 left-6 top-0 absolute bg-neutral-200 rounded-[40px] inline-flex justify-center items-center gap-2">
              <div className="text-center justify-start text-black text-base font-medium leading-6">{activeBook?.genre}</div>
            </div>
            
            <div className="left-6 top-[50px] absolute justify-start text-[#252B42] text-2xl font-semibold leading-8 pr-12">{activeBook?.title}</div>
            
            <div className="left-6 top-[120px] absolute text-center justify-start text-[#23856D] text-xl font-semibold leading-8">
              {activeBook?.price}
            </div>
            
            <div className="left-6 top-40 absolute inline-flex justify-start items-center gap-[5px]">
              <div className="justify-start text-[#737373] bodysemibold leading-6">Availability :</div>
              <div className="justify-start text-[#23A6F0] bodysemibold leading-6">
                {activeBook?.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            
            <div className="left-6 top-[200px] absolute justify-start text-[#858585] text-base leading-6 max-h-[210px] overflow-y-auto pr-4">
              <p className="mb-4 bodyregular">{activeBook?.description}</p>
              <p><span className="bodysemibold">Author:</span> {activeBook?.author}</p>
              <p><span className="bodysemibold">Pages:</span> {activeBook?.pages}</p>
              <p><span className="bodysemibold">Publisher:</span> {activeBook?.publisher}</p>
              <p><span className="bodysemibold">ISBN:</span> {activeBook?.isbn}</p>
              <p><span className="bodysemibold">Published:</span> {activeBook?.published}</p>
            </div>
            
            <div className="left-6 top-[431px] absolute inline-flex justify-center items-center gap-2.5">
              <button className="h-11 px-3.5 bg-[#007AFF] rounded-xl flex justify-center items-center gap-1.5 hover:bg-blue-700 transition">
                <div className="justify-start text-neutral-100 text-base bodysemibold leading-6">Buy Now</div>
              </button>
              <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                <FaHeart className="w-5 h-5 text-black" />
              </button>
              <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                <FaShoppingCart className="w-5 h-5 text-black" />
              </button>
              <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                <FaEye className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Mobile*/}
        <div className="w-full block md:hidden">
          <div className="w-full relative">
            <Swiper
              cssMode={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              slidesPerView={1}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="h-[400px]!"
            >
              {books.map((book) => (
                <SwiperSlide key={`mobile-${book.id}`}>
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <Image
                      width={350}
                      height={350}
                      className="max-h-[350px] object-contain" 
                      src={book.image} 
                      alt={book.title}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <div className="w-full px-4 py-6 bg-white">
            <div className="inline-block px-4 py-1 mb-4 bg-neutral-200 rounded-[40px]">
              <span className="text-black text-sm font-medium">{activeBook?.genre}</span>
            </div>
            
            <h1 className="h1semibold text-[#252B42] mb-3">{activeBook?.title}</h1>
            
            <p className="h3semibold text-[#23856D] mb-3">{activeBook?.price}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#737373] bodysemibold">Availability :</span>
              <span className="text-[#23A6F0] bodysemibold">
                {activeBook?.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="text-[#737373] leading-6 mb-6">
              <p className="mb-4">{activeBook?.description}</p>
              <p><span className="bodysemibold">Author:</span> {activeBook?.author}</p>
              <p><span className="bodysemibold">Pages:</span> {activeBook?.pages}</p>
              <p><span className="bodysemibold">Publisher:</span> {activeBook?.publisher}</p>
              <p><span className="bodysemibold">ISBN:</span> {activeBook?.isbn}</p>
              <p><span className="bodysemibold">Published:</span> {activeBook?.published}</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <button className="flex-1 h-11 px-3.5 bg-[#007AFF] rounded-xl flex justify-center items-center hover:bg-[#] transition">
                <span className="text-neutral-100 text-base font-semibold">Buy Now</span>
              </button>
              <button className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                <FaHeart className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                <FaShoppingCart className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                <FaEye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            width: 32px !important;
            height: 32px !important;
            background: white !important;
            border-radius: 100% !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
            z-index: 10 !important;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 14px !important;
            font-weight: bold !important;
            color: #333 !important;
          }
        `}</style>
        </main>
    );
}