import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <html lang="id">
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
} 