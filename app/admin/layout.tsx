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
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [siap, setSiap] = useState(false);
  const halamanLogin = pathname === "/admin/login";

  useEffect(() => {
    if (halamanLogin) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else setSiap(true);
    });
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