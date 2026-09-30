"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMotif } from "./Ornamen";

const menuInformasi = [
  { href: "/berita", label: "Berita & Kegiatan" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/agenda", label: "Agenda" },
  { href: "/pelayanan", label: "Pelayanan" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const close = () => {
    setOpen(false);
    setDropdown(false);
  };

  const aktif = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const kelas = (href) => `nav-link ${aktif(href) ? "aktif" : ""}`;
  const infoAktif = menuInformasi.some((m) => aktif(m.href));

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light navbar-budaya py-2">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold" onClick={close}>
            <LogoMotif ukuran={38} />
            <span>
              Paslaten Dua
              <span className="brand-sub">Tomohon Timur</span>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className={kelas("/")} onClick={close}>Beranda</Link>
              </li>
              <li className="nav-item">
                <Link href="/profil" className={kelas("/profil")} onClick={close}>Profil</Link>
              </li>
              <li className="nav-item">
                <Link href="/pemerintahan" className={kelas("/pemerintahan")} onClick={close}>Pemerintahan</Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  href="#"
                  className={`nav-link dropdown-toggle ${infoAktif ? "aktif" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdown(!dropdown);
                  }}
                >
                  Informasi
                </a>
                <ul className={`dropdown-menu ${dropdown ? "show" : ""}`}>
                  {menuInformasi.map((m) => (
                    <li key={m.href}>
                      <Link href={m.href} className="dropdown-item" onClick={close}>{m.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link href="/umkm" className={kelas("/umkm")} onClick={close}>UMKM</Link>
              </li>
              <li className="nav-item">
                <Link href="/galeri" className={kelas("/galeri")} onClick={close}>Galeri</Link>
              </li>
              <li className="nav-item">
                <Link href="/peta" className={kelas("/peta")} onClick={close}>Peta</Link>
              </li>
              <li className="nav-item">
                <Link href="/kontak" className={kelas("/kontak")} onClick={close}>Kontak</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="motif-pita-tipis" />
    </header>
  );
}
