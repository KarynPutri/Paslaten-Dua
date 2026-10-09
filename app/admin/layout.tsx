"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const menu = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/berita", label: "Berita" },
  { href: "/admin/pengumuman", label: "Pengumuman" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/umkm", label: "UMKM" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/pemerintahan", label: "Pemerintahan" },
  { href: "/admin/profil", label: "Profil" },
  { href: "/admin/pelayanan", label: "Pelayanan" },
  { href: "/admin/tim-kkt", label: "Tim KKT" },
  { href: "/admin/statistik", label: "Statistik" },
{ href: "/admin/fasilitas", label: "Fasilitas" },
{ href: "/admin/data-sekolah", label: "Data Sekolah" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [siap, setSiap] = useState(false);
  const halamanLogin = pathname === "/admin/login";
  const BATAS_MENIT = 60;

  useEffect(() => {
  if (halamanLogin) return;

  const periksa = async () => {
    const { data } = await supabase.auth.getSession();
    let mulai = 0;
    try {
      mulai = Number(localStorage.getItem("admin_login_at")) || 0;
    } catch {}
    const habis = !mulai || Date.now() - mulai > BATAS_MENIT * 60 * 1000;

    if (!data.session || habis) {
      await supabase.auth.signOut();
      try {
        localStorage.removeItem("admin_login_at");
      } catch {}
      router.replace("/admin/login?habis=1");
      return;
    }
    setSiap(true);
  };

  periksa();
  const timer = setInterval(periksa, 30000);
  return () => clearInterval(timer);
}, [halamanLogin, router]); 

  async function keluar() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (halamanLogin) return <>{children}</>;
  if (!siap) return <p className="text-center py-5">Memeriksa sesi...</p>;

  return (
    <div>
      <div style={{ backgroundColor: "var(--pasir)" }} className="py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="fw-bold">Panel Admin · Paslaten Dua</span>
          <div className="d-flex gap-2">
            <Link href="/" target="_blank" className="btn btn-sm btn-outline-primary">
              Lihat Website
            </Link>
            <button className="btn btn-sm btn-primary" onClick={keluar}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {menu.map((m) => {
            const aktif = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="btn btn-sm rounded-pill px-3"
                style={{
                  backgroundColor: aktif ? "var(--merah)" : "var(--pasir)",
                  color: aktif ? "#ffffff" : "var(--teks)",
                }}
              >
                {m.label}
              </Link>
            );
          })}
        </div>
        {children}
      </div>
    </div>
  );
}