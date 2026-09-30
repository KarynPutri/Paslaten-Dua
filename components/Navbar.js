"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const close = () => {
    setOpen(false);
    setDropdown(false);
  };

  return (
    <nav
  className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm"
  style={{ backgroundColor: "#dcedfb" }}
    >
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold" onClick={close}>
          Paslaten Dua
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
              <Link href="/" className="nav-link" onClick={close}>Beranda</Link>
            </li>
            <li className="nav-item">
              <Link href="/profil" className="nav-link" onClick={close}>Profil</Link>
            </li>
            <li className="nav-item">
              <Link href="/pemerintahan" className="nav-link" onClick={close}>Pemerintahan</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdown(!dropdown);
                }}
              >
                Informasi
              </a>
              <ul className={`dropdown-menu ${dropdown ? "show" : ""}`}>
                <li><Link href="/berita" className="dropdown-item" onClick={close}>Berita & Kegiatan</Link></li>
                <li><Link href="/pengumuman" className="dropdown-item" onClick={close}>Pengumuman</Link></li>
                <li><Link href="/agenda" className="dropdown-item" onClick={close}>Agenda</Link></li>
                <li><Link href="/pelayanan" className="dropdown-item" onClick={close}>Pelayanan</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/umkm" className="nav-link" onClick={close}>UMKM</Link>
            </li>
            <li className="nav-item">
              <Link href="/galeri" className="nav-link" onClick={close}>Galeri</Link>
            </li>
            <li className="nav-item">
              <Link href="/peta" className="nav-link" onClick={close}>Peta</Link>
            </li>
            <li className="nav-item">
              <Link href="/kontak" className="nav-link" onClick={close}>Kontak</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}