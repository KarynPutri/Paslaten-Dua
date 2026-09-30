import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fontJudul = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-judul",
});

const fontTeks = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-teks",
});

export const metadata = {
  title: "Kelurahan Paslaten Dua",
  description: "Website informasi resmi Kelurahan Paslaten Dua, Tomohon Timur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fontJudul.variable} ${fontTeks.variable}`}>
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
