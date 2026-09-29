"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer style={{ backgroundColor: "#dcedfb", color: "#1e3a5f" }} className="mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold">Kelurahan Paslaten Dua</h5>
            <p className="mb-0">Kecamatan Tomohon Timur, Kota Tomohon</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-1">Jam Pelayanan: Senin–Jumat, 08.00–17.00 WITA</p>
          </div>
        </div>
        <hr />
        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} KKT UNSRAT 149 Paslaten Dua. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}