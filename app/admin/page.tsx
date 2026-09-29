"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const tabel = [
  { table: "news", label: "Berita", href: "/admin/berita" },
  { table: "announcements", label: "Pengumuman", href: "/admin/pengumuman" },
  { table: "agendas", label: "Agenda", href: "/admin/agenda" },
  { table: "umkm", label: "UMKM", href: "/admin/umkm" },
  { table: "gallery", label: "Galeri", href: "/admin/galeri" },
];

export default function Dashboard() {
  const [jumlah, setJumlah] = useState<Record<string, number>>({});

  useEffect(() => {
    tabel.forEach(async (t) => {
      const { count } = await supabase
        .from(t.table)
        .select("*", { count: "exact", head: true });
      setJumlah((j) => ({ ...j, [t.table]: count ?? 0 }));
    });
  }, []);

  return (
    <div>
      <h1 className="h3 fw-bold mb-4">Dashboard</h1>
      <div className="row g-3">
        {tabel.map((t) => (
          <div className="col-6 col-md-4" key={t.table}>
            <Link href={t.href} className="text-decoration-none">
              <div className="kartu-lembut p-4 text-center h-100" style={{ color: "#1e3a5f" }}>
                <div className="display-6 fw-bold" style={{ color: "#5aa0d8" }}>
                  {jumlah[t.table] ?? "–"}
                </div>
                <div>{t.label}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}