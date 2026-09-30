"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMotif } from "./Ornamen";

const tautan = [
  { href: "/profil", label: "Profil" },
  { href: "/pemerintahan", label: "Pemerintahan" },
  { href: "/pelayanan", label: "Pelayanan" },
  { href: "/umkm", label: "UMKM" },
  { href: "/peta", label: "Peta Lokasi" },
  { href: "/kontak", label: "Kontak" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="footer-budaya">
      <div className="motif-pita" />
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <LogoMotif ukuran={36} />
              <h5 className="fw-bold mb-0">Kelurahan Paslaten Dua</h5>
            </div>
            <p className="mb-2">Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara</p>
            <p className="fst-italic mb-0" style={{ color: "var(--emas-muda)" }}>
              Pakatuan wo Pakalawiren
            </p>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">Tautan</h6>
            <ul className="list-unstyled mb-0">
              {tautan.map((t) => (
                <li key={t.href} className="mb-1">
                  <Link href={t.href}>{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h6 className="fw-bold mb-3">Jam Pelayanan</h6>
            <p className="mb-0">Senin–Jumat, 08.00–17.00 WITA</p>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} KKT UNSRAT 149 Paslaten Dua. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
