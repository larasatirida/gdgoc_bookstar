import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar.js";
import Container from "./components/container.js";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bookstar",
  description: "Cari buku favoritmu di Bookstar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <Container />
        {children}
      </body>
    </html>
  );
}
