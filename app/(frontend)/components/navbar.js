"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCallOutline, IoClose, IoMenu } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestOpen, setSuggestOpen] = useState(false);
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleSuggest = async (e) => {
        e.preventDefault();
        if (!bookTitle.trim() || !bookAuthor.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/book-suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: bookTitle, author: bookAuthor })
            });

            if (response.ok) {
                alert('Terima kasih! Saran buku Anda telah dikirim.');
                setBookTitle("");
                setBookAuthor("");
                setSuggestOpen(false);
            } else {
                const data = await response.json();
                console.error('API Error:', data);
                alert(`Gagal mengirim saran: ${data.details || data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting suggestion:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return(
        <header className="w-full">
            {/*navbar-dark*/}
            <div className="bg-[#23856D] h-[58px] text-white hidden md:flex items-center justify-center gap-10">
               <div className="flex gap-4">
                <div className="flex gap-1">
                <IoCallOutline className="w-4 h-4"/>
                <span className="lableregular">(225) 555-0118</span>
                </div>

                <div className="flex gap-1">
                <CiMail className="w-4 h-4"/>
                <span className="lableregular">michelle.rivera@example.com</span>
                </div>
               </div> 

               <div className="flex gap-4">
                <span className="lablesemibold">Follow Us and get a chance to win 80% off</span>

                <div className="flex gap-3">
                <span className="lableregular">Follow Us  :</span>
                <FaInstagram className="w-4 h-4"/>
                <FaYoutube className="w-4 h-4"/>
                </div>
               </div>  
            </div>

            {/*navbar-light*/}
            <div className="bg-white h-[78px]">
              <div className="max-w-6xl w-full mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="h3semibold text-[#252B42]">Bookstar</h1>
                </div>

                <nav aria-label="Primary" className="hidden md:block">
                  <ul className="lablesemibold text-[#737373] flex gap-6">
                    <li><Link href="/" className="hover:text-[#252B42] duration-75">Home</Link></li>
                    <li><Link href="/shop" className="hover:text-[#252B42] duration-75">Shop</Link></li>
                    <li><Link href="/about" className="hover:text-[#252B42] duration-75">About</Link></li>
                    <li><Link href="/blog" className="hover:text-[#252B42] duration-75">Blog</Link></li>
                    <li><Link href="/contact" className="hover:text-[#252B42] duration-75">Contact</Link></li>
                    <li><Link href="/pages" className="hover:text-[#252B42] duration-75">Pages</Link></li>
                  </ul>
                </nav>
                
                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MdAccountCircle className="w-6 h-6"/>
                    <span className="bodysemibold hidden sm:inline">Login/Register</span>
                  </div>
                  <button onClick={() => setSearchOpen(!searchOpen)} className="hover:opacity-70 transition-opacity">
                    <IoSearch className="w-6 h-6"/>
                  </button>
                  <FcLike className="w-6 h-6"/>
                  <button onClick={() => setSuggestOpen(!suggestOpen)} className="hover:opacity-70 transition-opacity">
                    <IoIosAddCircleOutline className="w-6 h-6"/>
                  </button>
                </div>

                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  {mobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <nav className="px-4 py-4 flex flex-col items-center">
                <ul className="space-y-3 text-center">
                  <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#737373] hover:text-[#252B42] h3regular">Home</Link></li>
                  <li><Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#737373] hover:text-[#252B42] h3regular">Shop</Link></li>
                  <li><Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#737373] hover:text-[#252B42] h3regular">About</Link></li>
                  <li><Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#737373] hover:text-[#252B42] h3regular">Blog</Link></li>
                  <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#737373] hover:text-[#252B42] h3regular">Contact</Link></li>
                  <li><Link href="/pages" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#737373] hover:text-[#252B42] h3regular">Pages</Link></li>
                </ul>
                
                <div className="mt-4 pt-4 border-t space-y-3 flex flex-col items-center w-full">
                  <button onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }} className="flex items-center gap-2 py-2 justify-center">
                    <IoSearch className="w-5 h-5"/>
                    <span className="h3medium text-[#23A6F0]">Search</span>
                  </button>
                  <button onClick={() => { setSuggestOpen(true); setMobileMenuOpen(false); }} className="flex items-center gap-2 py-2 justify-center">
                    <IoIosAddCircleOutline className="w-5 h-5"/>
                    <span className="h3medium text-[#23A6F0]">Suggest Book</span>
                  </button>
                  <div className="flex items-center gap-2 py-2 justify-center">
                    <MdAccountCircle className="w-5 h-5"/>
                    <span className="h3medium text-[#23A6F0]">Login/Register</span>
                  </div>
                </div>
              </nav>
            </div>

            {/* Search Modal */}
            {searchOpen && (
              <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-start justify-center pt-20">
                <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg">
                  <form onSubmit={handleSearch} className="flex items-center gap-2 p-4">
                    <IoSearch className="w-6 h-6 text-gray-400"/>
                    <input 
                      type="text"
                      placeholder="Cari buku..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 outline-none lableregular"
                      autoFocus
                    />
                    <button 
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-gray-500 hover:text-gray-700 px-2"
                    >
                      x
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Book Suggestion */}
            {suggestOpen && (
              <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-start justify-center pt-20">
                <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="lableregular font-semibold text-[#252B42]">Saran Buku</h3>
                    <button 
                      onClick={() => setSuggestOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleSuggest} className="space-y-4">
                    <div>
                      <label className="block lableregular font-medium text-gray-700 mb-1">
                        Judul Buku
                      </label>
                      <input 
                        type="text"
                        placeholder="Masukkan judul buku"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#23A6F0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block lableregular text-gray-700 mb-1">
                        Pengarang
                      </label>
                      <input 
                        type="text"
                        placeholder="Masukkan nama pengarang"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#23A6F0]"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#23A6F0] text-white py-2 rounded-lg font-semibold hover:bg-[#1A8CD8] transition disabled:bg-gray-400"
                    >
                      {loading ? 'Mengirim...' : 'Kirim Saran Buku'}
                    </button>
                  </form>
                </div>
              </div>
            )}
        </header>
    )
}