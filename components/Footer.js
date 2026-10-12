"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoSitus from "./LogoSitus";

const tautanKiri = [
  { href: "/profil", label: "Profil" },
  { href: "/pemerintahan", label: "Pemerintahan" },
  { href: "/pelayanan", label: "Pelayanan" },
  { href: "/umkm", label: "UMKM" },
  { href: "/peta", label: "Peta Lokasi" },
];

const tautanKanan = [
  { href: "/fasilitas", label: "Fasilitas" },
  { href: "/statistik", label: "Statistik" },
  { href: "/kontak", label: "Kontak" },
  { href: "/tim-kkt", label: "Tim KKT" },
  { href: "/galeri", label: "Galeri" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="footer-budaya">
      <div className="motif-pita" />
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5 col-md-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <LogoSitus ukuran={44} />
              <h5 className="fw-bold mb-0">Kelurahan Paslaten Dua</h5>
            </div>
            <p className="mb-2 text-white-50">Kecamatan Tomohon Timur, Kota Tomohon, Sulawesi Utara</p>
            <p className="fst-italic mb-0" style={{ color: "var(--emas-muda)" }}>
              Pakatuan wo Pakalawiren
            </p>
          </div>
          <div className="col-lg-4 col-md-4">
            <h6 className="fw-bold mb-3">Tautan</h6>
            <div className="row g-2">
              <div className="col-6">
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {tautanKiri.map((t) => (
                    <li key={t.href}>
                      <Link href={t.href} className="tautan-footer" prefetch={true}>
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {tautanKanan.map((t) => (
                    <li key={t.href}>
                      <Link href={t.href} className="tautan-footer" prefetch={true}>
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3">
            <h6 className="fw-bold mb-3">Jam Pelayanan</h6>
            <p className="mb-0 text-white-50">Senin–Jumat, mengikuti jam kerja pemerintah daerah.</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/logo-kkt.png"
              alt="Logo KKT UNSRAT 149"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <div>
              <div className="small">Dikembangkan oleh Tim KKT UNSRAT Angkatan 149</div>
              <div className="small text-white-50">
                © {new Date().getFullYear()} Kelurahan Paslaten Dua. Semua hak dilindungi.
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-link p-0 small"
            style={{ color: "inherit", textDecoration: "underline" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Kembali ke atas
          </button>
        </div>
      </div>
    </footer>
  );
}