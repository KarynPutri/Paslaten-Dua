"use client";

import { useState, useMemo } from "react";
import StatistikPendidikan from "./StatistikPendidikan";

export type Facility = {
  id: number;
  name: string;
  category: string;
  address?: string | null;
  image_url?: string | null;
  maps_url?: string | null;
};

export type EduStat = {
  id: number;
  level: string;
  public_schools: number;
  private_schools: number;
  teachers: number;
  students: number;
  school_year?: string;
};

// Data Fasilitas Publik Resmi Kelurahan Paslaten Dua dengan Foto & Lokasi
const FASILITAS_PASLATEN_DUA: Facility[] = [
  // --- Fasilitas Pemerintahan ---
  {
    id: 1,
    name: "Kantor Kelurahan Paslaten Dua",
    category: "Pemerintahan",
    address: "8RCR+WR7, Jl. Siswa, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon, Sulawesi Utara",
    image_url: "/fasilitas/kantor-lurah-paslaten-dua.jpg",
    maps_url: "https://www.google.com/maps/search/?api=1&query=8RCR%2BWR7+Paslaten+Dua+Tomohon",
  },
  {
    id: 2,
    name: "BAPELITBANGDA Kota Tomohon",
    category: "Pemerintahan",
    address: "8RCW+M45, Jl. Wakas, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon, Sulawesi Utara",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=8RCW%2BM45+Paslaten+Dua+Tomohon",
  },
  {
    id: 3,
    name: "Kantor Inspektorat Kota Tomohon",
    category: "Pemerintahan",
    address: "Kawasan Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon, Sulawesi Utara",
    image_url: "/fasilitas/inspektorat-tomohon.jpg",
    maps_url: "https://www.google.com/maps/search/?api=1&query=Inspektorat+Kota+Tomohon",
  },

  // --- Fasilitas Peribadatan ---
  {
    id: 4,
    name: "GMIM Anugerah Paslaten",
    category: "Sarana Ibadah",
    address: "Jl. Wakas, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon, Sulawesi Utara 95446",
    image_url: "/fasilitas/gmim-anugerah-paslaten.jpg",
    maps_url: "https://www.google.com/maps/search/?api=1&query=GMIM+Anugerah+Paslaten+Tomohon",
  },
  {
    id: 5,
    name: "GPdI Tomohon",
    category: "Sarana Ibadah",
    address: "Kawasan Paslaten Dua / Tomohon Timur, Kota Tomohon, Sulawesi Utara",
    image_url: "/fasilitas/gpdi-tomohon.jpg",
    maps_url: "https://www.google.com/maps/search/?api=1&query=GPdI+Tomohon",
  },

  // --- Fasilitas Pendidikan ---
  {
    id: 6,
    name: "SMP Kristen Tomohon",
    category: "Pendidikan",
    address: "Jl. Sengel, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon, Sulawesi Utara",
    image_url: "/fasilitas/smp-kristen-tomohon.jpg",
    maps_url: "https://www.google.com/maps/search/?api=1&query=SMP+Kristen+Tomohon",
  },
  {
    id: 7,
    name: "SMA Katolik Karitas",
    category: "Pendidikan",
    address: "Jl. Siswa, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon, Sulawesi Utara",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=SMA+Karitas+Tomohon+Jl+Siswa",
  },
  {
    id: 8,
    name: "SMP Katolik Gonzaga Tomohon",
    category: "Pendidikan",
    address: "Jl. Raya Tomohon No. 40A, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=SMP+Katolik+Gonzaga+Tomohon",
  },
  {
    id: 9,
    name: "SD GMIM IV Tomohon",
    category: "Pendidikan",
    address: "Jl. Raya Tomohon No. 24, Lingkungan I, Paslaten Dua, Kec. Tomohon Tim.",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=SD+GMIM+IV+Tomohon",
  },
  {
    id: 10,
    name: "SD Katolik 1 St. Yohanes Tomohon",
    category: "Pendidikan",
    address: "Lingkungan I, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=SD+Katolik+1+St+Yohanes+Tomohon",
  },
  {
    id: 11,
    name: "TK GMIM Anugerah Paslaten",
    category: "Pendidikan",
    address: "Lingkungan VIII, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=TK+GMIM+Anugerah+Paslaten+Dua",
  },
  {
    id: 12,
    name: "Seminari Augustinianum Tomohon",
    category: "Pendidikan",
    address: "8RCQ+WV5, Kawasan Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon",
    image_url: null,
    maps_url: "https://www.google.com/maps/search/?api=1&query=8RCQ%2BWV5+Seminari+Augustinianum+Tomohon",
  },

  // --- Fasilitas Ruang Publik & Kesehatan ---
  {
    id: 13,
    name: "Taman Mimpi Paslaten Dua",
    category: "Ruang Publik",
    address: "Lingkungan 10, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon",
    image_url: null,
    maps_url: "https://maps.google.com/?q=Taman+Mimpi+Paslaten+Dua+Tomohon",
  },
  {
    id: 14,
    name: "Posyandu Balita & Lansia",
    category: "Kesehatan",
    address: "Lingkungan IV, Paslaten Dua, Kec. Tomohon Tim., Kota Tomohon",
    image_url: null,
    maps_url: "https://maps.google.com/?q=Paslaten+Dua+Tomohon",
  },
];

function getIkonKategori(kat: string): string {
  const k = kat.toLowerCase();
  if (k.includes("pemerintah")) return "🏛️";
  if (k.includes("ibadah") || k.includes("gereja")) return "⛪";
  if (k.includes("didik") || k.includes("sekolah")) return "🏫";
  if (k.includes("sehat") || k.includes("posyandu")) return "🏥";
  if (k.includes("ruang") || k.includes("taman")) return "🌿";
  return "📍";
}

export default function FasilitasClient({
  facilities,
  educationStats,
}: {
  facilities: Facility[];
  educationStats: EduStat[];
}) {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua");

  // Utamakan daftar lengkap fasilitas Paslaten Dua; jika ada item tambahan dari DB, kombinasikan
  const dataFasilitas = useMemo(() => {
    if (facilities && facilities.length > 0) {
      const idTerdaftar = new Set(FASILITAS_PASLATEN_DUA.map((f) => f.name.toLowerCase()));
      const tambahan = facilities.filter((f) => !idTerdaftar.has(f.name.toLowerCase()));
      return [...FASILITAS_PASLATEN_DUA, ...tambahan];
    }
    return FASILITAS_PASLATEN_DUA;
  }, [facilities]);

  const daftarKategori = useMemo(() => {
    const urutanPrioritas = ["Semua", "Pemerintahan", "Pendidikan", "Sarana Ibadah", "Ruang Publik", "Kesehatan"];
    const setKat = new Set<string>();
    dataFasilitas.forEach((f) => {
      if (f.category) setKat.add(f.category);
    });
    const katAda = Array.from(setKat);
    return [
      "Semua",
      ...urutanPrioritas.filter((p) => p !== "Semua" && katAda.includes(p)),
      ...katAda.filter((k) => !urutanPrioritas.includes(k)),
    ];
  }, [dataFasilitas]);

  const hasilFilter = useMemo(() => {
    return dataFasilitas.filter((f) => {
      const q = kataKunci.toLowerCase();
      const cocokNama = f.name?.toLowerCase().includes(q) || false;
      const cocokAlamat = f.address?.toLowerCase().includes(q) || false;
      const cocokCari = !q || cocokNama || cocokAlamat;

      const cocokKat = kategoriDipilih === "Semua" || f.category === kategoriDipilih;

      return cocokCari && cocokKat;
    });
  }, [dataFasilitas, kataKunci, kategoriDipilih]);

  return (
    <div>
      {/* Kontrol Pencarian & Filter Kategori */}
      <div className="row g-3 mb-4 align-items-center justify-content-between">
        <div className="col-md-7 col-lg-6">
          <div className="kotak-cari mb-0">
            <span className="ikon-cari" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari fasilitas, kantor, sekolah, rumah ibadah..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              aria-label="Cari fasilitas di Paslaten Dua"
            />
            {kataKunci && (
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none position-absolute"
                style={{
                  right: "0.5rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--teks-redup)",
                }}
                onClick={() => setKataKunci("")}
                aria-label="Bersihkan pencarian"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="col-auto">
          <span
            className="badge rounded-pill px-3 py-2 fw-semibold"
            style={{ background: "var(--pasir)", color: "var(--merah)" }}
          >
            Total {hasilFilter.length} Fasilitas Publik
          </span>
        </div>
      </div>

      {/* Tag Kategori Filter */}
      <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter kategori fasilitas">
        {daftarKategori.map((k) => (
          <button
            key={k}
            type="button"
            className={`tag-kategori-btn ${kategoriDipilih === k ? "aktif" : ""}`}
            onClick={() => setKategoriDipilih(k)}
          >
            {k}
          </button>
        ))}
      </div>

      {hasilFilter.length === 0 ? (
        <div className="kartu-lembut p-4 text-center my-4">
          <p className="fw-semibold mb-1">Fasilitas tidak ditemukan</p>
          <p className="small text-muted mb-3">Tidak ada sarana yang cocok dengan filter atau kata kunci Anda.</p>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              setKataKunci("");
              setKategoriDipilih("Semua");
            }}
          >
            Reset Filter
          </button>
        </div>
      ) : (
        /* Grid Kartu Fasilitas Publik Sesuai Contoh Gambar */
        <div className="row g-4 mb-5">
          {hasilFilter.map((x) => (
            <div className="col-md-6 col-lg-4" key={x.id}>
              <article className="kartu-fasilitas-unggulan h-100">
                {/* Bagian Foto dengan Badge Pill di Atas & Judul di Bawah Foto */}
                <div className="wadah-foto-fasilitas">
                  <div className="badge-ambang-atas">
                    <span className="badge-kategori-putih">
                      <span>{getIkonKategori(x.category)}</span>
                      <span>{x.category}</span>
                    </span>
                    <span className="badge-wilayah-gelap">Kel. Paslaten Dua</span>
                  </div>

                  {x.image_url ? (
                    <img src={x.image_url} alt={x.name} loading="lazy" />
                  ) : (
                    <div
                      className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-3"
                      style={{
                        backgroundColor: "var(--merah-tua)",
                        backgroundImage: "var(--motif-latar)",
                        backgroundSize: "56px 56px",
                      }}
                    >
                      <span className="fs-1 mb-1 opacity-75" aria-hidden="true">
                        {getIkonKategori(x.category)}
                      </span>
                      <span className="small text-white-50 fst-italic">Foto dalam proses dokumentasi</span>
                    </div>
                  )}

                  {/* Judul Fasilitas Publik (Teks Tebal di Atas Overlay Gelap Tanpa Deskripsi) */}
                  <div className="overlay-judul-fasilitas">
                    <h3>{x.name}</h3>
                  </div>
                </div>

                {/* Badan Kartu: Lokasi & Tombol Petunjuk Arah (Tanpa Deskripsi Teks) */}
                <div className="badan-fasilitas">
                  {x.address && (
                    <div className="d-flex align-items-start gap-2 mb-3 small" style={{ color: "var(--teks)" }}>
                      <span aria-hidden="true" style={{ color: "var(--merah)", fontSize: "1.05rem", lineHeight: 1.2 }}>
                        📍
                      </span>
                      <span className="fw-medium lh-sm">{x.address}</span>
                    </div>
                  )}

                  {x.maps_url && (
                    <a
                      href={x.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm mt-auto d-inline-flex align-items-center justify-content-center gap-1 fw-semibold py-2"
                      style={{ borderRadius: "10px" }}
                    >
                      <span>Petunjuk Arah</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      )}

      {/* Tampilan Visual & Statistik Sarana Pendidikan */}
      <StatistikPendidikan educationStats={educationStats} />
    </div>
  );
}
