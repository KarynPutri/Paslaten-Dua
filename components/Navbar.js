"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LogoSitus from "./LogoSitus";

const menuKelurahan = [
  {
    href: "/profil",
    label: "Profil & Wilayah",
    sub: "Visi misi, wilayah & struktur pemerintahan",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 7H3z" />
      </svg>
    ),
  },
  {
    href: "/sejarah",
    label: "Sejarah",
    sub: "Asal-usul, asal nama & perkembangan wilayah",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM5 17a3 3 0 013-3h11" />
      </svg>
    ),
  },
  {
    href: "/fasilitas",
    label: "Fasilitas Publik",
    sub: "Gedung dinas, sekolah & rumah ibadah",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    href: "/statistik",
    label: "Statistik Wilayah",
    sub: "Data demografi, kependudukan & BPS",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    href: "/tim-kkt",
    label: "Tim KKT UNSRAT 149",
    sub: "Mahasiswa pengabdi masyarakat",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

const menuInformasi = [
  {
    href: "/berita",
    label: "Berita & Kegiatan",
    sub: "Kabar seputar program dan warga",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
      </svg>
    ),
  },
  {
    href: "/pengumuman",
    label: "Pengumuman Resmi",
    sub: "Pemberitahuan resmi pemerintah",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    href: "/agenda",
    label: "Agenda Kegiatan",
    sub: "Jadwal pelayanan & acara kelurahan",
    ikon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownKelurahan, setDropdownKelurahan] = useState(false);
  const [dropdownInfo, setDropdownInfo] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  const close = () => {
    setOpen(false);
    setDropdownKelurahan(false);
    setDropdownInfo(false);
  };

  // Tutup menu dan dropdown secara otomatis saat rute berubah
  useEffect(() => {
    close();
  }, [pathname]);

  // Tutup dengan tombol Escape atau klik di luar
  useEffect(() => {
    const handleKlikLuar = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        close();
      }
    };

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("click", handleKlikLuar);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("click", handleKlikLuar);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const aktif = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const kelas = (href) => `nav-link ${aktif(href) ? "aktif" : ""}`;
  const kelurahanAktif = menuKelurahan.some((m) => aktif(m.href));
  const infoAktif = menuInformasi.some((m) => aktif(m.href));

  return (
    <header className="sticky-top" ref={navRef}>
      <nav className="navbar navbar-expand-lg navbar-light navbar-budaya py-2" aria-label="Navigasi Utama">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold" onClick={close}>
            <LogoSitus ukuran={46} />
            <span>
              Paslaten Dua
              <span className="brand-sub">Tomohon Timur</span>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Buka navigasi menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link href="/" className={kelas("/")} onClick={close} prefetch={true}>
                  Beranda
                </Link>
              </li>

              {/* Dropdown Kelurahan */}
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className={`nav-link dropdown-toggle bg-transparent border-0 text-start ${kelurahanAktif ? "aktif" : ""}`}
                  aria-expanded={dropdownKelurahan}
                  aria-haspopup="true"
                  onClick={() => {
                    setDropdownKelurahan(!dropdownKelurahan);
                    setDropdownInfo(false);
                  }}
                >
                  Kelurahan
                </button>
                <ul className={`dropdown-menu dropdown-menu-modern shadow-lg ${dropdownKelurahan ? "show" : ""}`}>
                  {menuKelurahan.map((m) => (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className={`dropdown-item-kaya ${aktif(m.href) ? "item-aktif" : ""}`}
                        onClick={close}
                        prefetch={true}
                      >
                        <span className="kotak-ikon-dropdown" aria-hidden="true">
                          {m.ikon}
                        </span>
                        <span className="konten-teks-dropdown">
                          <span className="judul-menu-dropdown">{m.label}</span>
                          <span className="subteks-menu-dropdown">{m.sub}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Dropdown Informasi */}
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className={`nav-link dropdown-toggle bg-transparent border-0 text-start ${infoAktif ? "aktif" : ""}`}
                  aria-expanded={dropdownInfo}
                  aria-haspopup="true"
                  onClick={() => {
                    setDropdownInfo(!dropdownInfo);
                    setDropdownKelurahan(false);
                  }}
                >
                  Informasi
                </button>
                <ul className={`dropdown-menu dropdown-menu-modern shadow-lg ${dropdownInfo ? "show" : ""}`}>
                  {menuInformasi.map((m) => (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className={`dropdown-item-kaya ${aktif(m.href) ? "item-aktif" : ""}`}
                        onClick={close}
                        prefetch={true}
                      >
                        <span className="kotak-ikon-dropdown" aria-hidden="true">
                          {m.ikon}
                        </span>
                        <span className="konten-teks-dropdown">
                          <span className="judul-menu-dropdown">{m.label}</span>
                          <span className="subteks-menu-dropdown">{m.sub}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link href="/umkm" className={kelas("/umkm")} onClick={close} prefetch={true}>
                  UMKM
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/galeri" className={kelas("/galeri")} onClick={close} prefetch={true}>
                  Galeri
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/peta" className={kelas("/peta")} onClick={close} prefetch={true}>
                  Peta
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/kontak" className={kelas("/kontak")} onClick={close} prefetch={true}>
                  Kontak
                </Link>
              </li>

              {/* Tombol Pelayanan Menonjol */}
              <li className="nav-item ms-lg-2 my-2 my-lg-0">
                <Link
                  href="/pelayanan"
                  className="btn btn-primary px-3 py-1 d-inline-flex align-items-center gap-1 shadow-sm"
                  onClick={close}
                  prefetch={true}
                  style={{ minHeight: "38px" }}
                >
                  <span>Pelayanan Warga</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="motif-pita-tipis" />
    </header>
  );
}
